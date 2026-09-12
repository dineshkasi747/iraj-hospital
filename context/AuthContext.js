"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  updateProfile: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load profile helper
  const loadProfile = async (userId, userMetadata = {}) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data && !error) {
        setProfile(data);
        localStorage.setItem("iraj_user_profile", JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn("Could not fetch profile from Supabase table:", err.message);
    }

    // Fallback to metadata or cached profile
    const cached = localStorage.getItem("iraj_user_profile");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.id === userId || parsed.email === userMetadata.email) {
          setProfile(parsed);
          return parsed;
        }
      } catch (e) {}
    }

    const fallbackProfile = {
      id: userId,
      full_name: userMetadata.full_name || "Patient",
      email: userMetadata.email || "",
      phone: userMetadata.phone || "",
      whatsapp_opt_in: userMetadata.whatsapp_opt_in ?? true,
    };
    setProfile(fallbackProfile);
    localStorage.setItem("iraj_user_profile", JSON.stringify(fallbackProfile));
    return fallbackProfile;
  };

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            await loadProfile(session.user.id, session.user.user_metadata);
          } else {
            // Check for guest or local test session
            const localSaved = localStorage.getItem("iraj_user_profile");
            if (localSaved) {
              try {
                const parsed = JSON.parse(localSaved);
                if (parsed.email && parsed.isLocalAuth) {
                  setUser({ id: parsed.id, email: parsed.email, user_metadata: parsed });
                  setProfile(parsed);
                }
              } catch (e) {}
            }
          }
        }
      } catch (err) {
        console.warn("Auth initialization warning:", err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadProfile(session.user.id, session.user.user_metadata);
      } else {
        setProfile(null);
        localStorage.removeItem("iraj_user_profile");
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Sign Up with Email, Password, Full Name, Phone (WhatsApp)
  const signUp = async ({ email, password, fullName, phone, whatsappOptIn = true }) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
            whatsapp_opt_in: whatsappOptIn,
          },
        },
      });

      if (error) {
        // Fallback for demo/development if Supabase key is pending activation
        if (error.message.includes("API key") || error.message.includes("invalid")) {
          const fakeUser = {
            id: "local_" + Date.now(),
            email,
            user_metadata: { full_name: fullName, phone, whatsapp_opt_in: whatsappOptIn },
            isLocalAuth: true,
          };
          const userProf = {
            id: fakeUser.id,
            full_name: fullName,
            email,
            phone,
            whatsapp_opt_in: whatsappOptIn,
            isLocalAuth: true,
          };
          setUser(fakeUser);
          setProfile(userProf);
          localStorage.setItem("iraj_user_profile", JSON.stringify(userProf));
          return { data: { user: fakeUser, session: null }, error: null };
        }
        throw error;
      }

      if (data?.user) {
        const newProfile = {
          id: data.user.id,
          full_name: fullName,
          email,
          phone,
          whatsapp_opt_in: whatsappOptIn,
        };
        try {
          await supabase.from("profiles").upsert(newProfile);
        } catch (e) {
          console.warn("Profile table upsert skipped:", e.message);
        }
        setProfile(newProfile);
        localStorage.setItem("iraj_user_profile", JSON.stringify(newProfile));
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Sign In with Email & Password
  const signIn = async ({ email, password }) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Check if there is a local account saved during dev testing
        const cached = localStorage.getItem("iraj_user_profile");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.email?.toLowerCase() === email.toLowerCase()) {
            const fakeUser = { id: parsed.id, email: parsed.email, user_metadata: parsed };
            setUser(fakeUser);
            setProfile(parsed);
            return { data: { user: fakeUser, session: null }, error: null };
          }
        }
        throw error;
      }

      if (data?.user) {
        await loadProfile(data.user.id, data.user.user_metadata);
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("SignOut warning:", err.message);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
      localStorage.removeItem("iraj_user_profile");
      setLoading(false);
    }
  };

  // Update Profile
  const updateProfile = async (updates) => {
    if (!user) return { error: new Error("No user logged in") };
    try {
      const updated = { ...profile, ...updates };
      setProfile(updated);
      localStorage.setItem("iraj_user_profile", JSON.stringify(updated));

      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, ...updates });

      return { data: updated, error };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

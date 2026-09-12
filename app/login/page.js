"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PageHeader from "@/components/common/PageHeader";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const { signIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: signInError } = await signIn({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message || "Invalid email or password. Please try again.");
    } else {
      router.push(redirect);
    }
  };

  return (
    <>
      <PageHeader
        title="Patient Sign In"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Sign In" },
        ]}
      />

      <div className="auth-section py-5" style={{ backgroundColor: "#F7FAF9", minHeight: "70vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-12">
              <div
                className="auth-card p-4 p-md-5 rounded-4 bg-white shadow-sm border"
                style={{ borderColor: "#E2ECE9" }}
              >
                {/* Logo & Header */}
                <div className="text-center mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-3 p-2 rounded-circle"
                    style={{ backgroundColor: "rgba(7, 51, 47, 0.05)" }}
                  >
                    <img
                      src="/images/iraj-logo.png"
                      alt="IRAJ Hospital"
                      style={{ height: "54px", width: "auto" }}
                    />
                  </div>
                  <h2
                    className="fw-bold mb-1"
                    style={{ color: "#07332F", fontSize: "28px", letterSpacing: "-0.5px" }}
                  >
                    Welcome Back
                  </h2>
                  <p className="text-muted small mb-0">
                    Sign in with Google for instant access to appointment booking &amp; doctors.
                  </p>
                </div>

                {redirect !== "/" && (
                  <div
                    className="alert alert-info py-2 px-3 small rounded-3 mb-3 d-flex align-items-center"
                    role="alert"
                    style={{ backgroundColor: "#E8F4F2", color: "#07332F", borderColor: "#BEE0D8" }}
                  >
                    <i className="fa-solid fa-lock me-2"></i>
                    <div>
                      Sign in to view full doctor qualifications and book your consultation.
                    </div>
                  </div>
                )}

                {/* Prominent Google Sign-In Button */}
                <div className="mb-4">
                  <GoogleSignInButton
                    redirectPath={redirect}
                    buttonText="Sign In with Google"
                    subText="Auto-fills your verified details on the booking page"
                    size="lg"
                    showSetupHelper={true}
                  />
                </div>

                {/* Divider */}
                <div className="d-flex align-items-center my-4">
                  <hr className="flex-grow-1 my-0" style={{ borderColor: "#E2ECE9" }} />
                  <span className="px-3 text-muted small fw-semibold" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                    OR SIGN IN WITH EMAIL
                  </span>
                  <hr className="flex-grow-1 my-0" style={{ borderColor: "#E2ECE9" }} />
                </div>

                {error && (
                  <div
                    className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center"
                    role="alert"
                  >
                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                    <div>{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-muted">
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0 ps-0"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        style={{ height: "48px" }}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="form-label small fw-semibold text-secondary mb-0">
                        Password <span className="text-danger">*</span>
                      </label>
                      <a
                        href="https://wa.me/919801081080?text=Hello%20IRAJ%20Hospital,%20I%20need%20help%20resetting%20my%20patient%20account%20password."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="small text-decoration-none text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-muted">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-start-0 border-end-0 ps-0"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        style={{ height: "48px" }}
                      />
                      <button
                        type="button"
                        className="input-group-text bg-light border-start-0 text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label small text-secondary" htmlFor="rememberMe">
                      Keep me signed in on this device
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-default w-100 py-3 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2"
                    disabled={loading}
                    style={{ height: "52px" }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In with Email <i className="fa-solid fa-arrow-right ms-1"></i>
                      </>
                    )}
                  </button>
                </form>

                {/* Switch to Signup */}
                <div className="text-center mt-4 pt-3 border-top">
                  <p className="text-secondary small mb-0">
                    Prefer registering without Google?{" "}
                    <Link
                      href={`/signup${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
                      className="fw-bold text-decoration-none"
                      style={{ color: "#07332F" }}
                    >
                      Create email account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

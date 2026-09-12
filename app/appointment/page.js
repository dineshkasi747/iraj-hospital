"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import PageHeader from "@/components/common/PageHeader";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function AppointmentPage() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const phoneInputRef = useRef(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    doctor: "Dr. Sekhar (General Physician)",
    date: "",
    time: "10:00 AM",
    msg: "",
  });

  // Auto-fill form fields when user logs in (e.g. via Google)
  useEffect(() => {
    if (user || profile) {
      const resolvedName =
        profile?.full_name ||
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        (user?.user_metadata?.given_name
          ? `${user.user_metadata.given_name} ${user.user_metadata.family_name || ""}`.trim()
          : "") ||
        (user?.email ? user.email.split("@")[0] : "");

      const resolvedEmail = profile?.email || user?.email || "";
      const rawPhone = profile?.phone || user?.user_metadata?.phone || "";
      const cleanPhone = rawPhone ? rawPhone.replace("+91", "").trim() : "";

      setFormData((prev) => ({
        ...prev,
        name: resolvedName || prev.name,
        email: resolvedEmail || prev.email,
        phone: cleanPhone || prev.phone,
      }));

      // Focus phone number input if name/email are auto-filled and phone is empty
      if (!cleanPhone && phoneInputRef.current) {
        setTimeout(() => {
          phoneInputRef.current?.focus();
        }, 400);
      }
    }
  }, [user, profile]);

  const doctors = [
    {
      id: "dr-sekhar",
      name: "Dr. Sekhar",
      role: "General Physician",
      desc: "Internal medicine & chronic care.",
      image: "/images/team-1.jpg",
      delay: "",
    },
    {
      id: "dr-rao-babu",
      name: "Dr. Rao Babu",
      role: "General & Lap Surgeon",
      desc: "Laparoscopic & day-care surgeries.",
      image: "/images/team-2.jpg",
      delay: "0.25s",
    },
    {
      id: "dr-ava-white",
      name: "Dr. Ava White",
      role: "Cardiologist",
      desc: "Non-invasive cardiac care & 2D Echo.",
      image: "/images/team-3.jpg",
      delay: "0.5s",
    },
    {
      id: "dr-james-wilson",
      name: "Dr. James Wilson",
      role: "Orthopedic Surgeon",
      desc: "Joint replacement & fracture trauma.",
      image: "/images/team-4.jpg",
      delay: "0.75s",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validate phone number
    const cleanDigits = formData.phone.replace(/[^0-9]/g, "");
    if (cleanDigits.length < 10) {
      setFormError("Please enter a valid 10-digit WhatsApp phone number so we can reach you with your appointment token.");
      if (phoneInputRef.current) phoneInputRef.current.focus();
      return;
    }

    setSubmitting(true);
    const fullPhone = `${formData.countryCode} ${cleanDigits}`;

    try {
      // Save appointment record to Supabase
      await supabase.from("appointments").insert({
        user_id: user?.id || null,
        patient_name: formData.name,
        email: formData.email,
        phone: fullPhone,
        doctor: formData.doctor,
        appointment_date: formData.date,
        notes: formData.msg || "",
        status: "pending",
      });

      // Save/update phone number in user's profile if logged in
      if (user) {
        await updateProfile({
          full_name: formData.name,
          phone: fullPhone,
        });
      }
    } catch (err) {
      console.warn("Appointment database notice:", err.message);
    }

    setSubmitting(false);
    setFormSubmitted(true);
  };

  const fullPhoneNumber = `${formData.countryCode} ${formData.phone.replace(/[^0-9]/g, "")}`;
  const whatsappMessage = encodeURIComponent(
    `Hello IRAJ Hospitals, I have requested an appointment:\n\n👤 Patient: ${formData.name}\n📞 Phone: ${fullPhoneNumber}\n🏥 Doctor/Specialty: ${formData.doctor}\n📅 Date: ${formData.date} at ${formData.time}\n💬 Notes: ${formData.msg || "General consultation"}`
  );

  const isGoogleUser = user?.user_metadata?.provider === "google" || user?.app_metadata?.provider === "google" || user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  return (
    <>
      <PageHeader
        title="Book Appointment"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Appointment Booking" },
        ]}
      />

      {/* Appointment Booking Section Start */}
      <div className="appointment-booking wow fadeInUp" data-wow-delay="0.25s">
        <div className="container">
          {/* Patient Account Status Banner */}
          {!user ? (
            /* Unauthenticated Guest: Prominent Google One-Click Banner */
            <div
              className="p-3 p-md-4 rounded-4 mb-4 shadow-sm border"
              style={{
                backgroundColor: "#F4FAF8",
                borderColor: "#C2E2DA",
              }}
            >
              <div className="row align-items-center g-3">
                <div className="col-lg-7 col-md-12">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center bg-white shadow-sm flex-shrink-0"
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "1px solid #D5E7E2",
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h5 className="fw-bold mb-0" style={{ color: "#07332F", fontSize: "17px" }}>
                          Fast Appointment Booking
                        </h5>
                        <span className="badge bg-success text-white small" style={{ fontSize: "11px" }}>
                          1-Click Autofill
                        </span>
                      </div>
                      <p className="text-secondary small mb-0" style={{ lineHeight: "1.5" }}>
                        Sign in with Google to auto-fill your Patient Name and Email automatically. You only need to type your WhatsApp number!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5 col-md-12 d-flex flex-column align-items-lg-end align-items-start">
                  <div style={{ maxWidth: "340px", width: "100%" }}>
                    <GoogleSignInButton
                      redirectPath="/appointment"
                      buttonText="Sign in with Google to Autofill"
                      size="sm"
                      showSetupHelper={false}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <Link
                      href="/login?redirect=/appointment"
                      className="text-muted small text-decoration-none"
                      style={{ fontSize: "12px" }}
                    >
                      <i className="fa-solid fa-envelope me-1"></i> Sign in with Email
                    </Link>
                    <span className="text-muted small">•</span>
                    <span className="text-muted small" style={{ fontSize: "12px" }}>
                      Or fill manually as guest
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Logged In Status Banner */
            <div
              className="p-3 p-md-4 rounded-4 mb-4 shadow-sm border d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
              style={{ backgroundColor: "#EAF6F0", borderColor: "#BDE2D0" }}
            >
              <div className="d-flex align-items-center gap-3">
                {profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
                  <img
                    src={profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture}
                    alt="Patient avatar"
                    className="rounded-circle border border-2 border-white shadow-sm flex-shrink-0"
                    style={{ width: "48px", height: "48px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center bg-success text-white fw-bold flex-shrink-0"
                    style={{ width: "48px", height: "48px", fontSize: "18px" }}
                  >
                    {(formData.name || user.email || "P").charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                    <span className="small text-muted">Booking consultation for:</span>
                    <strong style={{ color: "#07332F", fontSize: "16px" }}>
                      {formData.name || profile?.full_name || user.email}
                    </strong>
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill small">
                      <i className="fa-solid fa-circle-check me-1"></i>
                      {isGoogleUser ? "Google Verified" : "Logged In Patient"}
                    </span>
                  </div>
                  <p className="text-secondary small mb-0" style={{ fontSize: "13px" }}>
                    <i className="fa-solid fa-envelope me-1 text-muted"></i>
                    {formData.email || user.email}
                    <span className="mx-2 text-muted">•</span>
                    <strong className="text-success">
                      <i className="fa-solid fa-arrow-down me-1"></i> Name &amp; Email auto-filled. Please enter WhatsApp number below.
                    </strong>
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1"
                  style={{ fontSize: "12.5px" }}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket me-1"></i> Switch Account
                </button>
              </div>
            </div>
          )}

          <div className="row no-gutters">
            <div className="col-lg-8">
              <div className="contact-form">
                {formSubmitted ? (
                  <div className="p-4 p-md-5 rounded-4 bg-white shadow-sm border text-center my-3">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 text-success"
                      style={{
                        width: "72px",
                        height: "72px",
                        backgroundColor: "rgba(40, 167, 69, 0.1)",
                      }}
                    >
                      <i className="fa-solid fa-circle-check fs-1"></i>
                    </div>

                    <h3 className="fw-bold mb-2" style={{ color: "#07332F" }}>
                      Appointment Request Confirmed!
                    </h3>

                    <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "540px" }}>
                      Thank you, <strong>{formData.name}</strong>. Our hospital reception desk in Gajuwaka has received your request for <strong>{formData.doctor}</strong> on <strong>{formData.date || "the selected date"}</strong>. We will reach you on <strong>{fullPhoneNumber}</strong> via WhatsApp with your OP token number.
                    </p>

                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                      <a
                        href={`https://wa.me/919801081080?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success py-3 px-4 fw-bold rounded-3 d-inline-flex align-items-center justify-content-center gap-2"
                      >
                        <i className="fa-brands fa-whatsapp fs-5"></i> Confirm Instant on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="btn btn-outline-secondary py-3 px-4 fw-semibold rounded-3"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </div>
                ) : (
                  <form id="appointmentForm" onSubmit={handleSubmit}>
                    {formError && (
                      <div className="alert alert-danger py-2 px-3 small rounded-3 mb-4 d-flex align-items-center">
                        <i className="fa-solid fa-circle-exclamation me-2 fs-5"></i>
                        <div>{formError}</div>
                      </div>
                    )}

                    <div className="row">
                      {/* Patient Name (Auto-filled if logged in) */}
                      <div className="form-group col-md-6 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label className="form-label small fw-bold text-white mb-0" htmlFor="name">
                            Patient Name <span className="text-danger">*</span>
                          </label>
                          {user && (
                            <span
                              className="badge rounded-pill px-2 py-1"
                              style={{
                                backgroundColor: "rgba(56, 211, 159, 0.25)",
                                color: "#38D39F",
                                border: "1px solid #38D39F",
                                fontSize: "11px",
                              }}
                            >
                              <i className="fa-solid fa-circle-check me-1"></i> Auto-filled
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          name="name"
                          className="form-control fw-semibold"
                          id="name"
                          placeholder="Your Full Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          style={{
                            backgroundColor: "#FFFFFF",
                            color: "#07332F",
                            fontWeight: "600",
                            fontSize: "15px",
                          }}
                        />
                      </div>

                      {/* Email Address (Auto-filled if logged in) */}
                      <div className="form-group col-md-6 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label className="form-label small fw-bold text-white mb-0" htmlFor="email">
                            Email Address <span className="text-danger">*</span>
                          </label>
                          {user && (
                            <span
                              className="badge rounded-pill px-2 py-1"
                              style={{
                                backgroundColor: "rgba(56, 211, 159, 0.25)",
                                color: "#38D39F",
                                border: "1px solid #38D39F",
                                fontSize: "11px",
                              }}
                            >
                              <i className="fa-solid fa-circle-check me-1"></i> Google Verified
                            </span>
                          )}
                        </div>
                        <input
                          type="email"
                          name="email"
                          className="form-control fw-semibold"
                          id="email"
                          placeholder="yourname@gmail.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          style={{
                            backgroundColor: "#FFFFFF",
                            color: "#07332F",
                            fontWeight: "600",
                            fontSize: "15px",
                          }}
                        />
                      </div>

                      {/* WhatsApp Phone Number (Primary remaining required input) */}
                      <div className="form-group col-md-6 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label className="form-label small fw-bold text-white mb-0" htmlFor="phone">
                            WhatsApp Phone <span className="text-danger">*</span>
                          </label>
                          <span
                            className="badge rounded-pill px-2 py-1 fw-bold d-flex align-items-center gap-1"
                            style={{
                              backgroundColor: "#F7A582",
                              color: "#07332F",
                              fontSize: "11px",
                            }}
                          >
                            <i className="fa-brands fa-whatsapp fs-6"></i>
                            {formData.phone ? "Token sent here" : "Required to receive token"}
                          </span>
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text fw-bold"
                            style={{
                              backgroundColor: "#E8F4F1",
                              color: "#07332F",
                              fontSize: "14px",
                              borderColor: "#D5E7E2",
                            }}
                          >
                            🇮🇳 +91
                          </span>
                          <input
                            ref={phoneInputRef}
                            type="tel"
                            name="phone"
                            className="form-control border-start-0 ps-2 fw-semibold"
                            id="phone"
                            placeholder="98010 81080"
                            maxLength="10"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            required
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#07332F",
                              fontWeight: "600",
                              fontSize: "15px",
                              borderColor: "#D5E7E2",
                            }}
                          />
                        </div>
                        <small className="d-block mt-1 text-white-50" style={{ fontSize: "12px" }}>
                          We will send your OP consultation token &amp; doctor timing to this WhatsApp number.
                        </small>
                      </div>

                      {/* Preferred Date */}
                      <div className="form-group col-md-6 mb-4">
                        <label className="form-label small fw-bold text-white mb-2" htmlFor="date">
                          Preferred Consultation Date <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          className="form-control fw-semibold"
                          id="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          required
                          style={{
                            backgroundColor: "#FFFFFF",
                            color: "#07332F",
                            fontWeight: "600",
                            fontSize: "15px",
                          }}
                        />
                      </div>

                      {/* Doctor / Specialty Selection */}
                      <div className="form-group col-md-12 mb-4">
                        <label className="form-label small fw-bold text-white mb-2">
                          Doctor / Department Specialty <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-control fw-semibold"
                          value={formData.doctor}
                          onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                          style={{
                            backgroundColor: "#FFFFFF",
                            color: "#07332F",
                            fontWeight: "600",
                            fontSize: "15px",
                          }}
                        >
                          <option value="Dr. Sekhar (General Physician)">Dr. Sekhar — General Physician &amp; Internal Medicine</option>
                          <option value="Dr. Rao Babu (General & Laparoscopic Surgeon)">Dr. Rao Babu — General &amp; Laparoscopic Surgeon</option>
                          <option value="Dr. Ava White (Cardiologist)">Dr. Ava White — Cardiologist &amp; Heart Care</option>
                          <option value="Dr. James Wilson (Orthopedic Surgeon)">Dr. James Wilson — Orthopedic &amp; Joint Replacement</option>
                          <option value="General Medicine & Emergency">General Medicine &amp; 24/7 Emergency Care</option>
                          <option value="Pediatrics & Child Care">Pediatrics &amp; Neonatology</option>
                          <option value="ENT & Head-Neck Clinic">ENT (Ear, Nose &amp; Throat)</option>
                          <option value="Gynecology & Obstetrics">Gynecology &amp; Obstetrics</option>
                        </select>
                      </div>

                      {/* Symptoms / Notes */}
                      <div className="form-group col-md-12 mb-4">
                        <label className="form-label small fw-bold text-white mb-2">
                          Symptoms / Reason for Consultation (Optional)
                        </label>
                        <textarea
                          name="msg"
                          className="form-control"
                          id="msg"
                          rows="3"
                          placeholder="Briefly describe symptoms (e.g. fever for 2 days, back pain, routine checkup)..."
                          value={formData.msg}
                          onChange={(e) =>
                            setFormData({ ...formData, msg: e.target.value })
                          }
                          style={{
                            backgroundColor: "#FFFFFF",
                            color: "#07332F",
                            fontSize: "14px",
                          }}
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <div className="col-md-12 form-group">
                        <button
                          type="submit"
                          className="btn-default w-100 py-3 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2"
                          disabled={submitting}
                          style={{ height: "54px", fontSize: "16px" }}
                        >
                          {submitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm" role="status"></span>
                              <span>Confirming Appointment...</span>
                            </>
                          ) : (
                            <>
                              <span>Confirm &amp; Book Appointment</span>
                              <i className="fa-solid fa-calendar-check ms-1"></i>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Side Hospital Contact Card */}
            <div className="col-lg-4">
              <div className="quick-contacts">
                <div className="quick-contacts-content">
                  <h3>Hospital Reception</h3>
                  <p>
                    Need immediate emergency help or same-day OP token? Connect directly with our front desk in Gajuwaka.
                  </p>
                </div>

                <div className="quick-contact-info">
                  <div className="quick-contact-box">
                    <div className="icon-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <p>26-4-9/1, Near Jug Junction, Gajuwaka, Visakhapatnam</p>
                  </div>

                  <div className="quick-contact-box">
                    <div className="icon-box">
                      <i className="fas fa-envelope-open-text"></i>
                    </div>
                    <p>help@irajhospitals.com</p>
                  </div>

                  <div className="quick-contact-box">
                    <div className="icon-box">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <p>+91 98010 81080</p>
                  </div>

                  <div className="quick-contact-box">
                    <div className="icon-box">
                      <i className="fas fa-clock"></i>
                    </div>
                    <p>24/7 Emergency &amp; Trauma | OPD: 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Appointment Booking Section End */}

      {/* Appointment Our Team Section Start */}
      <div className="meet-our-team appointment-our-team">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="section-title">
                <h3 className="wow fadeInUp">OUR CONSULTANTS</h3>
                <h2 className="text-anime-style-3">Meet Our Doctors.</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="col-lg-3 col-md-6 mb-4">
                <div
                  className="team-member-item wow fadeInUp h-100 rounded-4 overflow-hidden position-relative shadow-sm"
                  data-wow-delay={doctor.delay || undefined}
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2ECE9" }}
                >
                  <div className="team-image position-relative">
                    <figure className="image-anime mb-0">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        style={{ filter: !user ? "blur(1.5px)" : "none" }}
                      />
                    </figure>

                    {!user ? (
                      <Link
                        href={`/login?redirect=/our-team/${doctor.id}`}
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none"
                        style={{ backgroundColor: "rgba(7, 51, 47, 0.45)" }}
                      >
                        <i className="fa-solid fa-lock text-white fs-3 mb-1"></i>
                        <span className="badge bg-dark text-white rounded-pill px-3 py-1 small">Sign in to view</span>
                      </Link>
                    ) : (
                      <div className="team-social-list">
                        <ul>
                          <li>
                            <a href="https://www.instagram.com/irajhospitals/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                              <i className="fa-brands fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://wa.me/919801081080" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                              <i className="fa-brands fa-whatsapp"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://www.facebook.com/profile.php?id=61581884108145" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                              <i className="fa-brands fa-facebook-f"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="team-body p-4">
                    <div className="team-content">
                      <h3>{doctor.role}</h3>
                      <h2>
                        {user ? (
                          <Link href={`/our-team/${doctor.id}`}>
                            {doctor.name}
                          </Link>
                        ) : (
                          <Link href={`/login?redirect=/our-team/${doctor.id}`}>
                            {doctor.name} <i className="fa-solid fa-lock ms-1 small text-muted"></i>
                          </Link>
                        )}
                      </h2>
                      <p>{user ? doctor.desc : "Login to view schedule & credentials."}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Appointment Our Team End */}
    </>
  );
}

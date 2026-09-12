"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import PageHeader from "@/components/common/PageHeader";

export default function AppointmentPage() {
  const { user, profile } = useAuth();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "Dr. Sekhar (General Physician)",
    date: "",
    time: "10:00 AM",
    msg: "",
  });

  useEffect(() => {
    if (user || profile) {
      setFormData((prev) => ({
        ...prev,
        name: profile?.full_name || prev.name,
        email: profile?.email || user?.email || prev.email,
        phone: profile?.phone || prev.phone,
      }));
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
    setSubmitting(true);

    try {
      // Save appointment record to Supabase
      await supabase.from("appointments").insert({
        user_id: user?.id || null,
        patient_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        doctor: formData.doctor,
        appointment_date: formData.date,
        notes: formData.msg || "",
        status: "pending",
      });
    } catch (err) {
      console.warn("Appointment database sync notice:", err.message);
    }

    setSubmitting(false);
    setFormSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello IRAJ Hospitals, I have requested an appointment:\n\n👤 Patient: ${formData.name}\n📞 Phone: ${formData.phone}\n🏥 Doctor/Specialty: ${formData.doctor}\n📅 Date: ${formData.date} at ${formData.time}\n💬 Notes: ${formData.msg || "General consultation"}`
  );

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
            <div
              className="p-4 rounded-4 mb-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 shadow-sm border"
              style={{ backgroundColor: "#EBF5F3", borderColor: "#C2E2DA" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center text-white"
                  style={{ backgroundColor: "#07332F", width: "48px", height: "48px", flexShrink: 0 }}
                >
                  <i className="fa-solid fa-user-lock fs-5"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: "#07332F" }}>
                    Have an IRAJ Patient Account?
                  </h5>
                  <p className="text-secondary small mb-0">
                    Sign in to auto-fill your verified WhatsApp contact and keep track of your consultation history.
                  </p>
                </div>
              </div>
              <div className="d-flex gap-2 flex-shrink-0">
                <Link
                  href="/login?redirect=/appointment"
                  className="btn btn-sm btn-default px-3 py-2 fw-semibold"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup?redirect=/appointment"
                  className="btn btn-sm btn-outline-dark px-3 py-2 fw-semibold"
                  style={{ borderColor: "#07332F", color: "#07332F" }}
                >
                  Register
                </Link>
              </div>
            </div>
          ) : (
            <div
              className="p-3 rounded-4 mb-4 d-flex align-items-center justify-content-between shadow-sm border"
              style={{ backgroundColor: "#EAF6F0", borderColor: "#BDE2D0" }}
            >
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-circle-check text-success fs-5"></i>
                <div>
                  <span className="small text-muted d-block">Booking as:</span>
                  <strong className="text-success" style={{ color: "#07332F" }}>
                    {profile?.full_name || user.email}
                  </strong>{" "}
                  {profile?.phone && (
                    <span className="badge bg-success-subtle text-success ms-2">
                      <i className="fa-brands fa-whatsapp me-1"></i> {profile.phone}
                    </span>
                  )}
                </div>
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
                      Appointment Request Received!
                    </h3>

                    <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "540px" }}>
                      Thank you, <strong>{formData.name}</strong>. Our hospital reception desk at Gajuwaka has received your request. We will reach you on <strong>{formData.phone}</strong> via WhatsApp with your token number.
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
                    <div className="row">
                      <div className="form-group col-md-6 mb-4">
                        <label className="form-label small fw-semibold text-secondary mb-1">
                          Patient Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Your Full Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <label className="form-label small fw-semibold text-secondary mb-1">
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <label className="form-label small fw-semibold text-secondary mb-0">
                            WhatsApp Phone <span className="text-danger">*</span>
                          </label>
                          <span className="text-success small d-flex align-items-center gap-1" style={{ fontSize: "11px" }}>
                            <i className="fa-brands fa-whatsapp"></i> Updates sent here
                          </span>
                        </div>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          id="phone"
                          placeholder="+91 98010 81080"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <label className="form-label small fw-semibold text-secondary mb-1">
                          Preferred Date <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                          id="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="form-group col-md-12 mb-4">
                        <label className="form-label small fw-semibold text-secondary mb-1">
                          Doctor / Department Specialty
                        </label>
                        <select
                          className="form-control"
                          value={formData.doctor}
                          onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                        >
                          <option value="Dr. Sekhar (General Physician)">Dr. Sekhar — General Physician (Medicine)</option>
                          <option value="Dr. Rao Babu (General & Laparoscopic Surgeon)">Dr. Rao Babu — General &amp; Laparoscopic Surgeon</option>
                          <option value="General Medicine & Emergency">General Medicine &amp; 24/7 Emergency</option>
                          <option value="General & Laparoscopic Surgery">General &amp; Laparoscopic Surgery</option>
                          <option value="Pediatrics & Child Care">Pediatrics &amp; Neonatology</option>
                          <option value="Orthopedics & Joint Care">Orthopedics &amp; Joint Replacement</option>
                          <option value="ENT & Head-Neck Clinic">ENT (Ear, Nose &amp; Throat)</option>
                          <option value="Gynecology & Obstetrics">Gynecology &amp; Obstetrics</option>
                          <option value="Cardiology & Heart Care">Cardiology &amp; Cardiac Care</option>
                        </select>
                      </div>

                      <div className="form-group col-md-12 mb-4">
                        <label className="form-label small fw-semibold text-secondary mb-1">
                          Symptoms / Message
                        </label>
                        <textarea
                          name="msg"
                          className="form-control"
                          id="msg"
                          rows="4"
                          placeholder="Briefly describe your symptoms or reason for visit..."
                          value={formData.msg}
                          onChange={(e) =>
                            setFormData({ ...formData, msg: e.target.value })
                          }
                        ></textarea>
                      </div>

                      <div className="col-md-12 form-group">
                        <button type="submit" className="btn-default w-100 py-3 fw-bold" disabled={submitting}>
                          {submitting ? "Processing..." : "Confirm & Book Appointment"} <i className="fa-solid fa-calendar-check ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="quick-contacts">
                <div className="quick-contacts-content">
                  <h3>Hospital Desk</h3>
                  <p>
                    Need immediate assistance or same-day OP consultation? Connect directly with our front desk in Gajuwaka.
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
                    <p>24/7 Emergency | OPD: 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Appointment Booking Section End */}

      {/* Appointment Our Team Start */}
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
              <div key={doctor.id} className="col-lg-3 col-md-6">
                <div
                  className="team-member-item wow fadeInUp"
                  data-wow-delay={doctor.delay || undefined}
                >
                  <div className="team-image">
                    <figure className="image-anime">
                      <img src={doctor.image} alt={doctor.name} />
                    </figure>

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
                  </div>

                  <div className="team-body">
                    <div className="team-content">
                      <h3>{doctor.role}</h3>
                      <h2>
                        <Link href={`/our-team/${doctor.id}`}>
                          {doctor.name}
                        </Link>
                      </h2>
                      <p>{doctor.desc}</p>
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

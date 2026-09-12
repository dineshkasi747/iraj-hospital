"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import PageHeader from "@/components/common/PageHeader";
import { doctorsData } from "@/data/doctorsData";

export default function DoctorDetailPage({ params }) {
  const doctorSlug = params?.slug || "dr-sekhar";
  const { user, loading } = useAuth();

  const doctorFromData = doctorsData.find((d) => d.slug === doctorSlug);

  const doctorDataMap = {
    "dr-sekhar": {
      name: "Dr. Sekhar",
      role: "General Physician",
      image: "/images/team-1.jpg",
      bio: "General medicine, preventive care, chronic disease management, diabetes control, and acute illness support.",
      experience: "18+ Years Experience",
      degree: "MBBS, MD (Internal Medicine)",
      specialty: "Internal Medicine & Chronic Disease Management",
      awards: "Excellence in Clinical Medicine (2022)",
      services: [
        "Comprehensive Internal Medicine Evaluations",
        "Diabetes & Hypertension Management",
        "Infectious Disease Care (Typhoid, Dengue, Viral fevers)",
        "Preventive Health Checkups",
        "Geriatric Healthcare & Lifestyle Counseling",
      ],
    },
    "dr-rao-babu": {
      name: "Dr. Rao Babu",
      role: "General & Laparoscopic Surgeon",
      image: "/images/team-2.jpg",
      bio: "General surgical care, day-care procedures, laparoscopic surgery, and post-operative follow-up with modern protocols.",
      experience: "20+ Years Experience",
      degree: "MBBS, MS (General Surgery), FMAS",
      specialty: "Advanced Laparoscopy & Day-Care Surgeries",
      awards: "Surgical Excellence Distinction (2023)",
      services: [
        "Laparoscopic Hernia Repair",
        "Laparoscopic Cholecystectomy (Gallbladder)",
        "Laparoscopic Appendectomy",
        "Gastrointestinal & Colorectal Surgeries",
        "Emergency Trauma Surgeries",
      ],
    },
    "dr-elizabeth-foster": {
      name: "Dr. Elizabeth Foster",
      role: "Family Physician",
      image: "/images/team-3.jpg",
      bio: "Compassionate family healthcare, routine health screenings, immunization, and lifestyle guidance for patients of all ages.",
      experience: "15+ Years Experience",
      degree: "MBBS, MD (Family Medicine)",
      specialty: "Preventive Healthcare & Chronic Disease Management",
      awards: "Best Family Practitioner (2022)",
      services: [
        "Family Health Assessments",
        "Routine Health Screenings",
        "Chronic Disease Management",
        "Preventative Healthcare",
        "Vaccinations & Immunizations",
      ],
    },
    "dr-david-lee": {
      name: "Dr. David Lee",
      role: "Chief Surgeon",
      image: "/images/team-2.jpg",
      bio: "Dr. David Lee is a highly accomplished surgeon serving with over 20 years of surgical expertise in laparoscopic and gastrointestinal procedures.",
      experience: "20+ Years Experience",
      degree: "MBBS, MS (General & Laparoscopic Surgery)",
      specialty: "Advanced Laparoscopy & Gastrointestinal Surgery",
      awards: "Surgical Distinction (2023)",
      services: [
        "Laparoscopic Minimally Invasive Surgery",
        "Abdominal & Gastrointestinal Surgeries",
        "Oncological Surgical Interventions",
        "Trauma & Emergency Surgeries",
      ],
    },
    "dr-ava-white": {
      name: "Dr. Ava White",
      role: "Cardiologist",
      image: "/images/team-4.jpg",
      bio: "Cardiac prevention, echocardiography, non-invasive risk evaluation, and post-cardiac rehabilitation.",
      experience: "14+ Years Experience",
      degree: "MBBS, MD, DM (Cardiology)",
      specialty: "Non-Invasive Cardiology & Heart Failure Care",
      awards: "Cardiology Service Excellence (2023)",
      services: [
        "Echocardiography & Doppler Studies",
        "TMT & Holter Monitoring",
        "Hypertension & Lipid Risk Clinic",
        "Heart Failure Management",
      ],
    },
    "dr-james-wilson": {
      name: "Dr. James Wilson",
      role: "Orthopedic Surgeon",
      image: "/images/team-5.jpg",
      bio: "Joint reconstruction, arthroscopy, fracture trauma management, and sports rehabilitation.",
      experience: "16+ Years Experience",
      degree: "MBBS, MS (Orthopedics)",
      specialty: "Joint Replacement & Fracture Trauma",
      awards: "Excellence in Joint Arthroplasty (2021)",
      services: [
        "Total Knee & Hip Replacement",
        "Arthroscopic Ligament Surgery",
        "Complex Fracture & Trauma Care",
        "Sports Injury Rehabilitation",
      ],
    },
    "dr-sarah-jenkins": {
      name: "Dr. Sarah Jenkins",
      role: "Pediatrician",
      image: "/images/team-6.jpg",
      bio: "Child-centric preventive care, vaccinations, developmental milestones, and acute childhood illnesses.",
      experience: "12+ Years Experience",
      degree: "MBBS, MD (Pediatrics)",
      specialty: "Child Health & Neonatal Care",
      awards: "Child Healthcare Champion (2023)",
      services: [
        "Newborn & Infant Checkups",
        "Childhood Immunizations",
        "Pediatric Respiratory Care",
        "Growth & Developmental Tracking",
      ],
    },
    "dr-olivia-taylor": {
      name: "Dr. Olivia Taylor",
      role: "Obstetrician & Gynecologist",
      image: "/images/team-7.jpg",
      bio: "Antenatal care, safe deliveries, high-risk pregnancy monitoring, and minimally invasive gynecological surgery.",
      experience: "15+ Years Experience",
      degree: "MBBS, MS (Obstetrics & Gynecology)",
      specialty: "Women's Health & High-Risk Pregnancy",
      awards: "Women's Health Excellence (2022)",
      services: [
        "Comprehensive Antenatal & Postnatal Care",
        "Safe Deliveries & Labor Suites",
        "High-Risk Pregnancy Care",
        "Minimally Invasive Gynae Surgery",
      ],
    },
    "dr-daniel-brown": {
      name: "Dr. Daniel Brown",
      role: "ENT Specialist",
      image: "/images/team-8.jpg",
      bio: "Endoscopic sinus surgery, tonsillectomy, hearing disorders, and head-neck clinical management.",
      experience: "13+ Years Experience",
      degree: "MBBS, MS (ENT)",
      specialty: "Ear, Nose, Throat & Sinus Surgery",
      awards: "Clinical ENT Distinction (2021)",
      services: [
        "Functional Endoscopic Sinus Surgery",
        "Tonsil & Adenoid Surgery",
        "Micro-Ear Surgeries",
        "Hearing Loss Evaluation",
      ],
    },
  };

  const doctor = doctorDataMap[doctorSlug] || (doctorFromData ? {
    name: doctorFromData.name,
    role: doctorFromData.role,
    image: doctorFromData.image,
    bio: doctorFromData.bio,
    experience: `${doctorFromData.experienceYears}+ Years Experience`,
    degree: "MBBS, MD / MS",
    specialty: doctorFromData.specialty,
    awards: "Healthcare Excellence Award",
    services: doctorFromData.services || ["Specialized Medical Care", "Clinical Consultations"],
  } : {
    name: doctorSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    role: "Medical Specialist",
    image: "/images/team-2.jpg",
    bio: "A highly experienced and compassionate medical specialist dedicated to patient-centered clinical care at IRAJ Hospitals.",
    experience: "10+ Years Experience",
    degree: "MBBS, MD / MS",
    specialty: "Comprehensive Multi-Speciality Clinical Care",
    awards: "Healthcare Service Distinction",
    services: ["Specialized Clinical Consultations", "Patient Care Pathways"],
  });

  return (
    <>
      <PageHeader
        title={doctor.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Doctors", href: "/our-team" },
          { label: doctor.name.toLowerCase() },
        ]}
      />

      {/* Our Team Member Summary Section Start */}
      <div className="member-details">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-4">
              {/* Image Box Start */}
              <div className="team-member-img">
                <figure className="image-anime">
                  <img src={doctor.image} alt={doctor.name} />
                </figure>
              </div>
              {/* Image Box End */}
            </div>

            <div className="col-md-8">
              {/* Member Details Start */}
              <div className="member-info">
                {/* Section Title Start */}
                <div className="section-title">
                  <h3 className="wow fadeInUp">{doctor.role.toLowerCase()}</h3>
                  <h2 className="text-anime-style-3">{doctor.name}</h2>
                </div>
                {/* Section Title End */}
                <div className="member-about-data">
                  <p className="wow fadeInUp">{doctor.bio}</p>
                </div>

                <div className="doctor-badges d-flex flex-wrap gap-2 my-3">
                  <span className="badge py-2 px-3 rounded-pill bg-light text-dark border">
                    <i className="fa-solid fa-user-doctor me-1 text-success"></i> {doctor.degree}
                  </span>
                  <span className="badge py-2 px-3 rounded-pill bg-light text-dark border">
                    <i className="fa-solid fa-award me-1 text-primary"></i> {doctor.experience}
                  </span>
                </div>

                <div className="member-social-icon d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <ul className="wow fadeInUp mb-0" data-wow-delay="0.25s">
                    <li>
                      <a href="https://www.instagram.com/irajhospitals/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://wa.me/919801081080" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <i className="fab fa-whatsapp"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/profile.php?id=61581884108145" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                  </ul>

                  {user && (
                    <Link href={`/appointment`} className="btn-default btn-sm py-2 px-4">
                      Book Consultation <i className="fa-solid fa-calendar-check ms-1"></i>
                    </Link>
                  )}
                </div>
              </div>
              {/* Member Details End */}
            </div>
          </div>
        </div>
      </div>
      {/* Our Team Member Section End */}

      {/* Access Gatekeeper Card for Unauthenticated Users */}
      {!loading && !user ? (
        <div className="doctor-auth-gate py-5" style={{ backgroundColor: "#F7FAF9" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div
                  className="gate-card p-4 p-md-5 rounded-4 bg-white shadow-sm border text-center"
                  style={{ borderColor: "#D5E7E2" }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: "72px",
                      height: "72px",
                      backgroundColor: "rgba(7, 51, 47, 0.08)",
                      color: "#07332F",
                    }}
                  >
                    <i className="fa-solid fa-lock fs-2"></i>
                  </div>

                  <h3 className="fw-bold mb-2" style={{ color: "#07332F", fontSize: "24px" }}>
                    Patient Account Required to View Full Doctor Profile
                  </h3>

                  <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "560px" }}>
                    Please sign in or create a free patient account with your email and WhatsApp phone number to unlock {doctor.name}&apos;s complete medical qualifications, surgery expertise, consultation schedule, and direct booking.
                  </p>

                  <div className="row g-3 justify-content-center mb-4">
                    <div className="col-md-6 col-12">
                      <Link
                        href={`/login?redirect=/our-team/${doctorSlug}`}
                        className="btn btn-default w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                      >
                        <i className="fa-solid fa-right-to-bracket"></i> Sign In to Your Account
                      </Link>
                    </div>
                    <div className="col-md-6 col-12">
                      <Link
                        href={`/signup?redirect=/our-team/${doctorSlug}`}
                        className="btn btn-outline-dark w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                        style={{ borderColor: "#07332F", color: "#07332F" }}
                      >
                        <i className="fa-solid fa-user-plus"></i> Create Patient Account
                      </Link>
                    </div>
                  </div>

                  <div
                    className="p-3 rounded-3 d-inline-flex align-items-center gap-2 text-secondary small"
                    style={{ backgroundColor: "#F0F6F4" }}
                  >
                    <i className="fa-brands fa-whatsapp text-success fs-6"></i>
                    <span>
                      WhatsApp reminders and direct doctor appointment tokens will be sent to your registered number.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Details for Logged In Patients */
        <div className="member-details-body py-5">
          <div className="container">
            {/* Authenticated banner */}
            <div
              className="p-3 rounded-4 mb-4 d-flex align-items-center justify-content-between shadow-sm border"
              style={{ backgroundColor: "#EAF6F0", borderColor: "#BDE2D0" }}
            >
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-circle-check text-success fs-5"></i>
                <span className="small text-muted">
                  Logged in as <strong className="text-success">{user?.email}</strong> — Full Doctor Profile Unlocked
                </span>
              </div>
              <Link href="/appointment" className="btn btn-sm btn-success px-3 py-1 fw-semibold">
                <i className="fa-brands fa-whatsapp me-1"></i> Book with {doctor.name.split(" ")[0]}
              </Link>
            </div>

            <div className="row g-4">
              <div className="col-lg-7">
                <div className="p-4 p-md-5 rounded-4 bg-white shadow-sm border h-100">
                  <h3 className="fw-bold mb-3" style={{ color: "#07332F" }}>
                    Clinical Expertise &amp; Background
                  </h3>
                  <p className="text-secondary mb-3" style={{ lineHeight: "1.8" }}>
                    {doctor.bio}
                  </p>
                  <p className="text-secondary" style={{ lineHeight: "1.8" }}>
                    As a key member of the IRAJ Hospitals clinical department in Gajuwaka, {doctor.name} follows rigorous evidence-based protocols to ensure precision diagnostics, minimal patient discomfort, and rapid clinical recovery.
                  </p>

                  <h4 className="fw-bold mt-4 mb-3" style={{ color: "#07332F" }}>
                    Specialized Procedures &amp; Services
                  </h4>
                  <ul className="list-unstyled">
                    {doctor.services?.map((svc, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 mb-2 text-secondary">
                        <i className="fa-solid fa-circle-check text-success mt-1"></i>
                        <span>{svc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="p-4 p-md-5 rounded-4 bg-white shadow-sm border h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h3 className="fw-bold mb-3" style={{ color: "#07332F" }}>
                      Qualifications &amp; Practice
                    </h3>

                    <div className="mb-3 pb-3 border-bottom">
                      <span className="small text-muted d-block">Primary Specialty</span>
                      <strong className="text-dark">{doctor.specialty}</strong>
                    </div>

                    <div className="mb-3 pb-3 border-bottom">
                      <span className="small text-muted d-block">Medical Degrees</span>
                      <strong className="text-dark">{doctor.degree}</strong>
                    </div>

                    <div className="mb-3 pb-3 border-bottom">
                      <span className="small text-muted d-block">Clinical Experience</span>
                      <strong className="text-dark">{doctor.experience}</strong>
                    </div>

                    <div className="mb-3 pb-3 border-bottom">
                      <span className="small text-muted d-block">Recognition / Awards</span>
                      <strong className="text-dark">{doctor.awards || "Medical Excellence Award"}</strong>
                    </div>

                    <div className="mb-3">
                      <span className="small text-muted d-block">Hospital Facility</span>
                      <strong className="text-dark">IRAJ Multi-Speciality Hospital, Gajuwaka</strong>
                    </div>
                  </div>

                  <div className="pt-3">
                    <Link
                      href="/appointment"
                      className="btn btn-default w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="fa-solid fa-calendar-check"></i> Book Doctor Appointment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

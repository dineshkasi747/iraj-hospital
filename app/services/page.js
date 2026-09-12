import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import { servicesData } from "@/data/servicesData";

export const metadata = {
  title: "Clinical Specialties & Services",
  description:
    "Explore comprehensive multi-specialty healthcare services at IRAJ Hospitals in Gajuwaka: General Medicine, Surgery, Orthopedics, Pediatrics, ENT, ICUs, and 24/7 Emergency.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Subpage Hero Section Start */}
      <PageHeader
        title="Departments &amp; Services"
        breadcrumbs={[{ label: "Services" }]}
      />
      {/* Subpage Hero Section End */}

      {/* Our Services Section Start */}
      <div className="our-services">
        <div className="container">
          <div className="row section-row">
            <div className="col-md-12">
              <div className="section-title">
                <h3 className="wow fadeInUp">OUR SPECIALTIES</h3>
                <h2 className="text-anime-style-3">Comprehensive, Coordinated Healthcare Under One Roof.</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {servicesData.slice(0, 6).map((srv, idx) => (
              <div key={srv.id} className="col-lg-4 col-md-6 col-12 mb-4">
                <div className="our-services-item wow fadeInUp h-100 d-flex flex-column justify-content-between" data-wow-delay={`${idx * 0.15}s`}>
                  <div>
                    <div className="service-item-image">
                      <img src={srv.icon} alt={srv.title} />
                    </div>
                    <div className="services-item-content">
                      <h3>{srv.title}</h3>
                      <p>{srv.shortDescription}</p>
                      <ul>
                        {srv.bulletPoints.slice(0, 3).map((it, bIdx) => (
                          <li key={bIdx}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="services-item-btn mt-3">
                    <Link href={`/services/${srv.slug}`} className="btn-default">
                      Explore Department
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Our Services Section End */}

      {/* Services Specialist Section Start */}
      <div className="service-specialist">
        <div className="container">
          <div className="row section-row align-items-center">
            <div className="col-md-6">
              <div className="section-title">
                <h3 className="wow fadeInUp">WHY IRAJ HOSPITALS</h3>
                <h2 className="text-anime-style-3">Advanced Clinical Facilities in Gajuwaka.</h2>
              </div>
            </div>
            <div className="col-md-6">
              <div className="section-title-content">
                <p className="wow fadeInUp">
                  From emergency resuscitation and 12-bed SICU + 12-bed AMCU critical care units to modular laminar operating theatres, we provide dependable, family-centric healthcare.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 col-6">
              <div className="specialist-item wow fadeInUp">
                <div className="icon-box">
                  <img src="/images/icon-specialist-1.svg" alt="Cardiology" />
                </div>
                <div className="specialist-content">
                  <h3>Cardiology</h3>
                  <Link href="/services/cardiology-clinic"><i className="fas fa-arrow-alt-circle-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="specialist-item wow fadeInUp" data-wow-delay="0.25s">
                <div className="icon-box">
                  <img src="/images/icon-specialist-2.svg" alt="Surgery" />
                </div>
                <div className="specialist-content">
                  <h3>General Surgery</h3>
                  <Link href="/services/general-surgery"><i className="fas fa-arrow-alt-circle-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="specialist-item wow fadeInUp" data-wow-delay="0.5s">
                <div className="icon-box">
                  <img src="/images/icon-specialist-3.svg" alt="Pediatrics" />
                </div>
                <div className="specialist-content">
                  <h3>Pediatrics</h3>
                  <Link href="/services/pediatrics"><i className="fas fa-arrow-alt-circle-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="specialist-item wow fadeInUp" data-wow-delay="0.75s">
                <div className="icon-box">
                  <img src="/images/icon-specialist-4.svg" alt="Orthopedics" />
                </div>
                <div className="specialist-content">
                  <h3>Orthopedics</h3>
                  <Link href="/services/orthopedics"><i className="fas fa-arrow-alt-circle-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Services Specialist Section End */}

      {/* Meet Our Team Start */}
      <div className="meet-our-team service-team">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="section-title">
                <h3 className="wow fadeInUp">DOCTORS ON DUTY</h3>
                <h2 className="text-anime-style-3">Meet Our Medical Team.</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="team-member-item wow fadeInUp">
                <div className="team-image">
                  <figure className="image-anime">
                    <img src="/images/team-1.jpg" alt="Dr. Sekhar" />
                  </figure>
                  <div className="team-social-list">
                    <ul>
                      <li><a href="https://www.instagram.com/irajhospitals/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-instagram"></i></a></li>
                      <li><a href="https://wa.me/919801081080" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-whatsapp"></i></a></li>
                      <li><a href="https://www.facebook.com/profile.php?id=61581884108145" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="team-body">
                  <div className="team-content">
                    <h3>General Physician</h3>
                    <h2><Link href="/our-team/dr-sekhar">Dr. Sekhar</Link></h2>
                    <p>Internal medicine &amp; chronic care.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="team-member-item wow fadeInUp" data-wow-delay="0.25s">
                <div className="team-image">
                  <figure className="image-anime">
                    <img src="/images/team-2.jpg" alt="Dr. Rao Babu" />
                  </figure>
                  <div className="team-social-list">
                    <ul>
                      <li><a href="https://www.instagram.com/irajhospitals/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-instagram"></i></a></li>
                      <li><a href="https://wa.me/919801081080" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-whatsapp"></i></a></li>
                      <li><a href="https://www.facebook.com/profile.php?id=61581884108145" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="team-body">
                  <div className="team-content">
                    <h3>General Surgeon</h3>
                    <h2><Link href="/our-team/dr-rao-babu">Dr. Rao Babu</Link></h2>
                    <p>Laparoscopic &amp; general surgery.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="team-member-item wow fadeInUp" data-wow-delay="0.5s">
                <div className="team-image">
                  <figure className="image-anime">
                    <img src="/images/team-3.jpg" alt="Dr. Ava White" />
                  </figure>
                  <div className="team-social-list">
                    <ul>
                      <li><a href="https://www.instagram.com/irajhospitals/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-instagram"></i></a></li>
                      <li><a href="https://wa.me/919801081080" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-whatsapp"></i></a></li>
                      <li><a href="https://www.facebook.com/profile.php?id=61581884108145" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="team-body">
                  <div className="team-content">
                    <h3>Cardiologist</h3>
                    <h2><Link href="/our-team/dr-ava-white">Dr. Ava White</Link></h2>
                    <p>Non-invasive cardiac care.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="team-member-item wow fadeInUp" data-wow-delay="0.75s">
                <div className="team-image">
                  <figure className="image-anime">
                    <img src="/images/team-4.jpg" alt="Dr. James Wilson" />
                  </figure>
                  <div className="team-social-list">
                    <ul>
                      <li><a href="https://www.instagram.com/irajhospitals/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-instagram"></i></a></li>
                      <li><a href="https://wa.me/919801081080" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-whatsapp"></i></a></li>
                      <li><a href="https://www.facebook.com/profile.php?id=61581884108145" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="team-body">
                  <div className="team-content">
                    <h3>Orthopedic Surgeon</h3>
                    <h2><Link href="/our-team/dr-james-wilson">Dr. James Wilson</Link></h2>
                    <p>Joint replacements &amp; trauma.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Meet Our Team End */}
    </>
  );
}

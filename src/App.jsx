import { useState, useEffect } from "react";
import promacLogo from "./assets/promaclogo.jpeg";
import barImage from "./assets/basement-bar.jpg";
import amphiImage from "./assets/amphitheater.jpg";
import Estimator from "./Estimator";

const NAV_LINKS = ["Services", "Projects", "Gallery", "Estimator", "About", "Contact"];

const GALLERY = [
  {
    id: 1,
    title: "Luxury Basement Bar",
    category: "Basement Finishing",
    img: barImage,
  },
  {
    id: 2,
    title: "Outdoor Amphitheater",
    category: "Outdoor Construction",
    img: amphiImage,
  },
];

const SERVICES = [
  {
    icon: "🍳",
    title: "Kitchen Remodeling",
    desc: "Full kitchen transformations — custom cabinetry, countertops, islands, and appliance integration built to impress.",
  },
  {
    icon: "🚿",
    title: "Bathroom Remodeling",
    desc: "Spa-worthy bathroom renovations with luxury tile, custom vanities, walk-in showers, and smart fixtures.",
  },
  {
    icon: "🏗️",
    title: "Basement Finishing",
    desc: "Transform raw, unfinished space into luxury living — home bars, theaters, gyms, and entertainment suites.",
  },
  {
    icon: "🏠",
    title: "Single Family & Town Homes",
    desc: "Custom ground-up construction of single-family residences and townhome communities — built to last.",
  },
  {
    icon: "⚡",
    title: "Electrical",
    desc: "Electrical work from panel upgrades and smart home wiring to full new construction rough-ins.",
  },
  {
    icon: "🔧",
    title: "Plumbing",
    desc: "Rough-in plumbing, fixture installation, and full system builds for residential projects of any scale.",
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "Luxury Basement Bar",
    category: "Basement Finishing",
    location: "United States",
    desc: "Full basement transformation featuring a dramatic marble waterfall island, custom crystal pendant lighting, dark cabinetry with glass displays, and a professional wet bar with backlit quartzite backsplash.",
    img: barImage,
    tags: ["Marble Countertops", "Custom Lighting", "Wet Bar", "Cabinetry"],
  },
  {
    id: 2,
    title: "Outdoor Amphitheater",
    category: "Outdoor Construction",
    location: "United States",
    desc: "Ground-up construction of a full circular amphitheater with tiered concrete seating, performance stage, and engineered drainage system — a landmark community gathering space.",
    img: amphiImage,
    tags: ["Concrete", "Structural", "Community Build", "Large Scale"],
  },
];

const STATS = [
  { number: "13+", label: "Years Experience" },
  { number: "50+", label: "Projects Completed" },
  { number: "Multiple", label: "Cities Served in Georgia" },
  { number: "100%", label: "Insured" },
];

// --- Inline SVG Icons ---
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", project: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <div style={styles.root}>
      <style>{cssString}</style>

      {/* ── NAV ── */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.navInner}>
          <div style={styles.logo} onClick={() => scrollTo("hero")}>
            <div style={styles.logoCircle}>
              <img src={promacLogo} alt="ProMac" style={styles.logoImg} />
            </div>
            <div>
              <div style={{ lineHeight: 1 }}>
                <span style={styles.logoPro}>Pro</span>
                <span style={styles.logoMac}>Mac</span>
              </div>
              <div style={styles.logoSub}>Construction & Remodeling</div>
            </div>
          </div>
          <div style={styles.navLinks}>
            {NAV_LINKS.map((l) => (
              <button key={l} style={styles.navLink} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>
                {l}
              </button>
            ))}
            <button style={styles.navCta} className="nav-cta" onClick={() => scrollTo("contact")}>
              Get a Quote
            </button>
          </div>
          <button style={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        {menuOpen && (
          <div style={styles.mobileMenu}>
            {NAV_LINKS.map((l) => (
              <button key={l} style={styles.mobileLink} onClick={() => scrollTo(l.toLowerCase())}>
                {l}
              </button>
            ))}
            <button style={styles.mobileCta} onClick={() => scrollTo("contact")}>
              Get a Quote
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={styles.hero}>
        <div style={styles.heroGrid} />
        <div style={styles.heroGlow} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge} className="fade-up">
            <span style={styles.heroBadgeDot} />
            Licensed & Insured · Serving All 50 States
          </div>
          <h1 style={styles.heroH1} className="fade-up delay-1">
            <span style={{ color: "#4A90D9" }}>Pro</span>
            <span style={{ color: "#C9A84C" }}>Mac</span> Builds<br />
            <span style={{ color: "#F5F4EF" }}>Your Dream Home.</span>
          </h1>
          <p style={styles.heroSub} className="fade-up delay-2">
            13+ years of residential construction excellence — kitchens, bathrooms, basements, ground-up homes, and expert electrical & plumbing.
          </p>
          <div style={styles.heroBtns} className="fade-up delay-3">
            <button style={styles.heroBtnPrimary} className="btn-primary" onClick={() => scrollTo("projects")}>
              View Our Work <ArrowIcon />
            </button>
            <button style={styles.heroBtnSecondary} className="btn-secondary" onClick={() => scrollTo("contact")}>
              Free Consultation
            </button>
          </div>
        </div>
        <div style={styles.heroRight} className="fade-up delay-2">
          <div style={styles.heroLogoBig}>
            <img src={promacLogo} alt="ProMac Construction" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={styles.heroTaglineBox}>
            <div style={styles.htbTitle}>ProMac Construction & Remodeling</div>
            <div style={styles.htbSub}>Kitchens · Bathrooms · Basements</div>
          </div>
          <div style={styles.heroImagesWrap}>
            <div style={styles.heroImg1Wrap} className="hero-img-card">
              <img src={barImage} alt="Luxury Basement Bar" style={styles.heroImg} />
              <div style={styles.heroImgLabel}>Luxury Basement Bar</div>
            </div>
            <div style={styles.heroImg2Wrap} className="hero-img-card">
              <img src={amphiImage} alt="Outdoor Amphitheater" style={styles.heroImg} />
              <div style={styles.heroImgLabel}>Outdoor Amphitheater</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={styles.stats}>
        {STATS.map((s) => (
          <div key={s.label} style={styles.statItem} className="stat-item">
            <div style={styles.statNumber}>{s.number}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>What We Build</div>
          <h2 style={styles.sectionH2}>
            Full-Spectrum<br />
            <span style={{ color: "#C9A84C" }}>Construction Services</span>
          </h2>
          <p style={styles.sectionSub}>From breaking ground to finishing touches — ProMac handles every phase with precision and craftsmanship.</p>
          <div style={styles.serviceGrid}>
            {SERVICES.map((s) => (
              <div key={s.title} style={styles.serviceCard} className="service-card">
                <div style={styles.serviceIcon}>{s.icon}</div>
                <h3 style={styles.serviceTitle}>{s.title}</h3>
                <p style={styles.serviceDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={styles.projectsSection}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>Portfolio</div>
          <h2 style={styles.sectionH2}>
            Featured <span style={{ color: "#C9A84C" }}>Projects</span>
          </h2>
          <p style={styles.sectionSub}>Real work. Real craftsmanship. Every ProMac project is built to last.</p>
          <div style={styles.projectsGrid}>
            {PROJECTS.map((p) => (
              <div key={p.id} style={styles.projectCard} className="project-card">
                <div style={styles.projectImgWrap}>
                  <img src={p.img} alt={p.title} style={styles.projectImg} className="project-img" />
                  <div style={styles.projectOverlay}>
                    <span style={styles.projectCategory}>{p.category}</span>
                  </div>
                </div>
                <div style={styles.projectInfo}>
                  <div style={styles.projectMeta}>{p.location}</div>
                  <h3 style={styles.projectTitle}>{p.title}</h3>
                  <p style={styles.projectDesc}>{p.desc}</p>
                  <div style={styles.projectTags}>
                    {p.tags.map((t) => (
                      <span key={t} style={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>Our Work</div>
          <h2 style={styles.sectionH2}>
            Project <span style={{ color: "#C9A84C" }}>Gallery</span>
          </h2>
          <p style={styles.sectionSub}>A look at completed projects — click any image to view full size.</p>
          <div style={styles.galleryGrid}>
            {GALLERY.map((item) => (
              <div
                key={item.id}
                style={styles.galleryCard}
                className="gallery-card"
                onClick={() => setLightbox(item)}
              >
                <img src={item.img} alt={item.title} style={styles.galleryImg} className="gallery-img" />
                <div style={styles.galleryOverlay} className="gallery-overlay">
                  <span style={styles.galleryCategory}>{item.category}</span>
                  <span style={styles.galleryTitle}>{item.title}</span>
                  <span style={styles.galleryZoomHint}>Click to view</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div style={styles.lightboxBackdrop} onClick={() => setLightbox(null)}>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.img} alt={lightbox.title} style={styles.lightboxImg} />
            <div style={styles.lightboxInfo}>
              <span style={styles.lightboxCategory}>{lightbox.category}</span>
              <span style={styles.lightboxTitle}>{lightbox.title}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── ESTIMATOR ── */}
      <section id="estimator" style={{ ...styles.section, background: C.surface }}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>Contractor Tool</div>
          <h2 style={styles.sectionH2}>
            Raw Material <span style={{ color: "#C9A84C" }}>Estimator</span>
          </h2>
          <p style={styles.sectionSub}>Answer a few questions about the project's rooms, electrical, plumbing, and insulation needs to get a preliminary material and circuit estimate.</p>
          <Estimator />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutInner}>
          <div style={styles.aboutText}>
            <div style={styles.sectionTag}>About ProMac</div>
            <h2 style={styles.sectionH2}>
              Built on Trust,<br />
              <span style={{ color: "#C9A84C" }}>Delivered with Pride</span>
            </h2>
            <p style={styles.aboutP}>
              With over a decade in the field, ProMac has built a reputation in Georgia area as a contractor who shows up, delivers quality, and treats every project like it's our own home.
            </p>
            <p style={styles.aboutP}>
              We specialize in kitchens, bathrooms, basement finishing, single-family homes, and townhome developments — backed by electrical and plumbing expertise under one roof.
            </p>
            <div style={styles.aboutChecks}>
              {[
                "Insured",
                "13+ Years of Experience",
                "Kitchens · Bathrooms · Basements",
                "Electrical & Plumbing In-House",
                "On-Time, On-Budget Delivery",
              ].map((item) => (
                <div key={item} style={styles.checkItem}>
                  <span style={styles.checkMark}>✓</span> {item}
                </div>
              ))}
            </div>
          </div>
          <div style={styles.aboutVisual}>
            <div style={styles.aboutImgStack}>
              <img src={barImage} alt="Basement bar project" style={styles.aboutImg1} className="about-img" />
              <img src={amphiImage} alt="Amphitheater project" style={styles.aboutImg2} className="about-img" />
              <div style={styles.aboutBadge}>
                <div style={{ ...styles.logoCircle, width: 90, height: 90 }}>
                  <img src={promacLogo} alt="ProMac" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.contactGlow} />
        <div style={styles.sectionInner}>
          <div style={styles.sectionTag}>Let's Talk</div>
          <h2 style={{ ...styles.sectionH2, textAlign: "center" }}>
            Start Your <span style={{ color: "#C9A84C" }}>Project Today</span>
          </h2>
          <p style={{ ...styles.sectionSub, textAlign: "center", marginBottom: 56 }}>
            Ready to build? Reach out through any channel — ProMac responds fast.
          </p>
          <div style={styles.contactGrid}>
            {/* Contact Info */}
            <div style={styles.contactInfo}>
              <div style={styles.contactInfoTitle}>Reach ProMac Directly</div>
              <div style={styles.contactLinks}>
                <a href="tel:+17708857894" style={styles.contactLink} className="contact-link">
                  <span style={styles.contactLinkIcon}>
                    <PhoneIcon />
                  </span>
                  <div>
                    <div style={styles.contactLinkLabel}>Phone</div>
                    <div style={styles.contactLinkVal}>(770) 885-7894</div>
                  </div>
                </a>
                <a href="mailto:marco.consor@gmail.com" style={styles.contactLink} className="contact-link">
                  <span style={styles.contactLinkIcon}>
                    <MailIcon />
                  </span>
                  <div>
                    <div style={styles.contactLinkLabel}>Email</div>
                    <div style={styles.contactLinkVal}>marco.consor@gmail.com</div>
                  </div>
                </a>
                <a href="https://instagram.com/promacconstruction" target="_blank" rel="noreferrer" style={styles.contactLink} className="contact-link">
                  <span style={styles.contactLinkIcon}>
                    <InstagramIcon />
                  </span>
                  <div>
                    <div style={styles.contactLinkLabel}>Instagram</div>
                    <div style={styles.contactLinkVal}>@promacconstruction</div>
                  </div>
                </a>
                <a href="https://facebook.com/promacconstruction" target="_blank" rel="noreferrer" style={styles.contactLink} className="contact-link">
                  <span style={styles.contactLinkIcon}>
                    <FacebookIcon />
                  </span>
                  <div>
                    <div style={styles.contactLinkLabel}>Facebook</div>
                    <div style={styles.contactLinkVal}>ProMac Construction</div>
                  </div>
                </a>
              </div>
              <div style={styles.contactNote}>
                📍 Serving all 50 states across the US<br />
                ⏰ Mon–Sat: 7AM – 7PM
              </div>
            </div>

            {/* Form */}
            <div style={styles.contactFormWrap}>
              {formSent ? (
                <div style={styles.formSuccess}>
                  <div style={styles.formSuccessIcon}>✓</div>
                  <h3 style={styles.formSuccessTitle}>Message Received!</h3>
                  <p style={styles.formSuccessText}>Thanks for reaching out. ProMac will get back to you within 24 hours to discuss your project.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={styles.form}>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Full Name *</label>
                      <input name="name" required style={styles.input} className="form-input" placeholder="Marco Consor" value={formData.name} onChange={handleFormChange} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Email *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        style={styles.input}
                        className="form-input"
                        placeholder="marco.consor@gmail.com"
                        value={formData.email}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Phone</label>
                      <input name="phone" style={styles.input} className="form-input" placeholder="(555) 000-0000" value={formData.phone} onChange={handleFormChange} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Project Type</label>
                      <select name="project" style={styles.input} className="form-input" value={formData.project} onChange={handleFormChange}>
                        <option value="">Select a service...</option>
                        <option>Kitchen Remodeling</option>
                        <option>Bathroom Remodeling</option>
                        <option>Basement Finishing</option>
                        <option>Single Family / Town Home</option>
                        <option>Electrical</option>
                        <option>Plumbing</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Tell Us About Your Project *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      style={{ ...styles.input, resize: "vertical" }}
                      className="form-input"
                      placeholder="Describe your project, timeline, and any specific details..."
                      value={formData.message}
                      onChange={handleFormChange}
                    />
                  </div>
                  <button type="submit" style={styles.submitBtn} className="btn-primary">
                    Send Message <ArrowIcon />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            <div style={styles.logoCircle}>
              <img src={promacLogo} alt="ProMac" style={styles.logoImg} />
            </div>
            <div>
              <div style={{ lineHeight: 1 }}>
                <span style={styles.logoPro}>Pro</span>
                <span style={styles.logoMac}>Mac</span>
              </div>
              <div style={styles.logoSub}>Construction & Remodeling</div>
            </div>
          </div>
          <p style={styles.footerTagline}>Kitchens · Bathrooms · Basements · Homes — Built with pride across America.</p>
          <div style={styles.footerSocials}>
            <a href="tel:+17708857894" style={styles.socialBtn} className="social-btn" title="Call us">
              <PhoneIcon />
            </a>
            <a href="mailto:marco.consor@gmail.com" style={styles.socialBtn} className="social-btn" title="Email us">
              <MailIcon />
            </a>
            <a href="https://instagram.com/pro.macconstruction" target="_blank" rel="noreferrer" style={styles.socialBtn} className="social-btn" title="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://facebook.com/promacconstruction" target="_blank" rel="noreferrer" style={styles.socialBtn} className="social-btn" title="Facebook">
              <FacebookIcon />
            </a>
          </div>
          <div style={styles.footerBottom}>
            <span>© 2026 ProMac Construction & Remodeling LLC. All rights reserved.</span>
            <span>Insured · United States</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── STYLES ──────────────────────────────────────────────
const C = {
  bg: "#0A0A0B",
  surface: "#111113",
  card: "#16161A",
  border: "#242428",
  gold: "#C9A84C",
  goldLight: "#E8C97A",
  white: "#F5F4EF",
  muted: "#888888",
  accent2: "#4C7BC9",
};

const styles = {
  root: { fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: C.bg, color: C.white, minHeight: "100vh", overflowX: "hidden" },

  // NAV
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 0", transition: "all 0.3s ease" },
  navScrolled: { background: "rgba(10,10,11,0.95)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, padding: "14px 0" },
  navInner: { maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
  logoCircle: { width: 46, height: 46, borderRadius: "50%", overflow: "hidden", border: `2px solid ${C.gold}`, flexShrink: 0, background: "#000" },
  logoImg: { width: "100%", height: "100%", objectFit: "cover" },
  logoPro: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 3, color: "#4A90D9" },
  logoMac: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 3, color: C.gold },
  logoSub: { fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.muted, marginTop: 2 },
  navLinks: { display: "flex", alignItems: "center", gap: 8 },
  navLink: { background: "none", border: "none", color: C.muted, fontSize: 14, fontFamily: "inherit", cursor: "pointer", padding: "8px 16px", letterSpacing: 0.5, transition: "color 0.2s" },
  navCta: { background: C.gold, color: C.bg, border: "none", borderRadius: 4, padding: "10px 22px", fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", letterSpacing: 0.5, transition: "all 0.2s" },
  menuBtn: { display: "none", background: "none", border: "none", color: C.white, cursor: "pointer", padding: 4 },
  mobileMenu: { display: "flex", flexDirection: "column", gap: 4, padding: "16px 32px 20px", background: "rgba(10,10,11,0.98)", borderTop: `1px solid ${C.border}` },
  mobileLink: { background: "none", border: "none", color: C.muted, fontSize: 16, fontFamily: "inherit", cursor: "pointer", padding: "12px 0", textAlign: "left", borderBottom: `1px solid ${C.border}` },
  mobileCta: { background: C.gold, color: C.bg, border: "none", borderRadius: 4, padding: "14px", fontSize: 15, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", marginTop: 12 },

  // HERO
  hero: { minHeight: "100vh", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 32px 80px", overflow: "hidden", gap: 60 },
  heroGrid: { position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "60px 60px", opacity: 0.3 },
  heroGlow: { position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: `radial-gradient(ellipse, ${C.gold}22 0%, transparent 70%)`, pointerEvents: "none" },
  heroContent: { position: "relative", zIndex: 2, maxWidth: 680 },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 8, background: `${C.gold}18`, border: `1px solid ${C.gold}44`, borderRadius: 40, padding: "8px 18px", fontSize: 12, letterSpacing: 1, color: C.gold, marginBottom: 32, textTransform: "uppercase" },
  heroBadgeDot: { width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block", animation: "pulse 2s infinite" },
  heroH1: { fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: "clamp(48px, 7vw, 84px)", lineHeight: 1.0, letterSpacing: 2, margin: "0 0 24px", color: C.white },
  heroSub: { fontSize: "clamp(15px, 2vw, 16px)", color: C.muted, lineHeight: 1.7, margin: "0 0 40px" },
  heroBtns: { display: "flex", gap: 16, flexWrap: "wrap" },
  heroBtnPrimary: { display: "flex", alignItems: "center", gap: 10, background: C.gold, color: C.bg, border: "none", borderRadius: 4, padding: "16px 32px", fontSize: 15, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", letterSpacing: 0.5 },
  heroBtnSecondary: { background: "transparent", color: C.white, border: `1px solid ${C.border}`, borderRadius: 4, padding: "16px 32px", fontSize: 15, fontFamily: "inherit", cursor: "pointer", letterSpacing: 0.5 },
  heroRight: { position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, flex: 1 },
  heroLogoBig: { position: "relative", borderRadius: 8, overflow: "hidden", border: `3px solid ${C.gold}`, boxShadow: `0 0 60px ${C.gold}22, 0 32px 64px rgba(0,0,0,.6)`, width: 240, height: 240, background: "#000" },
  heroTaglineBox: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 24px", textAlign: "center", width: "100%", maxWidth: 280 },
  htbTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 2, color: C.gold, marginBottom: 5 },
  htbSub: { fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase" },
  heroImagesWrap: { position: "relative", display: "flex", gap: 12, width: "100%", maxWidth: 380, flexWrap: "wrap" },
  heroImg1Wrap: { position: "relative", borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: `0 20px 40px rgba(0,0,0,.5)`, flex: "1 1 45%", transform: "rotate(-1.2deg)", transition: "all 0.3s ease" },
  heroImg2Wrap: { position: "relative", borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: `0 20px 40px rgba(0,0,0,.5)`, flex: "1 1 45%", transform: "rotate(1deg) translateY(16px)", transition: "all 0.3s ease" },
  heroImg: { width: "100%", height: 140, objectFit: "cover", display: "block" },
  heroImgLabel: { position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.8))", padding: "18px 12px 8px", fontSize: 11, fontWeight: 600, letterSpacing: 0.4 },

  // STATS
  stats: { background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 0 },
  statItem: { padding: "40px 60px", textAlign: "center", borderRight: `1px solid ${C.border}`, flex: "1 1 200px" },
  statNumber: { fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: 52, color: C.gold, lineHeight: 1, letterSpacing: 2 },
  statLabel: { fontSize: 12, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginTop: 6 },

  // SECTION COMMON
  section: { padding: "100px 32px" },
  sectionInner: { maxWidth: 1280, margin: "0 auto" },
  sectionTag: { fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontWeight: 600, marginBottom: 16 },
  sectionH2: { fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: 2, lineHeight: 1.05, margin: "0 0 20px", color: C.white },
  sectionSub: { fontSize: 16, color: C.muted, lineHeight: 1.7, maxWidth: 560, margin: "0 0 60px" },

  // SERVICES
  serviceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 1, background: C.border },
  serviceCard: { background: C.card, padding: "40px 36px", transition: "background 0.3s", cursor: "default" },
  serviceIcon: { fontSize: 32, marginBottom: 20 },
  serviceTitle: { fontSize: 18, fontWeight: 700, marginBottom: 12, color: C.white },
  serviceDesc: { fontSize: 14, color: C.muted, lineHeight: 1.7 },

  // PROJECTS
  projectsSection: { background: C.surface, padding: "100px 32px" },
  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(540px, 1fr))", gap: 32 },
  projectCard: { background: C.card, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, transition: "transform 0.3s, box-shadow 0.3s" },
  projectImgWrap: { position: "relative", overflow: "hidden", height: 320 },
  projectImg: { width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" },
  projectOverlay: { position: "absolute", top: 16, left: 16 },
  projectCategory: { background: C.gold, color: C.bg, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "6px 14px", borderRadius: 2 },
  projectInfo: { padding: "32px" },
  projectMeta: { fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 },
  projectTitle: { fontSize: 26, fontWeight: 700, marginBottom: 12, color: C.white },
  projectDesc: { fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 20 },
  projectTags: { display: "flex", gap: 8, flexWrap: "wrap" },
  tag: { background: `${C.gold}18`, color: C.goldLight, border: `1px solid ${C.gold}33`, fontSize: 11, padding: "4px 12px", borderRadius: 2, letterSpacing: 0.5 },

  // GALLERY
  galleryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 24 },
  galleryCard: { position: "relative", borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, cursor: "pointer", aspectRatio: "16/10" },
  galleryImg: { width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" },
  galleryOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px", opacity: 0, transition: "opacity 0.3s ease" },
  galleryCategory: { background: C.gold, color: C.bg, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "4px 12px", borderRadius: 2, alignSelf: "flex-start", marginBottom: 8 },
  galleryTitle: { fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 6 },
  galleryZoomHint: { fontSize: 12, color: C.muted, letterSpacing: 1 },

  // LIGHTBOX
  lightboxBackdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  lightboxContent: { position: "relative", maxWidth: 1100, width: "100%", background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" },
  lightboxClose: { position: "absolute", top: 16, right: 16, zIndex: 10, background: "rgba(0,0,0,0.6)", border: `1px solid ${C.border}`, color: C.white, borderRadius: "50%", width: 36, height: 36, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  lightboxImg: { width: "100%", maxHeight: "75vh", objectFit: "contain", display: "block", background: "#000" },
  lightboxInfo: { padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 },
  lightboxCategory: { background: C.gold, color: C.bg, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "4px 12px", borderRadius: 2 },
  lightboxTitle: { fontSize: 18, fontWeight: 700, color: C.white },

  // ABOUT
  aboutSection: { padding: "100px 32px", overflow: "hidden" },
  aboutInner: { maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" },
  aboutText: {},
  aboutP: { fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 20 },
  aboutChecks: { marginTop: 32, display: "flex", flexDirection: "column", gap: 12 },
  checkItem: { display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: C.white },
  checkMark: { color: C.gold, fontWeight: 700, fontSize: 16 },
  aboutVisual: { position: "relative" },
  aboutImgStack: { position: "relative", height: 540 },
  aboutImg1: { position: "absolute", top: 0, left: 0, width: "75%", height: 380, objectFit: "cover", borderRadius: 8, border: `1px solid ${C.border}`, boxShadow: "0 30px 60px rgba(0,0,0,0.5)" },
  aboutImg2: { position: "absolute", bottom: 0, right: 0, width: "60%", height: 280, objectFit: "cover", borderRadius: 8, border: `2px solid ${C.gold}44`, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" },
  aboutBadge: { position: "absolute", top: "40%", right: "5%", zIndex: 10, boxShadow: `0 20px 40px ${C.gold}30` },

  // CONTACT
  contactSection: { padding: "100px 32px", background: C.surface, position: "relative", overflow: "hidden" },
  contactGlow: { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: `radial-gradient(ellipse, ${C.gold}15 0%, transparent 70%)`, pointerEvents: "none" },
  contactGrid: { maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "380px 1fr", gap: 64, alignItems: "start", position: "relative", zIndex: 2 },
  contactInfo: { position: "sticky", top: 100 },
  contactInfoTitle: { fontSize: 20, fontWeight: 700, marginBottom: 32, color: C.white },
  contactLinks: { display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 },
  contactLink: { display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: C.card, borderRadius: 8, border: `1px solid ${C.border}`, textDecoration: "none", color: C.white, transition: "border-color 0.2s, background 0.2s" },
  contactLinkIcon: { color: C.gold, flexShrink: 0 },
  contactLinkLabel: { fontSize: 11, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 },
  contactLinkVal: { fontSize: 14, fontWeight: 600, color: C.white },
  contactNote: { fontSize: 13, color: C.muted, lineHeight: 2, padding: "16px 20px", background: C.card, borderRadius: 8, border: `1px solid ${C.border}` },
  contactFormWrap: { background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: "48px" },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  formGroup: { display: "flex", flexDirection: "column", gap: 8 },
  label: { fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: C.muted, fontWeight: 600 },
  input: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px 16px", fontSize: 14, color: C.white, fontFamily: "inherit", outline: "none", transition: "border-color 0.2s", WebkitAppearance: "none" },
  submitBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: C.gold, color: C.bg, border: "none", borderRadius: 6, padding: "18px 32px", fontSize: 15, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", letterSpacing: 0.5, marginTop: 8 },
  formSuccess: { textAlign: "center", padding: "60px 20px" },
  formSuccessIcon: { width: 72, height: 72, borderRadius: "50%", background: `${C.gold}22`, border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: C.gold, margin: "0 auto 24px" },
  formSuccessTitle: { fontSize: 28, fontWeight: 700, marginBottom: 12, color: C.white },
  formSuccessText: { fontSize: 15, color: C.muted, lineHeight: 1.7 },

  // FOOTER
  footer: { background: C.bg, borderTop: `1px solid ${C.border}`, padding: "60px 32px 40px" },
  footerInner: { maxWidth: 1280, margin: "0 auto", textAlign: "center" },
  footerLogo: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 },
  footerTagline: { color: C.muted, fontSize: 14, marginBottom: 32 },
  footerSocials: { display: "flex", justifyContent: "center", gap: 12, marginBottom: 40 },
  socialBtn: { display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: "50%", background: C.surface, border: `1px solid ${C.border}`, color: C.muted, textDecoration: "none", transition: "all 0.2s" },
  footerBottom: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 12, color: C.muted, borderTop: `1px solid ${C.border}`, paddingTop: 24 },
};

// ── CSS String (animations, hovers, responsive) ──
const cssString = `
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.5); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }

  .fade-up { animation: fadeUp 0.8s ease both; }
  .delay-1 { animation-delay: 0.15s; }
  .delay-2 { animation-delay: 0.3s; }
  .delay-3 { animation-delay: 0.45s; }

  .nav-link:hover { color: #F5F4EF !important; }
  .nav-cta:hover { background: #E8C97A !important; transform: translateY(-1px); }

  .btn-primary:hover { background: #E8C97A !important; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(201,168,76,0.35); }
  .btn-secondary:hover { border-color: #C9A84C !important; color: #C9A84C !important; }

  .service-card:hover { background: #1C1C22 !important; }

  .project-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,0.5); }
  .project-card:hover .project-img { transform: scale(1.05); }

  .contact-link:hover { border-color: #C9A84C !important; background: #1C1C22 !important; }

  .social-btn:hover { color: #C9A84C !important; border-color: #C9A84C !important; background: #16161A !important; }

  .form-input:focus { border-color: #C9A84C !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.12); }
  .form-input option { background: #111113; color: #F5F4EF; }

  .gallery-card:hover .gallery-img { transform: scale(1.06); }
  .gallery-card:hover .gallery-overlay { opacity: 1 !important; }

  .hero-img-card:hover { transform: rotate(0deg) scale(1.02) !important; transition: transform 0.4s ease; }
  .about-img { transition: transform 0.5s ease; }
  .about-img:hover { transform: scale(1.03); }

  @media (max-width: 900px) {
    .hero { flex-direction: column !important; }
    .about-in { grid-template-columns: 1fr !important; }
    .projects-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
  }

  @media (max-width: 768px) {
    .nav-links { display: none !important; }
    .menu-btn { display: block !important; }
  }
`;

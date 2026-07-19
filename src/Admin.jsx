import promacLogo from "./assets/promaclogo.jpeg";
import Estimator from "./Estimator";

const C = {
  bg: "#0A0A0B",
  surface: "#111113",
  card: "#16161A",
  border: "#242428",
  gold: "#C9A84C",
  goldLight: "#E8C97A",
  white: "#F5F4EF",
  muted: "#888888",
};

const s = {
  root: { fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: C.bg, color: C.white, minHeight: "100vh" },
  header: { borderBottom: `1px solid ${C.border}`, padding: "20px 32px", display: "flex", alignItems: "center", gap: 12 },
  logoCircle: { width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: `2px solid ${C.gold}`, flexShrink: 0, background: "#000" },
  logoImg: { width: "100%", height: "100%", objectFit: "cover" },
  headerTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 2, color: C.white },
  headerSub: { fontSize: 11, color: C.muted, letterSpacing: 1, textTransform: "uppercase" },
  backLink: { marginLeft: "auto", color: C.muted, fontSize: 13, textDecoration: "none" },
  main: { maxWidth: 1000, margin: "0 auto", padding: "60px 32px" },
  tag: { fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.gold, fontWeight: 600, marginBottom: 16 },
  h1: { fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: 2, margin: "0 0 16px", color: C.white },
  sub: { fontSize: 15, color: C.muted, lineHeight: 1.7, maxWidth: 560, marginBottom: 48 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 },
  card: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "28px" },
  cardIcon: { fontSize: 28, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 8 },
  cardDesc: { fontSize: 13, color: C.muted, lineHeight: 1.6 },
  sectionDivider: { borderTop: `1px solid ${C.border}`, margin: "56px 0 48px" },
};

export default function Admin() {
  return (
    <div style={s.root}>
      <header style={s.header}>
        <div style={s.logoCircle}>
          <img src={promacLogo} alt="ProMac" style={s.logoImg} />
        </div>
        <div>
          <div style={s.headerTitle}>ProMac Admin</div>
          <div style={s.headerSub}>Private — Owner Only</div>
        </div>
        <a href="/" style={s.backLink}>
          ← Back to Site
        </a>
      </header>

      <main style={s.main}>
        <div style={s.tag}>Dashboard</div>
        <h1 style={s.h1}>Welcome back</h1>
        <p style={s.sub}>This page is protected — it isn't linked anywhere on the public site and requires the admin login to view.</p>

        <div style={s.grid}>
          <div style={s.card}>
            <div style={s.cardIcon}>📋</div>
            <div style={s.cardTitle}>Leads</div>
            <div style={s.cardDesc}>Contact form submissions from the site — coming soon.</div>
          </div>
          <div style={s.card}>
            <div style={s.cardIcon}>🖼️</div>
            <div style={s.cardTitle}>Gallery</div>
            <div style={s.cardDesc}>Upload and manage project photos — coming soon.</div>
          </div>
          <div style={s.card}>
            <div style={s.cardIcon}>✏️</div>
            <div style={s.cardTitle}>Site Content</div>
            <div style={s.cardDesc}>Edit services, projects, and contact info — coming soon.</div>
          </div>
        </div>

        <div style={s.sectionDivider} />

        <div style={s.tag}>Contractor Tool</div>
        <h1 style={s.h1}>Raw Material Estimator</h1>
        <p style={s.sub}>Answer a few questions about the project's rooms, electrical, plumbing, and insulation needs to get a preliminary material and circuit estimate.</p>
        <Estimator />
      </main>
    </div>
  );
}

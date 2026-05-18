import { useState, useEffect, useRef } from "react";
import rajImg from "./assets/raj.jpeg";

// ─── BRAND CONFIG ────────────────────────────────────────────────────────────
const BRAND = {
  name: "CodeVerse Academy",
  tagline: "Where Future Coders Begin",
  headline: "Code the Future. Master AI. Lead Tomorrow.",
  subheadline:
    "India's most forward-thinking computer institute for school students & young learners — teaching Python, AI, Web Dev & more through hands-on, project-based education.",
  colors: {
    primary: "#00F5FF",
    secondary: "#7B2FFF",
    accent: "#FF2D78",
    dark: "#050A18",
    darkCard: "#0A1628",
    darkBorder: "#1A2A4A",
    text: "#E2E8F0",
    muted: "#64748B",
  },
  social: { instagram: "#", youtube: "#", linkedin: "#", twitter: "#", whatsapp: "#" },
};

// ─── COURSES DATA ─────────────────────────────────────────────────────────────
const COURSES = [
  {
    id: 1, icon: "🖥️", title: "Computer Fundamentals",
    level: "Beginner", duration: "2 Months", students: "2,400+",
    price: "₹9999", desc: "Master hardware, software, OS, MS Office, internet safety, and digital literacy. The perfect launchpad.",
    skills: ["MS Office", "Internet", "Typing", "File Management"],
    color: "#00F5FF",
  },
  {
    id: 2, icon: "🐍", title: "Python Programming",
    level: "Beginner–Inter.", duration: "3 Months", students: "1,800+",
    price: "₹9999", desc: "Learn Python from scratch. Variables, loops, functions, OOP, and build real mini-projects.",
    skills: ["Python 3", "OOP", "File I/O", "Mini Projects"],
    color: "#7B2FFF",
  },
  {
    id: 3, icon: "🤖", title: "AI & Machine Learning Basics",
    level: "Intermediate", duration: "1 Months", students: "950+",
    price: "₹3,999", desc: "Demystify AI. Train your first ML models, understand neural networks, and build AI-powered apps.",
    skills: ["ML Concepts", "Scikit-learn", "Data Viz", "AI Projects"],
    color: "#FF2D78",
  },
  {
    id: 4, icon: "🌐", title: "Web Development",
    level: "Beginner–Inter.", duration: "2.5 Months", students: "1,200+",
    price: "₹3,499", desc: "Build beautiful, responsive websites using HTML, CSS, JavaScript, and React fundamentals.",
    skills: ["HTML/CSS", "JavaScript", "React Basics", "Deployment"],
    color: "#F59E0B",
  },
  {
    id: 5, icon: "🛡️", title: "Cyber Safety & Digital Literacy",
    level: "Beginner", duration: "1 Months", students: "3,100+",
    price: "₹999", desc: "Stay safe online. Password hygiene, phishing awareness, data privacy, and ethical internet use.",
    skills: ["Password Safety", "Privacy", "Ethics", "Cyber Law"],
    color: "#10B981",
  },
  {
    id: 6, icon: "🧠", title: "Programming Logic & Problem Solving",
    level: "Beginner", duration: "1.1 Months", students: "1,600+",
    price: "₹1,999", desc: "Build algorithmic thinking, flowcharts, pseudocode, and logical reasoning for any language.",
    skills: ["Algorithms", "Flowcharts", "Logic", "Debugging"],
    color: "#6366F1",
  },
  {
    id: 7, icon: "⚡", title: "AI Tools for Students",
    level: "All Levels", duration: "3 Weeks", students: "2,700+",
    price: "₹1,299", desc: "Leverage ChatGPT, Gemini, Copilot, Canva AI, and more to supercharge your studies and projects.",
    skills: ["ChatGPT", "Canva AI", "Productivity", "Prompt Craft"],
    color: "#EC4899",
  },
  {
    id: 8, icon: "🚀", title: "Intermediate Software Development",
    level: "Intermediate", duration: "12 Weeks", students: "600+",
    price: "₹4,999", desc: "Full-stack mini projects, Git version control, APIs, databases, and real-world deployment.",
    skills: ["Git", "APIs", "Databases", "Deployment"],
    color: "#EF4444",
  },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", age: 16, course: "Python Programming", avatar: "PS", rating: 5, review: "I joined NexaAcademy not knowing a single line of code. In 8 weeks, I built my own quiz app! The teachers are so patient and the projects make it all real.", city: "Grade 10, DPS" },
  { name: "Arjun Mehta", age: 15, course: "AI & ML Basics", avatar: "AM", rating: 5, review: "The AI course literally changed how I think. I trained an image classifier! My school project won first place because of what I learned here.", city: "Grade 9, Kendriya Vidyalaya" },
  { name: "Sneha Patel", age: 17, course: "Web Development", avatar: "SP", rating: 5, review: "I built and deployed my portfolio website before finishing the course! NexaAcademy's project-based approach is miles ahead of any YouTube tutorial.", city: "Grade 11, Ryan International" },
  { name: "Rohit Kumar", age: 14, course: "Computer Fundamentals", avatar: "RK", rating: 5, review: "My mom enrolled me thinking it was just typing class. Now I'm learning Python too! The teachers make complex things so simple and fun.", city: "Grade 8, St. Xavier's" },
  { name: "Ananya Singh", age: 16, course: "AI Tools for Students", avatar: "AS", rating: 5, review: "The AI Tools course saved my study time by 50%. I now use AI to help with research, presentations, and even debug my code. Every student needs this!", city: "Grade 10, Amity School" },
  { name: "Dev Chauhan", age: 17, course: "Intermediate Software Dev", avatar: "DC", rating: 5, review: "I came in with basic Python knowledge. Now I've deployed two full web apps on the internet. The mentors push you to actually build things — not just watch.", city: "Grade 11, Modern School" },
];

const STATS = [
  { value: "4,200+", label: "Students Trained", icon: "👨‍🎓" },
  { value: "100%", label: "Satisfaction Rate", icon: "⭐" },
  { value: "8", label: "Courses Offered", icon: "📚" },
  { value: "120+", label: "Student Projects", icon: "🚀" },
  { value: "3", label: "Years of Excellence", icon: "🏆" },
  { value: "50+", label: "Industry Mentors", icon: "👨‍💼" },
];

const FAQS = [
  { q: "What age group is NexaAcademy for?", a: "Our courses are designed for students aged 10–18, from Class 5 to Class 12. We have beginner tracks for young learners and advanced modules for older students." },
  { q: "Do I need any prior coding experience?", a: "Absolutely not! Most of our courses start from zero. We have specific 'zero to hero' tracks for complete beginners. Just bring curiosity!" },
  { q: "Are classes online, offline, or both?", a: "We offer both! In-person batches at our center with full lab access, and live online classes via Zoom with recorded replays. Hybrid options also available." },
  { q: "What certificate will I receive?", a: "Students receive NexaAcademy completion certificates for each course, plus optional assessment-based merit certificates that carry industry recognition." },
  { q: "How are the batches structured?", a: "We run small batches of 15–20 students for personal attention. Weekend batches, weekday evening batches, and vacation intensive batches are available." },
  { q: "Can parents track their child's progress?", a: "Yes! Parents receive weekly progress reports, project showcases, and can book 1-on-1 parent-teacher meetings anytime through our parent portal." },
];

const TECH_STACK = [
  { name: "Python", icon: "🐍", category: "Language" },
  { name: "HTML/CSS", icon: "🎨", category: "Web" },
  { name: "JavaScript", icon: "⚡", category: "Web" },
  { name: "React", icon: "⚛️", category: "Framework" },
  { name: "TensorFlow", icon: "🧠", category: "AI/ML" },
  { name: "Scikit-learn", icon: "📊", category: "AI/ML" },
  { name: "Git & GitHub", icon: "🔀", category: "Tools" },
  { name: "VS Code", icon: "💻", category: "Tools" },
  { name: "ChatGPT API", icon: "🤖", category: "AI Tools" },
  { name: "Figma", icon: "🎭", category: "Design" },
  { name: "Linux CLI", icon: "🖥️", category: "System" },
  { name: "SQL Basics", icon: "🗄️", category: "Database" },
];

const NAV_LINKS = ["Home", "About", "Courses", "Projects", "Testimonials", "Blog", "Contact"];

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const chars = "01アイウエオPYTHONAIWEBCODE</>{}[]";
    const fontSize = 12;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(5,10,24,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00F5FF22";
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? "#ffffff44" : "#00F5FF18";
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 50);
    return () => clearInterval(id);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6, pointerEvents: "none" }} />;
}

function GlowButton({ children, onClick, variant = "primary", className = "" }) {
  const styles = {
    primary: { background: "linear-gradient(135deg, #00F5FF, #7B2FFF)", color: "#fff", border: "none" },
    secondary: { background: "transparent", color: "#00F5FF", border: "1px solid #00F5FF" },
    accent: { background: "linear-gradient(135deg, #FF2D78, #7B2FFF)", color: "#fff", border: "none" },
  };
  return (
    <button onClick={onClick} className={className} style={{
      ...styles[variant],
      padding: "13px 28px", borderRadius: "8px", fontFamily: "'Syne', sans-serif",
      fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", letterSpacing: "0.04em",
      transition: "all 0.3s ease", position: "relative", overflow: "hidden",
      boxShadow: variant === "primary" ? "0 0 30px #00F5FF33" : variant === "accent" ? "0 0 30px #FF2D7833" : "none",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.boxShadow = variant !== "secondary" ? "0 0 50px #00F5FF55" : "0 0 20px #00F5FF44"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = variant === "primary" ? "0 0 30px #00F5FF33" : "none"; }}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#00F5FF11", border: "1px solid #00F5FF33", borderRadius: "100px", padding: "6px 16px", marginBottom: "16px" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00F5FF", display: "inline-block", boxShadow: "0 0 8px #00F5FF" }} />
      <span style={{ color: "#00F5FF", fontSize: "0.78rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

function SectionTitle({ children, sub, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "48px" }}>
      {children}
      {sub && <p style={{ color: "#94A3B8", fontSize: "1.05rem", maxWidth: 600, margin: center ? "12px auto 0" : "12px 0 0", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ activePage, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(5,10,24,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #1A2A4A" : "none",
        transition: "all 0.4s ease", padding: "0 5vw",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          {/* Logo */}
          <div onClick={() => setPage("Home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", boxShadow: "0 0 16px #00F5FF55" }}>⚡</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{BRAND.name}</span>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: "2px", alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => setPage(link)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: activePage === link ? "#00F5FF" : "#CBD5E1",
                fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.88rem",
                padding: "8px 14px", borderRadius: 6, letterSpacing: "0.02em",
                transition: "all 0.2s", borderBottom: activePage === link ? "1px solid #00F5FF" : "1px solid transparent",
              }}
                onMouseEnter={e => { if (activePage !== link) e.currentTarget.style.color = "#E2E8F0"; }}
                onMouseLeave={e => { if (activePage !== link) e.currentTarget.style.color = "#CBD5E1"; }}
              >{link}</button>
            ))}
            <GlowButton onClick={() => setPage("Admission")} style={{ marginLeft: 8 }}>Enroll Now</GlowButton>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: "#00F5FF", fontSize: "1.5rem", cursor: "pointer" }} className="mobile-menu-btn">☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(5,10,24,0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "#CBD5E1", fontSize: "1.8rem", cursor: "pointer" }}>✕</button>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => { setPage(link); setMobileOpen(false); }} style={{
              background: "none", border: "none", color: "#E2E8F0", fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: "1.6rem", cursor: "pointer", letterSpacing: "0.04em",
            }}>{link}</button>
          ))}
          <GlowButton onClick={() => { setPage("Admission"); setMobileOpen(false); }}>Enroll Now</GlowButton>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050A18; color: #E2E8F0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #050A18; } ::-webkit-scrollbar-thumb { background: #1A2A4A; border-radius: 3px; }
        .fade-in { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-in.visible { opacity: 1; transform: translateY(0); }
        .slide-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .slide-left.visible { opacity: 1; transform: translateX(0); }
        .slide-right { opacity: 0; transform: translateX(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .slide-right.visible { opacity: 1; transform: translateX(0); }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .courses-grid { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .tech-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .test-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection({ setPage }) {
  const [typed, setTyped] = useState("");
  const words = ["Python Developer", "AI Engineer", "Web Creator", "Tech Innovator", "Digital Builder"];
  const [wIdx, setWIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = words[wIdx];
      if (!deleting) {
        setTyped(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) { setTimeout(() => setDeleting(true), 1600); return; }
        setCharIdx(c => c + 1);
      } else {
        setTyped(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWIdx(w => (w + 1) % words.length); setCharIdx(0); return; }
        setCharIdx(c => c - 1);
      }
    }, deleting ? 60 : 110);
    return () => clearTimeout(timeout);
  }, [typed, deleting, wIdx, charIdx]);

  return (
    <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", background: "radial-gradient(ellipse 80% 60% at 50% 0%, #0A1628 0%, #050A18 70%)" }}>
      <MatrixRain />
      {/* Glowing orbs */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #00F5FF0A 0%, transparent 70%)", top: "10%", left: "-10%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #7B2FFF0A 0%, transparent 70%)", bottom: "10%", right: "-5%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 5vw 80px", position: "relative", zIndex: 1, width: "100%" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FF2D7811", border: "1px solid #FF2D7833", borderRadius: 100, padding: "6px 16px", marginBottom: 24, animation: "fadeIn 0.6s ease" }}>
              <span style={{ fontSize: "0.7rem" }}>🔥</span>
              <span style={{ color: "#FF2D78", fontSize: "0.75rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>NEW BATCH STARTING SOON</span>
            </div>

            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1, marginBottom: 20 }}>
              <span style={{ color: "#E2E8F0" }}>Code the </span>
              <span style={{ background: "linear-gradient(135deg, #00F5FF, #7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Future.</span>
              <br />
              <span style={{ color: "#E2E8F0" }}>Master </span>
              <span style={{ background: "linear-gradient(135deg, #FF2D78, #7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI.</span>
              <br />
              <span style={{ color: "#E2E8F0" }}>Lead </span>
              <span style={{ color: "#E2E8F0" }}>Tomorrow.</span>
            </h1>

            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", marginBottom: 20, height: 36, display: "flex", alignItems: "center" }}>
              <span style={{ color: "#64748B" }}>&gt; </span>
              <span style={{ color: "#00F5FF", marginLeft: 6 }}>Become a&nbsp;</span>
              <span style={{ color: "#7B2FFF", fontWeight: 600 }}>{typed}</span>
              <span style={{ color: "#00F5FF", animation: "blink 1s step-end infinite" }}>|</span>
            </div>

            <p style={{ color: "#94A3B8", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 36, maxWidth: 520, fontFamily: "'DM Sans', sans-serif" }}>
              India's most forward-thinking academy for school students. Learn Python, AI, Web Dev & more through hands-on, project-based education that builds real careers.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <GlowButton onClick={() => setPage("Admission")}>🚀 Enroll Free Trial</GlowButton>
              <GlowButton variant="secondary" onClick={() => setPage("Courses")}>Explore Courses →</GlowButton>
            </div>

            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[["4,200+", "Students"], ["100%", "Satisfaction"], ["8", "Courses"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
                  <div style={{ color: "#64748B", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Code Window */}
          <div style={{ position: "relative" }}>
            <div style={{
              background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 16,
              overflow: "hidden", boxShadow: "0 0 80px #00F5FF15, 0 0 40px #7B2FFF10",
              transform: "perspective(1000px) rotateY(-5deg) rotateX(3deg)",
            }}>
              {/* Window bar */}
              <div style={{ background: "#0F1E38", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #1A2A4A" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
                <span style={{ marginLeft: 8, color: "#475569", fontSize: "0.78rem", fontFamily: "'JetBrains Mono', monospace" }}>CodeVerse_LearnAI.py</span>
              </div>

              {/* Code content */}
              <div style={{ padding: "20px 24px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", lineHeight: 1.8 }}>
                {[
                  { line: "1", code: <><span style={{ color: "#7B2FFF" }}>import</span><span style={{ color: "#E2E8F0" }}> AI Learning </span><span style={{ color: "#7B2FFF" }}>from</span><span style={{ color: "#00F5FF" }}> CodeVerse</span></> },
                  { line: "2", code: <><span style={{ color: "#7B2FFF" }}>In </span><span style={{ color: "#E2E8F0" }}> CodeVerse </span><span style={{ color: "#7B2FFF" }}>Learn from</span><span style={{ color: "#FF2D78" }}> RAJ </span></> },
                  { line: "3", code: <span style={{ color: "#475569" }}># 🚀 Build your Future with AI Learning </span> },
                  { line: "4", code: <><span style={{ color: "#FF2D78" }}>Academy</span><span style={{ color: "#E2E8F0" }}> = CodeVerse</span><span style={{ color: "#F59E0B" }}>create</span><span style={{ color: "#E2E8F0" }}>(</span></> },
                  { line: "5", code: <><span style={{ color: "#E2E8F0" }}>{"    "}</span><span style={{ color: "#00F5FF" }}>student</span><span style={{ color: "#E2E8F0" }}>=</span><span style={{ color: "#10B981" }}>"You"</span><span style={{ color: "#E2E8F0" }}>,</span></> },
                  { line: "6", code: <><span style={{ color: "#E2E8F0" }}>{"    "}</span><span style={{ color: "#00F5FF" }}>Trainer</span><span style={{ color: "#E2E8F0" }}>=</span><span style={{ color: "#10B981" }}>"RAJ"</span><span style={{ color: "#E2E8F0" }}>,</span></> },
                  { line: "6", code: <><span style={{ color: "#E2E8F0" }}>{"    "}</span><span style={{ color: "#00F5FF" }}>potential</span><span style={{ color: "#E2E8F0" }}>=</span><span style={{ color: "#10B981" }}>"Unlimited"</span></> },
                  { line: "7", code: <span style={{ color: "#E2E8F0" }}>)</span> },
                  { line: "8", code: <span style={{ color: "#475569" }}>&nbsp;</span> },
                  { line: "9", code: <><span style={{ color: "#F59E0B" }}>print</span><span style={{ color: "#E2E8F0" }}>(model.</span><span style={{ color: "#00F5FF" }}>train_and_deploy</span><span style={{ color: "#E2E8F0" }}>())</span></> },
                  { line: "10", code: <span style={{ color: "#475569" }}># OUTPUT:</span> },
                  { line: "11", code: <><span style={{ color: "#10B981" }}>✅ "Future Leader Deployed!"</span></> },
                ].map(({ line, code }) => (
                  <div key={line} style={{ display: "flex", gap: 16 }}>
                    <span style={{ color: "#2A3A5A", minWidth: 16, userSelect: "none", textAlign: "right", fontSize: "0.75rem" }}>{line}</span>
                    <span>{code}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div style={{ position: "absolute", top: -20, right: -20, background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", borderRadius: 12, padding: "10px 16px", fontSize: "0.8rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, boxShadow: "0 0 30px #00F5FF44", animation: "float 3s ease-in-out infinite" }}>
              🤖 AI Powered
            </div>
            <div style={{ position: "absolute", bottom: -20, left: -20, background: "linear-gradient(135deg,#FF2D78,#7B2FFF)", borderRadius: 12, padding: "10px 16px", fontSize: "0.8rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, boxShadow: "0 0 30px #FF2D7844", animation: "float 3s ease-in-out infinite 1.5s" }}>
              🏆 Certified Courses
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100% {opacity:1} 50% {opacity:0} }
        @keyframes float { 0%,100% {transform:translateY(0)} 50% {transform:translateY(-10px)} }
        @keyframes fadeIn { from {opacity:0;transform:translateY(20px)} to {opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────
function StatsBar() {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ background: "#0A1628", borderTop: "1px solid #1A2A4A", borderBottom: "1px solid #1A2A4A", padding: "40px 5vw" }}>
      <div className="stats-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 24, textAlign: "center" }}>
        {STATS.map((s, i) => (
          <div key={s.label} className={`fade-in ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.08}s` }}>
            <div style={{ fontSize: "1.8rem", marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
            <div style={{ color: "#64748B", fontSize: "0.78rem", fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
function WhyUs() {
  const [ref, visible] = useInView();
  const reasons = [
    { icon: "🎯", title: "Project-Based Learning", desc: "Every concept leads to a real project. Students graduate with a portfolio, not just a certificate." },
    { icon: "🧑‍🏫", title: "Expert Instructors", desc: "Taught by working professionals and industry mentors — not just educators, but builders." },
    { icon: "📱", title: "Small Batch Sizes", desc: "Max 15–20 students per batch. Personal attention is not an option — it's our standard." },
    { icon: "🏅", title: "Industry Certificates", desc: "Recognized completion and merit certificates that add real value to profiles and applications." },
    { icon: "📊", title: "Parent Progress Reports", desc: "Weekly updates, project showcases, and parent-teacher meetings keep families engaged." },
    { icon: "🌍", title: "Future-Ready Curriculum", desc: "Curriculum updated quarterly to stay aligned with actual industry demands and emerging tech." },
  ];
  return (
    <section ref={ref} style={{ padding: "100px 5vw", background: "#050A18" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>Why CodeVerse Academy</SectionLabel>
          <SectionTitle sub="We're not just another computer class. We're building the next generation of tech leaders.">
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#E2E8F0" }}>
              Built Different. Built for the <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Future.</span>
            </h2>
          </SectionTitle>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="courses-grid">
          {reasons.map((r, i) => (
            <div key={r.title} className={`fade-in ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.1}s`, background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 16, padding: "28px 24px", transition: "all 0.3s ease", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00F5FF44"; e.currentTarget.style.boxShadow = "0 0 30px #00F5FF11"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1A2A4A"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 14 }}>{r.icon}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#E2E8F0", marginBottom: 8 }}>{r.title}</h3>
              <p style={{ color: "#64748B", fontSize: "0.88rem", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COURSES ──────────────────────────────────────────────────────────────────
function CoursesSection({ setPage }) {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ padding: "100px 5vw", background: "linear-gradient(180deg, #050A18 0%, #0A1628 100%)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>Our Courses</SectionLabel>
          <SectionTitle sub="8 career-defining tracks from beginner to intermediate. Each course is practical, project-driven, and future-focused.">
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#E2E8F0" }}>
              Find Your <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Learning Track</span>
            </h2>
          </SectionTitle>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="courses-grid">
          {COURSES.map((c, i) => (
            <div key={c.id} className={`fade-in ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.08}s`, background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 16, padding: "24px", overflow: "hidden", position: "relative", transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + "66"; e.currentTarget.style.boxShadow = `0 0 40px ${c.color}11`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1A2A4A"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${c.color}, transparent)` }} />
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 48, height: 48, background: c.color + "18", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", border: `1px solid ${c.color}33` }}>{c.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#E2E8F0", marginBottom: 4 }}>{c.title}</h3>
                    <span style={{ background: c.color + "22", color: c.color, borderRadius: 100, padding: "2px 10px", fontSize: "0.72rem", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{c.level}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#E2E8F0" }}>{c.price}</div>
                  <div style={{ color: "#64748B", fontSize: "0.72rem" }}>{c.duration}</div>
                </div>
              </div>
              <p style={{ color: "#94A3B8", fontSize: "0.84rem", lineHeight: 1.7, marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>{c.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                {c.skills.map(s => (
                  <span key={s} style={{ background: "#0F1E38", border: "1px solid #1A2A4A", color: "#94A3B8", borderRadius: 6, padding: "3px 10px", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace" }}>{s}</span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#64748B", fontSize: "0.78rem" }}>👥 {c.students} enrolled</span>
                <button onClick={() => setPage("Admission")} style={{ background: c.color + "22", border: `1px solid ${c.color}44`, color: c.color, borderRadius: 8, padding: "7px 16px", fontSize: "0.8rem", fontFamily: "'Syne', sans-serif", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = c.color + "33"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = c.color + "22"; }}
                >Enroll →</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <GlowButton onClick={() => setPage("Courses")}>View Full Curriculum</GlowButton>
        </div>
      </div>
    </section>
  );
}

// ─── ROADMAP ──────────────────────────────────────────────────────────────────
function Roadmap() {
  const [ref, visible] = useInView();
  const steps = [
    { step: "01", title: "Enroll & Assess", desc: "Quick placement test to find the right starting point for each student.", icon: "📋", color: "#00F5FF" },
    { step: "02", title: "Foundation Building", desc: "Computer basics, logic, typing, and digital literacy — a solid base.", icon: "🧱", color: "#7B2FFF" },
    { step: "03", title: "Core Programming", desc: "Python fundamentals with mini-projects after every module.", icon: "🐍", color: "#FF2D78" },
    { step: "04", title: "Specialisation Track", desc: "Choose AI/ML, Web Dev, or Software Dev based on interest.", icon: "🎯", color: "#F59E0B" },
    { step: "05", title: "Project Showcase", desc: "Build and present a capstone project to mentors and peers.", icon: "🚀", color: "#10B981" },
    { step: "06", title: "Certification & Career", desc: "Receive certificates, build your portfolio, and get career guidance.", icon: "🏅", color: "#6366F1" },
  ];
  return (
    <section ref={ref} style={{ padding: "100px 5vw", background: "#050A18" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>Learning Journey</SectionLabel>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#E2E8F0", marginBottom: 12 }}>
            Your <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>6-Step Roadmap</span>
          </h2>
          <p style={{ color: "#94A3B8", maxWidth: 520, margin: "0 auto" }}>From zero to portfolio-ready. A clear, structured journey every student follows.</p>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, #00F5FF, #7B2FFF, #FF2D78)", transform: "translateX(-50%)", opacity: 0.3 }} className="desktop-nav" />
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {steps.map((s, i) => (
              <div key={s.step} className={`fade-in ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.12}s`, display: "flex", alignItems: "center", gap: 32, justifyContent: i % 2 === 0 ? "flex-start" : "flex-end" }}>
                {i % 2 !== 0 && <div style={{ flex: 1 }} className="desktop-nav" />}
                <div style={{ background: "#0A1628", border: `1px solid ${s.color}44`, borderRadius: 16, padding: "24px", maxWidth: 420, flex: 1 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "99"; e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.transition = "all 0.3s"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = s.color + "44"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: s.color, fontWeight: 700, fontSize: "0.8rem", opacity: 0.7 }}>{s.step}</span>
                    <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", fontSize: "1rem" }}>{s.title}</h3>
                  </div>
                  <p style={{ color: "#64748B", fontSize: "0.88rem", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                </div>
                {i % 2 === 0 && <div style={{ flex: 1 }} className="desktop-nav" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TECH STACK ───────────────────────────────────────────────────────────────
function TechStack() {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ padding: "80px 5vw", background: "#0A1628", borderTop: "1px solid #1A2A4A" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Tech You'll Master</SectionLabel>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#E2E8F0" }}>
            Industry-Standard <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Technologies</span>
          </h2>
        </div>
        <div className="tech-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
          {TECH_STACK.map((t, i) => (
            <div key={t.name} className={`fade-in ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.05}s`, background: "#050A18", border: "1px solid #1A2A4A", borderRadius: 12, padding: "18px 12px", textAlign: "center", cursor: "default", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00F5FF44"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 0 20px #00F5FF11"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1A2A4A"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.76rem", color: "#E2E8F0", marginBottom: 3 }}>{t.name}</div>
              <div style={{ color: "#475569", fontSize: "0.65rem", fontFamily: "'DM Sans', sans-serif" }}>{t.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [ref, visible] = useInView();
  const [active, setActive] = useState(0);
  return (
    <section ref={ref} style={{ padding: "100px 5vw", background: "#050A18" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>Student Stories</SectionLabel>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#E2E8F0" }}>
            Real Students. <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Real Results.</span>
          </h2>
        </div>
        <div className="test-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`fade-in ${visible ? "visible" : ""}`} style={{
              transitionDelay: `${i * 0.1}s`, background: "#0A1628", border: "1px solid #1A2A4A",
              borderRadius: 16, padding: "24px", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#7B2FFF44"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1A2A4A"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>{Array(t.rating).fill("⭐").map((s, i) => <span key={i} style={{ fontSize: "0.9rem" }}>{s}</span>)}</div>
              <p style={{ color: "#94A3B8", fontSize: "0.88rem", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", marginBottom: 18, fontStyle: "italic" }}>"{t.review}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#E2E8F0" }}>{t.name}</div>
                  <div style={{ color: "#475569", fontSize: "0.72rem" }}>{t.city} · {t.course}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ padding: "80px 5vw", background: "#0A1628", borderTop: "1px solid #1A2A4A" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>FAQ</SectionLabel>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#E2E8F0" }}>
            Common <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Questions</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => (
            <div key={i} className={`fade-in ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.08}s`, background: "#050A18", border: `1px solid ${open === i ? "#00F5FF44" : "#1A2A4A"}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.3s" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 12 }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, color: "#E2E8F0", fontSize: "0.92rem", textAlign: "left" }}>{faq.q}</span>
                <span style={{ color: "#00F5FF", fontSize: "1.1rem", transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {open === i && <div style={{ padding: "0 20px 18px", color: "#94A3B8", fontSize: "0.88rem", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BAND ─────────────────────────────────────────────────────────────────
function CTABand({ setPage }) {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ padding: "80px 5vw", background: "linear-gradient(135deg, #0A1628 0%, #0F1E38 50%, #0A1628 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 50%, #00F5FF05 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }} className={`fade-in ${visible ? "visible" : ""}`}>
        <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🚀</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#E2E8F0", marginBottom: 16 }}>
          Start Your Coding Journey <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Today</span>
        </h2>
        <p style={{ color: "#94A3B8", fontSize: "1rem", lineHeight: 1.8, marginBottom: 36, fontFamily: "'DM Sans', sans-serif" }}>
          Join 4,200+ students who are already coding, building AI, and shaping their future at NexaAcademy. Free trial class available — no commitment required.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <GlowButton onClick={() => setPage("Admission")}>📋 Enroll Now — It's Free to Start</GlowButton>
          <GlowButton variant="secondary" onClick={() => setPage("Contact")}>Book a Free Demo</GlowButton>
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section style={{ padding: "60px 5vw", background: "#050A18", borderTop: "1px solid #1A2A4A" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>Stay Updated</SectionLabel>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", fontSize: "1.3rem", marginBottom: 8 }}>New Batch Alerts & Tech Tips</h3>
        <p style={{ color: "#64748B", fontSize: "0.88rem", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>Get notified about new batches, free workshops, and weekly coding tips straight to your inbox.</p>
        {sent ? (
          <div style={{ color: "#10B981", fontFamily: "'Syne', sans-serif", fontWeight: 600, padding: "16px", background: "#10B98111", border: "1px solid #10B98133", borderRadius: 10 }}>✅ You're subscribed! Welcome to the NexaAcademy community.</div>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex: 1, background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 8, padding: "13px 16px", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none" }} onFocus={e => e.currentTarget.style.borderColor = "#00F5FF44"} onBlur={e => e.currentTarget.style.borderColor = "#1A2A4A"} />
            <GlowButton onClick={() => email && setSent(true)}>Subscribe</GlowButton>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#020710", borderTop: "1px solid #1A2A4A", padding: "60px 5vw 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>⚡</div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{BRAND.name}</span>
            </div>
            <p style={{ color: "#475569", fontSize: "0.85rem", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", marginBottom: 20, maxWidth: 280 }}>Empowering the next generation of coders, AI builders, and tech innovators through practical, project-based education.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {["📸", "▶️", "💼", "🐦", "💬"].map((icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#00F5FF44"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1A2A4A"; e.currentTarget.style.transform = "translateY(0)"; }}
                >{icon}</a>
              ))}
            </div>
          </div>
          {[
            { title: "Quick Links", links: ["Home", "About", "Courses", "Testimonials", "Blog", "Contact"] },
            { title: "Courses", links: ["Python Programming", "AI & ML Basics", "Web Development", "Cyber Safety", "AI Tools", "Software Dev"] },
            { title: "Contact", links: ["📍 Vasai, India", "📞 +91 9561404013", "✉️ codeverse.academy07@gmail.com", "🕐 Mon–Sat 9AM–10PM", "🟢 WhatsApp Support"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", fontSize: "0.88rem", marginBottom: 16, letterSpacing: "0.06em" }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map(link => (
                  <button key={link} onClick={() => { if (["Home", "About", "Courses", "Testimonials", "Blog", "Contact"].includes(link)) setPage(link); }} style={{ background: "none", border: "none", color: "#475569", fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem", cursor: "pointer", textAlign: "left", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#00F5FF"}
                    onMouseLeave={e => e.currentTarget.style.color = "#475569"}
                  >{link}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1A2A4A", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "#2A3A5A", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>© 2025 {BRAND.name}. All rights reserved.</span>
          <span style={{ color: "#2A3A5A", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>Built with ❤️ for future tech leaders</span>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE: ABOUT ──────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  const [ref, visible] = useInView();
  const team = [
    { name: "Raj Yadav", role: "Founder & Lead AI Instructor",image: rajImg, exp: "5 yrs · Senior Software Engineer: HDFC" },
    { name: "Sandeep Vishwakarma", role: "Founder & Mentor", bg: "RN", exp: "10+ yrs of Exp in teaching Students" },
    { name: "Pradeep Vishwakarma", role: "AI and Programming trainer", bg: "PS", exp: "5 yrs · SRE: TCS" },
    { name: "Sumit Bansal", role: "Cyber Safety Expert", bg: "VJ", exp: "5 yrs · Ex-Wipro" },
  ];
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 5vw 60px", background: "linear-gradient(180deg, #0A1628 0%, #050A18 100%)", textAlign: "center" }}>
        <SectionLabel>About NexaAcademy</SectionLabel>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#E2E8F0", marginBottom: 20 }}>
          We Build <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Future Coders</span>
        </h1>
        <p style={{ color: "#94A3B8", maxWidth: 680, margin: "0 auto 40px", fontSize: "1.05rem", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>
          NexaAcademy was founded with one mission: make world-class technology education accessible to every school student in India. We don't just teach coding — we build problem-solvers, creators, and innovators who are ready for the AI-powered future.
        </p>
      </section>
      <section ref={ref} style={{ padding: "60px 5vw", background: "#050A18" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", marginBottom: 80 }}>
            <div className={`slide-left ${visible ? "visible" : ""}`}>
              <SectionLabel>Our Mission</SectionLabel>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#E2E8F0", marginBottom: 16 }}>Education That Keeps Up with the World</h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.9, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>The world is changing faster than any textbook can keep up with. At NexaAcademy, we update our curriculum quarterly to ensure every student learns skills that are actually in demand — not just theory from a decade ago.</p>
              <p style={{ color: "#94A3B8", lineHeight: 1.9, fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>Our philosophy: every student learns best when they build something real. That's why every module ends with a hands-on project — not a multiple-choice exam.</p>
              <GlowButton onClick={() => setPage("Admission")}>Join Our Next Batch</GlowButton>
            </div>
            <div className={`slide-right ${visible ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["🎓", "4,200+", "Students Trained"], ["⭐", "100%", "Satisfaction Rate"], ["📚", "8", "Active Courses"], ["🏆", "3", "Years of Excellence"]].map(([icon, val, label]) => (
                <div key={label} style={{ background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 14, padding: "24px", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: 6 }}>{icon}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{val}</div>
                  <div style={{ color: "#64748B", fontSize: "0.78rem", fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "#E2E8F0", textAlign: "center", marginBottom: 40 }}>Meet Our <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mentors</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="courses-grid">
              {team.map((m, i) => (
                <div key={m.name} style={{ background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 14, padding: "28px 20px", textAlign: "center", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#7B2FFF44"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1A2A4A"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <img src={m.image} alt={m.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px",display: "block",border: "2px solid #00F5FF" }}/>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", fontSize: "0.92rem", marginBottom: 4 }}>{m.name}</div>
                  <div style={{ color: "#00F5FF", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{m.role}</div>
                  <div style={{ color: "#475569", fontSize: "0.72rem" }}>{m.exp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: FULL COURSES ───────────────────────────────────────────────────────
function CoursesPage({ setPage }) {
  const [filter, setFilter] = useState("All");
  const levels = ["All", "Beginner", "Intermediate", "All Levels"];
  const filtered = filter === "All" ? COURSES : COURSES.filter(c => c.level.includes(filter.replace("Beginner–Inter.", "Beginner")));
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 5vw 60px", textAlign: "center", background: "linear-gradient(180deg,#0A1628,#050A18)" }}>
        <SectionLabel>All Courses</SectionLabel>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#E2E8F0", marginBottom: 16 }}>
          Find Your <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Perfect Course</span>
        </h1>
        <p style={{ color: "#94A3B8", maxWidth: 520, margin: "0 auto 32px", fontFamily: "'DM Sans', sans-serif" }}>8 carefully designed courses from beginner to intermediate. All project-based. All career-focused.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {levels.map(l => (
            <button key={l} onClick={() => setFilter(l)} style={{ background: filter === l ? "linear-gradient(135deg,#00F5FF,#7B2FFF)" : "#0A1628", border: filter === l ? "none" : "1px solid #1A2A4A", color: filter === l ? "#050A18" : "#94A3B8", borderRadius: 100, padding: "8px 20px", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", transition: "all 0.2s" }}>{l}</button>
          ))}
        </div>
      </section>
      <section style={{ padding: "40px 5vw 80px", background: "#050A18" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="courses-grid">
            {COURSES.map(c => (
              <div key={c.id} style={{ background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 16, padding: "24px", position: "relative", overflow: "hidden", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + "66"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1A2A4A"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${c.color},transparent)` }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, background: c.color + "18", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{c.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0" }}>{c.title}</h3>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <span style={{ background: c.color + "22", color: c.color, borderRadius: 100, padding: "2px 10px", fontSize: "0.7rem", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{c.level}</span>
                      <span style={{ color: "#475569", fontSize: "0.75rem" }}>⏱ {c.duration}</span>
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#E2E8F0" }}>{c.price}</div>
                  </div>
                </div>
                <p style={{ color: "#94A3B8", fontSize: "0.86rem", lineHeight: 1.7, marginBottom: 14 }}>{c.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                  {c.skills.map(s => <span key={s} style={{ background: "#0F1E38", border: "1px solid #1A2A4A", color: "#94A3B8", borderRadius: 6, padding: "3px 10px", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace" }}>{s}</span>)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#475569", fontSize: "0.78rem" }}>👥 {c.students} enrolled</span>
                  <GlowButton onClick={() => setPage("Admission")} variant="secondary">Enroll Now →</GlowButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: CONTACT ────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", msg: "" });
  const [sent, setSent] = useState(false);
  const handleChange = k => e => setForm({ ...form, [k]: e.target.value });
  const inputStyle = { width: "100%", background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 8, padding: "13px 16px", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none", display: "block" };
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 5vw", background: "linear-gradient(180deg,#0A1628,#050A18)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <SectionLabel>Get In Touch</SectionLabel>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#E2E8F0", marginBottom: 12 }}>
              We'd Love to <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hear From You</span>
            </h1>
          </div>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[["📍", "Visit Us", "101 opposite to Istiyak complex, Sativali naka, Vasai East, Maharashtra — 401208"], ["📞", "Call / WhatsApp", "+91 9561404013/8446818026 · Available Mon–Sat 9AM–10PM"], ["✉️", "Email Us", "codeverse.academy07@gmail.com · Response within 2 hours"], ["🕐", "Batch Timings", "Morning: 8AM–10AM · Evening: 6PM–9PM · Weekend:9AM–1PM"]].map(([icon, title, info]) => (
                  <div key={title} style={{ display: "flex", gap: 16, background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 12, padding: "20px" }}>
                    <div style={{ width: 40, height: 40, background: "#00F5FF11", border: "1px solid #00F5FF22", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", fontSize: "0.9rem", marginBottom: 4 }}>{title}</div>
                      <div style={{ color: "#64748B", fontSize: "0.83rem", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{info}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 16, padding: "36px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>We'll get back to you within 2 hours. You can also WhatsApp us for a faster response!</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", marginBottom: 24, fontSize: "1.1rem" }}>Send Us a Message</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[["name", "Your Name", "text"], ["email", "Email Address", "email"], ["phone", "Phone / WhatsApp", "tel"]].map(([key, ph, type]) => (
                      <input key={key} type={type} placeholder={ph} value={form[key]} onChange={handleChange(key)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "#00F5FF44"} onBlur={e => e.currentTarget.style.borderColor = "#1A2A4A"} />
                    ))}
                    <textarea placeholder="Your message or question..." value={form.msg} onChange={handleChange("msg")} rows={4} style={{ ...inputStyle, resize: "vertical" }} onFocus={e => e.currentTarget.style.borderColor = "#00F5FF44"} onBlur={e => e.currentTarget.style.borderColor = "#1A2A4A"} />
                    <GlowButton onClick={() => form.name && form.email && setSent(true)}>Send Message →</GlowButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: ADMISSION ──────────────────────────────────────────────────────────
function AdmissionPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", parent: "", phone: "", email: "", school: "", grade: "", course: "", batch: "", heard: "" });
  const [submitted, setSubmitted] = useState(false);
  const change = k => e => setForm({ ...form, [k]: e.target.value });
  const inputStyle = { width: "100%", background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 8, padding: "13px 16px", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none" };

  if (submitted) return (
    <div style={{ paddingTop: 80, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050A18" }}>
      <div style={{ textAlign: "center", maxWidth: 500, padding: "0 20px" }}>
        <div style={{ fontSize: "4rem", marginBottom: 20 }}>🚀</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#E2E8F0", marginBottom: 16 }}>You're Enrolled!</h2>
        <p style={{ color: "#94A3B8", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
          Welcome to NexaAcademy, <strong style={{ color: "#00F5FF" }}>{form.name}</strong>! Your enrollment for <strong style={{ color: "#7B2FFF" }}>{form.course}</strong> has been received. Our team will contact you within 24 hours with batch details.
        </p>
        <div style={{ background: "#0A1628", border: "1px solid #10B98133", borderRadius: 12, padding: "20px", color: "#10B981", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>
          ✅ Application ID: NXA-{Math.floor(100000 + Math.random() * 900000)}<br />
          ✅ Confirmation SMS sent to {form.phone}<br />
          ✅ Free trial class included
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 5vw", background: "linear-gradient(180deg,#0A1628,#050A18)", minHeight: "100vh" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Admission Form</SectionLabel>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.2rem", color: "#E2E8F0", marginBottom: 12 }}>Start Your <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Journey</span></h1>
            <p style={{ color: "#64748B", fontFamily: "'DM Sans', sans-serif" }}>Fill in your details and we'll get back within 24 hours with batch info + free trial class.</p>
          </div>

          {/* Progress */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 36 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: s <= step ? "linear-gradient(135deg,#00F5FF,#7B2FFF)" : "#0A1628", border: s < step ? "none" : `1px solid ${s === step ? "#00F5FF" : "#1A2A4A"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: s <= step ? "#050A18" : "#475569" }}>{s < step ? "✓" : s}</div>
                <span style={{ color: s === step ? "#00F5FF" : "#475569", fontSize: "0.78rem", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{["Personal", "Course", "Confirm"][s - 1]}</span>
                {s < 3 && <div style={{ width: 40, height: 1, background: s < step ? "#00F5FF44" : "#1A2A4A" }} />}
              </div>
            ))}
          </div>

          <div style={{ background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 20, padding: "36px" }}>
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", marginBottom: 8 }}>Student Information</h3>
                {[["name", "Student's Full Name"], ["parent", "Parent / Guardian Name"], ["phone", "WhatsApp Number"], ["email", "Email Address"], ["school", "School Name"], ["grade", "Current Grade / Class"]].map(([key, ph]) => (
                  <input key={key} placeholder={ph} value={form[key]} onChange={change(key)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "#00F5FF44"} onBlur={e => e.currentTarget.style.borderColor = "#1A2A4A"} />
                ))}
                <GlowButton onClick={() => form.name && form.phone && setStep(2)}>Next Step →</GlowButton>
              </div>
            )}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", marginBottom: 8 }}>Course Preference</h3>
                <select value={form.course} onChange={change("course")} style={{ ...inputStyle, appearance: "none" }} onFocus={e => e.currentTarget.style.borderColor = "#00F5FF44"} onBlur={e => e.currentTarget.style.borderColor = "#1A2A4A"}>
                  <option value="">Select a Course</option>
                  {COURSES.map(c => <option key={c.id} value={c.title}>{c.title} — {c.price}</option>)}
                </select>
                <select value={form.batch} onChange={change("batch")} style={{ ...inputStyle, appearance: "none" }} onFocus={e => e.currentTarget.style.borderColor = "#00F5FF44"} onBlur={e => e.currentTarget.style.borderColor = "#1A2A4A"}>
                  <option value="">Preferred Batch Timing</option>
                  <option>Morning — 9:00 AM to 11:00 AM</option>
                  <option>Evening — 5:00 PM to 7:00 PM</option>
                  <option>Weekend — Saturday & Sunday 10AM–1PM</option>
                  <option>Online Live Classes</option>
                </select>
                <select value={form.heard} onChange={change("heard")} style={{ ...inputStyle, appearance: "none" }} onFocus={e => e.currentTarget.style.borderColor = "#00F5FF44"} onBlur={e => e.currentTarget.style.borderColor = "#1A2A4A"}>
                  <option value="">How did you hear about us?</option>
                  <option>Google Search</option>
                  <option>Instagram / Social Media</option>
                  <option>Friend / Family Referral</option>
                  <option>School / Teacher</option>
                  <option>WhatsApp Group</option>
                  <option>YouTube</option>
                </select>
                <div style={{ display: "flex", gap: 12 }}>
                  <GlowButton variant="secondary" onClick={() => setStep(1)}>← Back</GlowButton>
                  <GlowButton onClick={() => form.course && form.batch && setStep(3)}>Review →</GlowButton>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", marginBottom: 20 }}>Review & Confirm</h3>
                <div style={{ background: "#050A18", borderRadius: 12, padding: "20px", marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[["Student", form.name], ["Parent", form.parent], ["Phone", form.phone], ["Email", form.email], ["School", form.school], ["Grade", form.grade], ["Course", form.course], ["Batch", form.batch]].map(([k, v]) => v && (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #0F1E38", paddingBottom: 8 }}>
                      <span style={{ color: "#475569", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif" }}>{k}</span>
                      <span style={{ color: "#E2E8F0", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#10B98111", border: "1px solid #10B98133", borderRadius: 10, padding: "14px 16px", marginBottom: 20, color: "#10B981", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif" }}>
                  ✅ Free trial class included with enrollment<br />✅ No advance payment required to confirm seat<br />✅ We'll contact you within 24 hours
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <GlowButton variant="secondary" onClick={() => setStep(2)}>← Edit</GlowButton>
                  <GlowButton onClick={() => setSubmitted(true)}>🚀 Confirm Enrollment</GlowButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: BLOG ───────────────────────────────────────────────────────────────
function BlogPage({ setPage }) {
  const posts = [
    { title: "Why Every Student Should Learn Python in 2025", category: "Python", date: "May 10, 2025", read: "5 min", emoji: "🐍", desc: "Python is now the most popular language in the world. Here's why it's the perfect first programming language for school students." },
    { title: "AI is Not Going to Take Your Job — But Someone Who Knows AI Will", category: "AI/Career", date: "May 3, 2025", read: "4 min", emoji: "🤖", desc: "Understanding AI tools doesn't require a degree. Here's how students can start leveraging AI today to get ahead." },
    { title: "5 Projects Every Beginner Coder Should Build", category: "Projects", date: "Apr 27, 2025", read: "6 min", emoji: "🚀", desc: "From a calculator app to a personal portfolio — these 5 beginner projects will cement your fundamentals and impress anyone." },
    { title: "Web Development in 2025: Where Should You Start?", category: "Web Dev", date: "Apr 20, 2025", read: "5 min", emoji: "🌐", desc: "HTML, CSS, JavaScript, React — there's a lot to learn. Here's the clearest learning path for web dev beginners." },
    { title: "How Our Students Are Using ChatGPT to Study Smarter", category: "AI Tools", date: "Apr 14, 2025", read: "4 min", emoji: "⚡", desc: "AI tools aren't cheating — they're accelerators. Here's how our students use AI responsibly to 10x their learning." },
    { title: "Parent's Guide: Is My Child Ready for Coding Classes?", category: "For Parents", date: "Apr 7, 2025", read: "3 min", emoji: "👨‍👩‍👧", desc: "The question we hear most from parents. Here's an honest answer based on 3 years of teaching kids of all ages." },
  ];
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 5vw 60px", textAlign: "center", background: "linear-gradient(180deg,#0A1628,#050A18)" }}>
        <SectionLabel>Blog & Updates</SectionLabel>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#E2E8F0", marginBottom: 12 }}>
          Learning Beyond <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>the Classroom</span>
        </h1>
        <p style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif", maxWidth: 500, margin: "0 auto" }}>Tech insights, career tips, and learning guides for students, parents, and aspiring coders.</p>
      </section>
      <section style={{ padding: "40px 5vw 80px", background: "#050A18" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="courses-grid">
          {posts.map((p, i) => (
            <div key={p.title} style={{ background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 16, overflow: "hidden", transition: "all 0.3s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00F5FF44"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1A2A4A"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ background: "linear-gradient(135deg, #0F1E38, #1A2A4A)", height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>{p.emoji}</div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ background: "#00F5FF11", color: "#00F5FF", borderRadius: 100, padding: "3px 10px", fontSize: "0.7rem", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{p.category}</span>
                  <span style={{ color: "#475569", fontSize: "0.72rem" }}>{p.read} read</span>
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", fontSize: "0.95rem", lineHeight: 1.4, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ color: "#64748B", fontSize: "0.83rem", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#475569", fontSize: "0.72rem" }}>{p.date}</span>
                  <button style={{ background: "none", border: "none", color: "#00F5FF", fontSize: "0.78rem", fontFamily: "'Syne', sans-serif", fontWeight: 600, cursor: "pointer" }}>Read more →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: PROJECTS ───────────────────────────────────────────────────────────
function ProjectsPage() {
  const projects = [
    { title: "AI Image Classifier", student: "Arjun M.", grade: "Grade 9", tech: ["Python", "TensorFlow"], emoji: "🤖", desc: "Trained a CNN to identify 10 object categories with 91% accuracy using transfer learning." },
    { title: "Personal Portfolio Website", student: "Sneha P.", grade: "Grade 11", tech: ["HTML", "CSS", "JS"], emoji: "🌐", desc: "Fully responsive portfolio with dark mode, scroll animations, and contact form. Deployed on Netlify." },
    { title: "Quiz App with Python", student: "Rohit K.", grade: "Grade 8", tech: ["Python", "Tkinter"], emoji: "📝", desc: "Desktop quiz application with timer, scoring, and a question bank of 50+ general knowledge questions." },
    { title: "Weather Dashboard", student: "Priya S.", grade: "Grade 10", tech: ["JavaScript", "APIs"], emoji: "🌤️", desc: "Real-time weather app using OpenWeather API, showing 5-day forecasts and animated weather icons." },
    { title: "Chatbot for School FAQ", student: "Dev C.", grade: "Grade 11", tech: ["Python", "NLP", "Flask"], emoji: "💬", desc: "NLP-powered chatbot deployed as a web app that answers common school-related queries." },
    { title: "Cybersecurity Awareness Game", student: "Ananya S.", grade: "Grade 10", tech: ["HTML", "CSS", "JS"], emoji: "🛡️", desc: "Interactive browser game teaching phishing recognition, password hygiene, and safe browsing habits." },
  ];
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 5vw 60px", textAlign: "center", background: "linear-gradient(180deg,#0A1628,#050A18)" }}>
        <SectionLabel>Student Projects</SectionLabel>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#E2E8F0", marginBottom: 12 }}>
          Built by <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Our Students</span>
        </h1>
        <p style={{ color: "#94A3B8", fontFamily: "'DM Sans', sans-serif", maxWidth: 500, margin: "0 auto" }}>120+ real projects built and deployed by NexaAcademy students. Not simulations — actual working software.</p>
      </section>
      <section style={{ padding: "40px 5vw 80px", background: "#050A18" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="courses-grid">
          {projects.map((p, i) => (
            <div key={p.title} style={{ background: "#0A1628", border: "1px solid #1A2A4A", borderRadius: 16, padding: "24px", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#7B2FFF44"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1A2A4A"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>{p.emoji}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#E2E8F0", marginBottom: 8 }}>{p.title}</h3>
              <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {p.tech.map(t => <span key={t} style={{ background: "#7B2FFF22", border: "1px solid #7B2FFF33", color: "#7B2FFF", borderRadius: 6, padding: "3px 10px", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>)}
              </div>
              <div style={{ display: "flex", items: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>{p.student.slice(0, 2).toUpperCase()}</div>
                <div style={{ color: "#475569", fontSize: "0.78rem" }}><span style={{ color: "#94A3B8" }}>{p.student}</span> · {p.grade}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: GALLERY ────────────────────────────────────────────────────────────
function GalleryPage() {
  const items = [
    { label: "Batch Demo Day", emoji: "🎓", bg: "#00F5FF11" },
    { label: "Python Workshop", emoji: "🐍", bg: "#7B2FFF11" },
    { label: "AI Project Fair", emoji: "🤖", bg: "#FF2D7811" },
    { label: "Web Dev Hackathon", emoji: "💻", bg: "#F59E0B11" },
    { label: "Parent Open Day", emoji: "👨‍👩‍👧", bg: "#10B98111" },
    { label: "Certificate Ceremony", emoji: "🏅", bg: "#6366F111" },
    { label: "Coding Marathon", emoji: "⚡", bg: "#EC489911" },
    { label: "Industry Talk", emoji: "🎤", bg: "#00F5FF11" },
    { label: "Lab Session", emoji: "🖥️", bg: "#7B2FFF11" },
  ];
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: "80px 5vw 60px", textAlign: "center", background: "linear-gradient(180deg,#0A1628,#050A18)" }}>
        <SectionLabel>Gallery</SectionLabel>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#E2E8F0", marginBottom: 12 }}>Life at <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NexaAcademy</span></h1>
      </section>
      <section style={{ padding: "40px 5vw 80px", background: "#050A18" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="courses-grid">
          {items.map((item, i) => (
            <div key={i} style={{ height: i % 3 === 0 ? 220 : 160, background: item.bg, border: "1px solid #1A2A4A", borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.borderColor = "#00F5FF33"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "#1A2A4A"; }}
            >
              <div style={{ fontSize: "3rem" }}>{item.emoji}</div>
              <div style={{ color: "#94A3B8", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.85rem" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <StatsBar />
      <WhyUs />
      <CoursesSection setPage={setPage} />
      <Roadmap />
      <TechStack />
      <Testimonials />
      <FAQ />
      <CTABand setPage={setPage} />
      <Newsletter />
    </>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "Home": return <HomePage setPage={setPage} />;
      case "About": return <AboutPage setPage={setPage} />;
      case "Courses": return <CoursesPage setPage={setPage} />;
      case "Projects": return <ProjectsPage />;
      case "Gallery": return <GalleryPage />;
      case "Testimonials": return <><div style={{ paddingTop: 80 }}><section style={{ padding: "80px 5vw 60px", textAlign: "center", background: "linear-gradient(180deg,#0A1628,#050A18)" }}><SectionLabel>Testimonials</SectionLabel><h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,3rem)", color: "#E2E8F0" }}>What Students <span style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Say</span></h1></section><Testimonials /></div></>;
      case "Blog": return <BlogPage setPage={setPage} />;
      case "Contact": return <ContactPage />;
      case "Admission": return <AdmissionPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050A18", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar activePage={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
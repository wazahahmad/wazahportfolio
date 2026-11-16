"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../lib/projects";
const Lanyard = dynamic(() => import("./lanyard-scene"), {
  ssr: false,
  loading: () => (
    <div className="card-loading">
      <span>WA</span>
      <small>Preparing your interactive card…</small>
    </div>
  ),
});
const socials = [
  ["GitHub", "https://github.com/wazahahmad"],
  ["LinkedIn", "https://www.linkedin.com/in/wazahahmad/"],
];
const experience = [
  [
    "YT",
    "Ylesia Technologies",
    "Web Developer",
    "2021 — Present",
    "France-based web agency. Delivering websites and ongoing client projects.",
  ],
  [
    "FW",
    "Fiverr & Upwork",
    "Freelance Web Developer",
    "2020 — Present",
    "Independent web development across WordPress, PHP, and Laravel.",
  ],
  [
    "TM",
    "Technic Mentors",
    "Laravel Developer",
    "2020 — 2021",
    "Building and supporting Laravel web projects.",
  ],
];
const education = [
  [
    "PU",
    "University of the Punjab",
    "BS Information Technology",
    "2020",
    "CGPA 3.26",
  ],
  [
    "IS",
    "Intermediate",
    "Higher Secondary Education",
    "2016",
    "840/1100 · 76.36%",
  ],
  ["MS", "Matriculation", "Secondary Education", "2014", "840/1100 · 76.36%"],
];
const skills = [
  "WordPress",
  "PHP",
  "Laravel",
  "JavaScript",
  "React",
  "Next.js",
  "Three.js",
  "Shopify",
  "n8n",
  "AI Automation",
  "AI Agents",
  "Voice Agents",
];
function Reveal({ children, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Socials() {
  return (
    <div className="social-links">
      {socials.map(([name, url]) => (
        <a key={name} href={url} target="_blank" rel="noopener noreferrer">
          {name} <span>↗</span>
        </a>
      ))}
    </div>
  );
}
export default function PortfolioClient() {
  const [menu, setMenu] = useState(false),
    [active, setActive] = useState("home"),
    [tab, setTab] = useState("Projects"),
    [portrait, setPortrait] = useState(false),
    [ready, setReady] = useState(false),
    [sound, setSound] = useState(false),
    [role, setRole] = useState("Senior Developer");
  const audio = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 250);
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-25% 0px -50% 0px" },
    );
    document.querySelectorAll("section[id]").forEach((el) => obs.observe(el));
    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, []);
  useEffect(() => {
    if (reduced) return;
    const roles = [
      "Senior Developer",
      "WordPress Developer",
      "Automation Builder",
    ];
    let index = 0;
    const timer = setInterval(() => {
      index = (index + 1) % roles.length;
      setRole(roles[index]);
    }, 3500);
    return () => clearInterval(timer);
  }, [reduced]);
  const play = () => {
    if (!sound) return;
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      const ctx = audio.current || (audio.current = new C());
      ctx.resume();
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.setValueAtTime(620, ctx.currentTime);
      g.gain.setValueAtTime(0.025, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      o.start();
      o.stop(ctx.currentTime + 0.08);
    } catch {}
  };
  return (
    <main className="portfolio-site">
      <div className="space-bg" aria-hidden="true">
        <div className="stars" />
        <div className="nebula" />
      </div>
      <header className="header-wrap">
        <div className="nav-bar">
          <a className="logo" href="#home">
            Wazah<span>Dev.</span>
          </a>
          <nav aria-label="Main navigation" className={menu ? "open" : ""}>
            {["home", "about", "portfolio", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "active" : ""}
                onClick={() => {
                  setMenu(false);
                  play();
                }}
              >
                {id[0].toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
          <div className="nav-tools">
            <button
              className="sound-toggle"
              aria-label={sound ? "Mute sound effects" : "Enable sound effects"}
              aria-pressed={sound}
              onClick={() => setSound(!sound)}
            >
              {sound ? "♫" : "♩"}
            </button>
            <button
              className="menu-button"
              aria-label="Toggle navigation"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>
      <section id="home" className="hero shell">
        <div className="hero-copy">
          <p className="intro-label">
            <span />
            WELCOME TO MY WORLD
          </p>
          <h1>
            <span>Welcome to</span>
            <br />
            My Portfolio<span className="dot">.</span>
          </h1>
          <div className="role-line">
            <span key={role}>{role}</span>
            <i />
          </div>
          <p className="hero-description">
            Hi, I’m Wazah Ahmad. I turn ideas into fast, thoughtful websites and
            practical automations. With 6+ years across agency and freelance
            projects, I bring code, design, and a little curiosity together to
            build experiences that feel right.
          </p>
          <div className="hero-buttons">
            <a className="button primary" href="#portfolio" onClick={play}>
              View Projects <span>↗</span>
            </a>
            <a className="button secondary" href="#contact" onClick={play}>
              Contact Me <span>↗</span>
            </a>
          </div>
          <div className="find-me">
            <small>FIND ME</small>
            <Socials />
          </div>
        </div>
        <div className="hero-card">{ready && <Lanyard />}</div>
        <a className="scroll-indicator" href="#about">
          SCROLL TO EXPLORE <span>↓</span>
        </a>
      </section>
      <section id="about" className="shell section">
        <Reveal>
          <div className="section-title">
            <span className="eyebrow">GET TO KNOW ME</span>
            <h2>About Me</h2>
            <p>The person behind the pixels.</p>
          </div>
        </Reveal>
        <div className="about-layout">
          <Reveal className="about-intro">
            <span className="eyebrow">HELLO THERE 👋</span>
            <h3>
              Hi, I’m
              <br />
              <span>Wazah Ahmad</span>
            </h3>
            <p>
              A senior web developer with a practical mindset and a love for
              building things that work beautifully.
            </p>
            <a className="button secondary" href="#contact">
              Let’s connect ↗
            </a>
          </Reveal>
          <Reveal className="portrait-column">
            <button
              className={`portrait ${portrait ? "suited" : ""}`}
              onClick={() => setPortrait(!portrait)}
              aria-label="Toggle portrait glow"
              aria-pressed={portrait}
            >
              <div className="portrait-orbit" />
              <Image
                className="portrait-normal"
                src="/images/portrait.webp"
                alt="Wazah Ahmad"
                fill
                sizes="(max-width: 760px) 85vw, 380px"
              />
              <Image
                className="portrait-iron"
                src="/images/portrait.webp"
                alt=""
                fill
                sizes="(max-width: 760px) 85vw, 380px"
              />
              <span className="portrait-scan" />
            </button>
            <small>
              HOVER OR TAP TO EXPLORE <span>✧</span>
            </small>
          </Reveal>
          <Reveal className="about-description">
            <span className="eyebrow">CODE. CREATE. REPEAT.</span>
            <p>
              I’m a <strong>Senior Web Developer</strong> based in Gujranwala,
              Pakistan. I build dependable WordPress websites, custom PHP and
              Laravel applications, and digital experiences that put people
              first.
            </p>
            <p>
              Beyond websites, I build n8n workflows, AI agents, and
              voice-calling agents that make everyday work simpler. Clear
              communication and care for the details guide every project.
            </p>
            <a className="text-link" href="#portfolio">
              Explore my work <span>↗</span>
            </a>
          </Reveal>
        </div>
        <div className="timeline-columns">
          {[
            ["Education", education],
            ["Experience", experience],
          ].map(([heading, items]) => (
            <Reveal key={heading}>
              <h3 className="timeline-title">
                <span>{heading === "Education" ? "▧" : "⌘"}</span>
                {heading}
              </h3>
              <div className="timeline">
                {items.map(([mark, name, title, date, description]) => (
                  <article className="timeline-item" key={name}>
                    <div className="timeline-mark">{mark}</div>
                    <div>
                      <span className="timeline-date">{date}</span>
                      <h4>{name}</h4>
                      <p>{title}</p>
                      <small>{description}</small>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="stats">
          <div>
            <strong>
              6<span>+</span>
            </strong>
            <h4>YEARS EXPERIENCE</h4>
            <p>Agency & freelance</p>
          </div>
          <div>
            <strong>3</strong>
            <h4>CORE SPECIALTIES</h4>
            <p>Web · Commerce · Automation</p>
          </div>
          <div>
            <strong>∞</strong>
            <h4>CURIOSITY</h4>
            <p>Always learning, always building</p>
          </div>
        </Reveal>
      </section>
      <section id="portfolio" className="shell section">
        <Reveal>
          <div className="section-title">
            <span className="eyebrow">IDEAS INTO EXPERIENCES</span>
            <h2>Portfolio</h2>
            <p>A glimpse of what I build.</p>
          </div>
          <div
            className="portfolio-tabs"
            role="tablist"
            aria-label="Portfolio categories"
          >
            {["Projects", "Tech Stack"].map((t) => (
              <button
                key={t}
                role="tab"
                id={`tab-${t.replace(" ", "-")}`}
                aria-selected={tab === t}
                aria-controls="portfolio-panel"
                className={tab === t ? "selected" : ""}
                onClick={() => {
                  setTab(t);
                  play();
                }}
              >
                {t === "Projects" ? "▦" : "⌘"} {t}
              </button>
            ))}
          </div>
        </Reveal>
        <div
          id="portfolio-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab.replace(" ", "-")}`}
          tabIndex={0}
        >
          {tab === "Projects" ? (
            <>
              <p className="sample-label">CONCEPT SHOWCASE · SAMPLE PROJECTS</p>
              <div className="project-grid">
                {projects.map((p, i) => (
                  <Reveal key={p.slug}>
                    <article className="project-card">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="project-image"
                        aria-label={`View ${p.title}`}
                      >
                        <Image
                          src={p.image}
                          alt={`${p.title} sample preview`}
                          fill
                          sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 360px"
                        />
                        <span>0{i + 1} / CONCEPT</span>
                      </Link>
                      <div className="project-content">
                        <h3>{p.title}</h3>
                        <p>{p.summary}</p>
                        <div className="tags">
                          {p.tags.slice(0, 2).map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                        <Link
                          className="project-details"
                          href={`/projects/${p.slug}`}
                        >
                          Details <span>↗</span>
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="skills-grid">
              {skills.map((s, i) => (
                <div className="skill" key={s}>
                  <span>{s.slice(0, 2)}</span>
                  <strong>{s}</strong>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section id="contact" className="shell section">
        <Reveal>
          <div className="section-title">
            <span className="eyebrow">LET’S BUILD SOMETHING</span>
            <h2>Contact Me</h2>
            <p>Have an idea? Let’s bring it to life.</p>
          </div>
        </Reveal>
        <div className="contact-grid">
          <Reveal>
            <div className="contact-card">
              <h3>
                Get in touch<span>.</span>
              </h3>
              <p>
                For a project, a collaboration, or a quick hello — I’d love to
                hear from you.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const d = new FormData(e.currentTarget);
                  window.location.href = `mailto:wazahahmad4@gmail.com?subject=${encodeURIComponent("Website enquiry from " + d.get("name"))}&body=${encodeURIComponent(d.get("message") + "\n\nFrom: " + d.get("name") + "\nEmail: " + d.get("email"))}`;
                }}
              >
                <label>
                  Your name
                  <input
                    name="name"
                    placeholder="What should I call you?"
                    autoComplete="name"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    maxLength={200}
                  />
                </label>
                <label>
                  Message
                  <textarea
                    name="message"
                    placeholder="Tell me a little about your idea…"
                    rows={5}
                    required
                    maxLength={5000}
                  />
                </label>
                <button className="button primary" type="submit">
                  Compose email <span>↗</span>
                </button>
                <small className="form-note">
                  Opens your email app with your message ready to send.
                </small>
              </form>
            </div>
          </Reveal>
          <Reveal className="contact-aside">
            <span className="eyebrow">GOOD CONVERSATIONS START HERE</span>
            <h3>
              Something great
              <br />
              starts with <span>hello.</span>
            </h3>
            <a className="email-link" href="mailto:wazahahmad4@gmail.com">
              wazahahmad4@gmail.com ↗
            </a>
            <p>
              Gujranwala, Pakistan
              <br />
              Working with people everywhere.
            </p>
            <div className="contact-socials">
              <small>FIND ME</small>
              <Socials />
            </div>
            <div className="availability">
              <i />
              Open to conversations
            </div>
          </Reveal>
        </div>
      </section>
      <footer className="site-footer shell">
        <div>
          <a className="logo" href="#home">
            Wazah<span>Dev.</span>
          </a>
          <p>
            Thoughtful code. Useful experiences.
            <br />A little bit of wonder.
          </p>
        </div>
        <div>
          <small>NAVIGATION</small>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <small>LET’S CONNECT</small>
          <Socials />
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Wazah Ahmad. All rights reserved.
          </span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}

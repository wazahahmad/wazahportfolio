"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Icon from "./icon";
import MetalBorder from "./metal-border";
import ContactForm from "./contact-form";
import { techStack } from "../lib/tech-stack";
import { projects } from "../lib/projects";
import { testimonials } from "../lib/testimonials";
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
const services = [
  "Web Design & Development",
  "Custom Website Solutions",
  "SEO Optimization",
  "AI Agents & Automation",
  "Mobile Apps",
];
function ServicesMarquee() {
  return (
    <div className="services-band">
      <div
        className="marquee"
        tabIndex={0}
        aria-label="Services. Pause scrolling on hover or focus."
      >
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              className="marquee-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {services.map((service) => (
                <span className="service-item" key={service}>
                  {service}
                  <span aria-hidden="true">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function Counters() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame;
    const el = document.getElementById("career-counters");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduced) {
          setProgress(1);
          return;
        }
        let start;
        const tick = (time) => {
          start ??= time;
          const p = Math.min((time - start) / 1400, 1);
          setProgress(1 - Math.pow(1 - p, 3));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.25 },
    );
    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced]);
  return (
    <div id="career-counters" className="career-counters">
      {[
        [6, "+", "Years of", "Experience"],
        [100, "+", "Projects", "Completed"],
        [200, "+", "Happy", "Clients"],
        [2, "", "Awards", "Received"],
      ].map(([number, suffix, a, b]) => (
        <div
          className="career-counter"
          key={a}
          aria-label={number + suffix + " " + a + " " + b}
        >
          <strong aria-hidden="true">
            {Math.round(number * progress)}
            {suffix}
          </strong>
          <span aria-hidden="true">
            {a}
            <br />
            {b}
          </span>
        </div>
      ))}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 42, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -35px 0px" }}
      transition={{
        duration: 0.75,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
function Socials({ cards = false }) {
  return (
    <div className={`social-links${cards ? " social-cards" : ""}`}>
      {(cards
        ? [...socials, ["Email", "mailto:wazahahmad4@gmail.com"]]
        : socials
      ).map(([name, url]) => (
        <a
          key={name}
          aria-label={name}
          title={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            name={
              name === "GitHub"
                ? "github"
                : name === "Email"
                  ? "mail"
                  : "linkedin"
            }
            size={19}
          />
          <span className="social-name">
            {name}
            {cards && (
              <small>
                {name === "GitHub"
                  ? "@wazahahmad"
                  : name === "Email"
                    ? "wazahahmad4@gmail.com"
                    : "/in/wazahahmad"}
              </small>
            )}
          </span>
          {cards && <Icon name="arrow" size={16} />}
        </a>
      ))}
    </div>
  );
}
export default function PortfolioClient() {
  const [menu, setMenu] = useState(false),
    [active, setActive] = useState("home"),
    [ready, setReady] = useState(false),
    [role, setRole] = useState("Senior Developer");
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = document.querySelector(".portfolio-site");
    if (!root) return;
    let frame = 0;
    const move = (e) => {
      const card = e.target.closest?.(".skill");
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const dx = e.clientX - r.left - r.width / 2,
          dy = e.clientY - r.top - r.height / 2;
        card.style.setProperty(
          "--cursor-angle",
          (((Math.atan2(dy, dx) * 180) / Math.PI + 450) % 360) + "deg",
        );
        card.style.setProperty("--pointer-x", e.clientX - r.left + "px");
        card.style.setProperty("--pointer-y", e.clientY - r.top + "px");
      });
    };
    root.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", move);
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 250);
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(
              ["tech-stack", "testimonials"].includes(e.target.id)
                ? "portfolio"
                : e.target.id,
            );
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
    if (reduced) {
      setRole("Senior Developer");
      return;
    }
    const roles = [
      "Senior Developer",
      "WordPress Developer",
      "Automation Builder",
    ];
    let index = 0,
      count = roles[0].length,
      deleting = false,
      timer;
    const tick = () => {
      const word = roles[index];
      if (!deleting && count === word.length) {
        deleting = true;
        timer = setTimeout(tick, 2200);
        return;
      }
      if (deleting && count === 0) {
        deleting = false;
        index = (index + 1) % roles.length;
        timer = setTimeout(tick, 280);
        return;
      }
      count += deleting ? -1 : 1;
      setRole(roles[index].slice(0, count));
      timer = setTimeout(tick, deleting ? 35 : 75);
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [reduced]);
  return (
    <main className="portfolio-site">
      <div className="space-bg" aria-hidden="true">
        <div className="stars" />
        <div className="star-points">
          {Array.from({ length: 100 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${((i * 73 + 19) % 997) / 10}%`,
                top: `${((i * 137 + 41) % 991) / 10}%`,
                width: i % 13 === 0 ? 3 : 1.3,
                height: i % 13 === 0 ? 3 : 1.3,
                opacity: 0.25 + (i % 7) / 10,
              }}
            />
          ))}
        </div>
        <div className="shooting-star" />
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
                }}
              >
                {id[0].toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
          <div className="nav-tools">
            <button
              className="menu-button"
              aria-label="Toggle navigation"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <Icon name="menu" />
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
            My Portfolio
          </h1>
          <div className="role-line">
            <span>{role}</span>
            <i />
          </div>
          <p className="hero-description">
            Hi, I’m Wazah Ahmad. I turn ideas into fast, thoughtful websites and
            practical automations. With 6+ years across agency and freelance
            projects, I bring code, design, and curiosity together. From
            WordPress and Laravel websites to AI agents and workflows, I build
            experiences that are thoughtful, dependable, and easy to use.
          </p>
          <div className="hero-buttons">
            <a className="button primary" href="#portfolio">
              View Projects <Icon name="arrow" size={19} />
            </a>
            <a className="button secondary" href="#contact">
              Contact Me <Icon name="send" size={19} />
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
      <ServicesMarquee />
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
              <Icon name="send" size={17} />
              Contact Me
            </a>
          </Reveal>
          <Reveal className="portrait-column">
            <div className="portrait portrait-static">
              <Image
                className="portrait-normal"
                src="/images/portrait.webp"
                alt="Wazah Ahmad"
                fill
                sizes="(max-width:760px) 90vw,740px"
              />
            </div>
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
              <Icon name="code" size={17} />
              View Projects <Icon name="arrow" size={17} />
            </a>
          </Reveal>
        </div>
        <Counters />
        <div className="timeline-columns">
          {[
            ["Education", education],
            ["Experience", experience],
          ].map(([heading, items]) => (
            <Reveal key={heading}>
              <h3 className="timeline-title">
                <span>
                  <Icon
                    name={heading === "Education" ? "education" : "briefcase"}
                    size={24}
                  />
                </span>
                {heading}
              </h3>
              <div className="timeline">
                {items.map(([mark, name, title, date, description]) => (
                  <article className="timeline-item" key={name}>
                    <MetalBorder />
                    <div>
                      <h4>{name}</h4>
                      <p>{title}</p>
                      <span className="timeline-date">{date}</span>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="portfolio" className="shell section">
        <Reveal>
          <div className="section-title">
            <span className="eyebrow">IDEAS INTO EXPERIENCES</span>
            <h2>Portfolio</h2>
            <p>A glimpse of what I build.</p>
          </div>
        </Reveal>
        <p className="sample-label">SELECTED WORK · WEBSITES & EXPERIENCES</p>
        <div className="project-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.09}>
              <article className="project-card">
                <MetalBorder />
                <Link
                  href={`/projects/${p.slug}`}
                  className={`project-image${p.slug === "la-citadelle" ? " project-image-mobile" : ""}`}
                  aria-label={`View ${p.title}`}
                >
                  <Image
                    src={p.image}
                    alt={`${p.title} website preview`}
                    fill
                    sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 360px"
                  />
                  <span>
                    0{i + 1} / {p.category}
                  </span>
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
                    Details <Icon name="arrow" size={18} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="tech-stack" className="section tech-section">
        <Reveal>
          <div className="section-title">
            <span className="eyebrow">MY TOOLKIT</span>
            <h2>Tech Stack</h2>
            <p>The tools behind the work.</p>
          </div>
        </Reveal>
        <div
          className="marquee tech-marquee"
          tabIndex={0}
          aria-label="Technology stack. Pause scrolling on hover or focus."
        >
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div
                className="marquee-group"
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {techStack.map((s) => (
                  <div className="skill" key={s.name}>
                    <Image
                      src={s.icon}
                      alt=""
                      width={58}
                      height={58}
                      unoptimized
                    />
                    <h3>{s.name}</h3>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="shell section testimonials" id="testimonials">
        <Reveal>
          <div className="section-title">
            <span className="eyebrow">CLIENT EXPERIENCES</span>
            <h2>Kind Words</h2>
            <p>Feedback from clients on Fiverr.</p>
          </div>
        </Reveal>
        <div className="testimonial-grid">
          {testimonials.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.1}>
              <article className="testimonial-card">
                <MetalBorder />
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <div className="review-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote>{review.quote}</blockquote>
                <div className="testimonial-person">
                  <span aria-hidden="true">
                    {review.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <strong>{review.name}</strong>
                    <small>{review.country} · Fiverr</small>
                  </div>
                </div>
                <a
                  className="review-source"
                  href={review.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read on Fiverr <Icon name="arrow" size={14} />
                </a>
              </article>
            </Reveal>
          ))}
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
              <MetalBorder />
              <div className="contact-form-column">
                <h3>
                  Get in touch<span>.</span>
                </h3>
                <p>
                  For a project, a collaboration, or a quick hello — I’d love to
                  hear from you.
                </p>
                <ContactForm />
              </div>
              <div className="contact-socials">
                <h4>FIND ME</h4>
                <Socials cards />
              </div>
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
          <a href="#home">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>
    </main>
  );
}

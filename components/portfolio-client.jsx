"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import LanyardScene from "./lanyard-scene";
import asianHouse from "../src/assets/asianhouse.png";
import ylesia from "../src/assets/ylesiatech.png";
import procat from "../src/assets/procat.png";
import mandsense from "../src/assets/mandsense.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  { number: "01", name: "Ylesia Technologies", type: "Agency website", tags: "WordPress · Elementor", image: ylesia, url: "https://ylesiatechnologies.com/" },
  { number: "02", name: "Asian House", type: "Restaurant experience", tags: "Web design · Ordering", image: asianHouse, url: "https://asian-house.fr/" },
  { number: "03", name: "Procat Media", type: "Creative portfolio", tags: "WordPress · Motion", image: procat, url: "https://procatmedia.com/" },
  { number: "04", name: "Mandsense", type: "E-commerce storefront", tags: "Shopify · Custom build", image: mandsense, url: "https://mandsense.fr/" },
];

const services = ["Web development", "WordPress", "Frontend craft", "E-commerce"];

function StarField() {
  const reduceMotion = useReducedMotion();
  return <div className={`starfield${reduceMotion ? " starfield-static" : ""}`} aria-hidden="true"><div className="stars stars-back" /><div className="stars stars-front" /><div className="sky-glow sky-glow-left" /><div className="sky-glow sky-glow-right" /></div>;
}

function Navbar() {
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: "-42% 0px -48% 0px" });
    links.forEach(({ href }) => { const section = document.querySelector(href); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="brand-mark" href="#home" aria-label="Wazah Ahmad home"><span>W</span><i>.</i></a>
      <nav className={`nav-pill${menuOpen ? " nav-pill-open" : ""}`} aria-label="Main navigation">
        {links.map(({ label, href }) => <a key={href} className={active === href ? "nav-active" : ""} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <span className="nav-divider" /><a className="nav-contact" href="#contact" aria-label="Get in touch">↗</a>
      </nav>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <a className="availability" href="#contact"><span /> Available for work</a>
    </header>
  );
}

function SectionEyebrow({ number, children }) {
  return <p className="section-eyebrow"><span>{number}</span><i />{children}</p>;
}

export default function PortfolioClient() {
  const reduceMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("wazahahmad4@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:wazahahmad4@gmail.com";
    }
  };

  return (
    <main>
      <StarField />
      <Navbar />
      <section className="hero section-shell" id="home">
        <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.2, 0.75, 0.2, 1] }}>
          <p className="hero-kicker"><span className="kicker-line" /> Independent web developer <span className="kicker-location">· Lahore, Pakistan</span></p>
          <h1><span className="headline-gradient">Wazah</span><br />Ahmad<span className="headline-period">.</span></h1>
          <div className="hero-role"><span className="role-cursor" /> <span>Web developer</span><span className="role-slash">/</span><span>Digital maker</span></div>
          <p className="hero-intro">I turn ambitious ideas into thoughtful digital experiences — blending clean code, considered design, and a little bit of wonder.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <span>↗</span></a><a className="button button-quiet" href="#contact">Let&apos;s talk <span>↗</span></a></div>
          <div className="hero-socials"><span>FIND ME</span><a href="https://github.com/wazahahmad" target="_blank" rel="noreferrer">GitHub ↗</a><i /><a href="mailto:wazahahmad4@gmail.com">Email ↗</a></div>
        </motion.div>
        <motion.div className="hero-art" initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.12, ease: "easeOut" }}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="art-label art-label-top">PERSONAL ID <b>01—WA</b></span>
          <LanyardScene />
          <span className="art-coordinate">31°32&apos; N<br />74°21&apos; E</span><span className="art-caption">A little about me, in 3D.</span>
        </motion.div>
        <a className="scroll-cue" href="#about"><span className="scroll-mouse"><i /></span><span>Scroll to explore</span></a>
      </section>

      <section className="about section-shell" id="about">
        <SectionEyebrow number="01">A bit about me</SectionEyebrow>
        <div className="about-grid"><h2>Curiosity first.<br /><span>Craft in every detail.</span></h2><div className="about-copy"><p>I&apos;m a web developer who enjoys shaping ideas into useful, memorable experiences. I work across the full stack, with a special love for expressive interfaces and the small details that make a product feel effortless.</p><p>From custom WordPress builds to modern React applications, I bring a practical mindset, a sharp eye for design, and the care to get the details right.</p><a className="text-link" href="#contact">A little more about working together <span>↗</span></a></div></div>
        <div className="service-list" aria-label="Areas of focus">{services.map((service, index) => <div key={service}><span>0{index + 1}</span>{service}<i>↗</i></div>)}</div>
      </section>

      <section className="work section-shell" id="work">
        <div className="work-heading"><div><SectionEyebrow number="02">Selected work</SectionEyebrow><h2>Made with<br /><span>intention.</span></h2></div><p>A few projects where design, technology, and a good problem came together. Each one taught me something new.</p></div>
        <div className="project-showcase">
          <div className="project-list" role="tablist" aria-label="Selected projects">
            {projects.map((project, index) => <button className={`project-tab${activeProject === index ? " project-tab-active" : ""}`} role="tab" aria-selected={activeProject === index} key={project.number} onMouseEnter={() => setActiveProject(index)} onFocus={() => setActiveProject(index)} onClick={() => setActiveProject(index)}><span>{project.number}</span><strong>{project.name}</strong><i>↗</i></button>)}
            <p className="project-list-note">Hover or select a project to take a closer look.</p>
          </div>
          <AnimatePresence mode="wait"><motion.a className="project-preview" href={projects[activeProject].url} target="_blank" rel="noreferrer" key={projects[activeProject].number} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.24 }}>
            <div className="preview-image"><Image src={projects[activeProject].image} alt={`${projects[activeProject].name} website preview`} fill sizes="(max-width: 800px) 100vw, 60vw" /></div>
            <div className="preview-meta"><div><span>{projects[activeProject].type}</span><h3>{projects[activeProject].name}</h3></div><span className="preview-tags">{projects[activeProject].tags}</span><span className="preview-arrow">↗</span></div>
          </motion.a></AnimatePresence>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <SectionEyebrow number="03">Have a good one in mind?</SectionEyebrow>
        <div className="contact-panel"><div className="contact-topline"><span>OPEN TO SELECT PROJECTS</span><span><i /> CURRENTLY AVAILABLE</span></div><h2>Let&apos;s make<br /><span>something matter.</span></h2><div className="contact-bottom"><p>Have a project, a question, or just want to say hello? My inbox is open.</p><button className="button button-primary contact-button" onClick={copyEmail}>{copied ? "Email copied ✓" : "Start a conversation ↗"}</button></div></div>
      </section>

      <footer className="site-footer section-shell"><a className="footer-brand" href="#home">Wazah Ahmad<span>.</span></a><span>Building for the web, with care.</span><div><a href="https://github.com/wazahahmad" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:wazahahmad4@gmail.com">Email ↗</a></div><span className="footer-year">© {new Date().getFullYear()} Wazah Ahmad</span><a className="back-top" href="#home" aria-label="Back to top">↑</a></footer>
    </main>
  );
}

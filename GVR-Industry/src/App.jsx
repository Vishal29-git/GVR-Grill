import { useState, useEffect, useRef } from "react";
import "./App.css";



/* ─── NAVBAR ────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "why-us", "gallery", "contact"];
      for (let id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home",    id: "home"    },
    { label: "Why Us",  id: "why-us"  },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <div className="logo" onClick={() => scrollTo("home")}>
            <div className="logo-main">GVR <span>Grill</span> Works</div>
            <div className="logo-sub">Premium Metal Fabrication</div>
          </div>

          <ul className="nav-links">
            {navLinks.map(({ label, id }) => (
              <li key={id}>
                <button
                  className={`nav-link ${activeSection === id ? "active" : ""}`}
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="ham-line" />
            <div className="ham-line" />
            <div className="ham-line" />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ label, id }) => (
          <button
            key={id}
            className="mobile-nav-link"
            onClick={() => scrollTo(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
};

/* ─── HERO SECTION ──────────────────────────────────────────────────── */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <img
          className={`hero-bg-img ${loaded ? "loaded" : ""}`}
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="Metal grill work"
          onLoad={() => setLoaded(true)}
        />
        <div className="hero-overlay" />
        <div className="hero-overlay-2" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <div className="eyebrow-line" />
          <span className="section-label">Est. 2012 · Usilampatti, Madurai</span>
        </div>

        <h1 className="hero-headline">
          <span className="line-1">Forged in</span>
          <span className="line-2">Steel.</span>
          <span className="line-3">Built to Last.</span>
        </h1>

        <p className="hero-tagline">
          Premium metal grills, gates &amp; windows crafted with surgical
          precision. Where industrial strength meets architectural elegance.
        </p>

        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() =>
              document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>View Our Work</span>
          </button>
          <button
            className="btn-secondary"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact Us
            <span className="arrow-icon" />
          </button>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-number">1000<span>+</span></div>
          <div className="stat-label">Projects Done</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">40<span>+</span></div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">100<span>%</span></div>
          <div className="stat-label">Satisfaction</div>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
};

/* ─── WHY US SECTION ────────────────────────────────────────────────── */
const WhyUs = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const reasons = [
    {
      number: "01",
      title: "Premium Grade Materials",
      body: "We source only the highest-grade steel, iron, and alloys — ensuring your installations withstand decades of weather, wear, and time without compromise.",
      icon: "⬡",
    },
    {
      number: "02",
      title: "Bespoke Custom Designs",
      body: "No two projects are alike. Our craftsmen translate your architectural vision into intricate metalwork — from classical patterns to ultra-modern geometrics.",
      icon: "◈",
    },
    {
      number: "03",
      title: "Master Craftsmanship",
      body: "With 15+ years in the trade, our fabricators bring old-world skill to modern tooling — every weld, every joint, every finish is done with obsessive attention to detail.",
      icon: "◉",
    },
    {
      number: "04",
      title: "Transparent Pricing",
      body: "Luxury quality shouldn't be a luxury cost. We offer competitive, itemized quotes with zero hidden charges — honest pricing from the first conversation to final handover.",
      icon: "◎",
    },
    {
      number: "05",
      title: "End-to-End Service",
      body: "Design consultation, fabrication, surface treatment, and professional installation — we handle every stage in-house, ensuring consistency and accountability.",
      icon: "⬢",
    },
    {
      number: "06",
      title: "On-Time Delivery",
      body: "We respect your timelines. Our production workflow is optimized to deliver and install on schedule — keeping your construction project moving forward.",
      icon: "◇",
    },
  ];

  return (
    <section id="why-us" className="why-us" ref={sectionRef}>
      <div className="why-bg-text">GVR</div>
      <div className="why-inner">
        <div className="why-header">
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>
              Why Choose Us
            </div>
            <h2 className={`why-title ${visible ? "animate-fadeUp" : ""}`}>
              Strength You Can <em>See.</em>
              <br />
              Trust You Can <em>Feel.</em>
            </h2>
          </div>
          <p
            className={`why-body-text ${visible ? "animate-fadeUp" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            GVR Grill Works isn't just a fabricator — we're craftsmen who
            understand that security and beauty are not mutually exclusive.
            Every piece we make carries our name, our reputation, and our pride.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <div
              key={r.number}
              className={`why-card ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="card-number">{r.number}</div>
              <span className="card-icon">{r.icon}</span>
              <h3 className="card-title">{r.title}</h3>
              <p className="card-body">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



// Gate images
import gate from "./assets/gallery/gate/gate.jpg";
import gate1 from "./assets/gallery/gate/gate1.jpg";
import gate2 from "./assets/gallery/gate/gate2.jpg";
import gate3 from "./assets/gallery//gate/gate3.jpg";
import gate4 from "./assets/gallery/gate/gate4.jpg";
import gate5 from "./assets/gallery/gate/gate5.jpg";
import gate6 from "./assets/gallery/gate/gate6.jpg";
import gate7 from "./assets/gallery/gate/gate7.jpg";
import gate8 from "./assets/gallery/gate/gate8.jpg";
import gate9 from "./assets/gallery/gate/gate9.jpg";
import gate10 from "./assets/gallery/gate/gate10.jpg";
import gate11 from "./assets/gallery/gate/gate11.jpg";
import gate12 from "./assets/gallery/gate/gate12.jpg";
import gate13 from "./assets/gallery/gate/gate13.jpg";
import gate14 from "./assets/gallery/gate/gate14.jpg";
import gate15 from "./assets/gallery/gate/gate15.jpg";
import gate16 from "./assets/gallery/gate/gate16.jpeg";
import gate17 from "./assets/gallery/gate/gate17.jpg";
import gate18 from "./assets/gallery/gate/gate18.jpg";


// Window images
import window1 from "./assets/gallery/window/window1.jpg";
import window2 from "./assets/gallery/window/window2.jpg";
import window3 from "./assets/gallery/window/window3.jpg";
import window4 from "./assets/gallery/window/window4.jpg";
import window5 from "./assets/gallery/window/window5.jpg";
import window6 from "./assets/gallery/window/window6.jpg";
import window7 from "./assets/gallery/window/window7.jpg";


// Ladder images
import ladder1 from "./assets/gallery/ladder/ladder1.jpg";
import ladder2 from "./assets/gallery/ladder/ladder2.jpg";
import ladder3 from "./assets/gallery/ladder/ladder3.jpg";

// MS Steel images
import ms1 from "./assets/gallery/ms-steel/ms1.jpg";
import ms2 from "./assets/gallery/ms-steel/ms2.jpg";
import ms3 from "./assets/gallery/ms-steel/ms3.jpg";
import ms4 from "./assets/gallery/ms-steel/ms4.jpg";
import ms5 from "./assets/gallery/ms-steel/ms5.jpg";
import ms6 from "./assets/gallery/ms-steel/ms6.jpg";
import ms7 from "./assets/gallery/ms-steel/ms7.jpg";
import ms8 from "./assets/gallery/ms-steel/ms8.jpg";
import ms9 from "./assets/gallery/ms-steel/ms9.jpg";
import ms10 from "./assets/gallery/ms-steel/ms10.jpg";
import ms11 from "./assets/gallery/ms-steel/ms11.jpg";


// Balcony images
import balcony1 from "./assets/gallery/balcony/balcony1.jpg";
import balcony2 from "./assets/gallery/balcony/balcony2.jpg";
import balcony3 from "./assets/gallery/balcony/balcony3.jpg";

//Safety Door

import safety_door1 from "./assets/gallery/safety-door/safety_door1.jpg";
import safety_door2 from "./assets/gallery/safety-door/safety_door2.jpg";
import safety_door3 from "./assets/gallery/safety-door/safety_door3.jpg";
import safety_door4 from "./assets/gallery/safety-door/safety_door4.jpg";
import safety_door5 from "./assets/gallery/safety-door/safety_door5.jpg";
import safety_door6 from "./assets/gallery/safety-door/safety_door6.jpg";


/* ─── GALLERY SECTION ───────────────────────────────────────────────── */
const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter]     = useState("All");
  const sectionRef               = useRef(null);
  const [visible, setVisible]   = useState(false);

  /* scroll-into-view animation trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* close lightbox on Escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

 
 const items = [
  // Gate
  { id:1, src:gate, label:"Main Entry Gate", cat:"Gate" },
  { id:2, src:gate1, label:"Main Entry Gate", cat:"Gate" },
  { id:3, src:gate2, label:"Compound Gate", cat:"Gate" },
  { id:4, src:gate3, label:"Main Entry Gate ", cat:"Gate" },
  { id:5, src:gate4, label:"MS Iron Gate", cat:"Gate" },
  { id:6, src:gate5, label:"Main Entry Gate", cat:"Gate" },
  { id:7, src:gate6, label:"Compound Gate", cat:"Gate" },
  { id:8, src:gate7, label:"Main Entry Gate", cat:"Gate" },
  { id:9, src:gate8, label:"MS Iron Gate", cat:"Gate" },
  { id:10, src:gate9, label:"Main Entry Gate", cat:"Gate" },
  { id:11, src:gate10, label:"Compound Gate", cat:"Gate" },
  { id:12, src:gate11, label:"Sliding Gate", cat:"Gate" },
  { id:13, src:gate12, label:"Iron Gate", cat:"Gate" },
  { id:14, src:gate13, label:"Main Entry Gate", cat:"Gate" },
  { id:15, src:gate14, label:"Main Entry Gate", cat:"Gate" },
  { id:16, src:gate15, label:"Sliding Gate", cat:"Gate" },
  { id:17, src:gate16, label:"MS Iron Gate", cat:"Gate" },
  { id:18, src:gate17, label:"Main Entry Gate", cat:"Gate" },
  { id:19, src:gate18, label:"Compound Gate", cat:"Gate" },


  // Windows
  { id:20, src:window1, label:"Window Grill Design", cat:"Windows" },
  { id:21, src:window2, label:"Safety Window Grill", cat:"Windows" },
  { id:22, src:window3, label:"Decorative Window", cat:"Windows" },
  { id:23, src:window4, label:"Window Grill Design", cat:"Windows" },
  { id:24, src:window5, label:"Safety Window Grill", cat:"Windows" },
  { id:25, src:window6, label:"Decorative Window", cat:"Windows" },
  { id:26, src:window7, label:"Decorative Window", cat:"Windows" },

  // Ladder
  { id:27, src:ladder1, label:"Iron Ladder", cat:"Ladder" },
  { id:28, src:ladder2, label:" Steel Ladder", cat:"Ladder" },
  { id:29, src:ladder3, label:"Spiral Stair Ladder", cat:"Ladder" },

  // MS Steel
  { id:30, src:ms1, label:"MS Steel Railing", cat:"MS Steel" },
  { id:31, src:ms2, label:"MS Steel Frame", cat:"MS Steel" },
  { id:32, src:ms3, label:"MS Steel Structure", cat:"MS Steel" },
  { id:33, src:ms4, label:"MS Steel Railing", cat:"MS Steel" },
  { id:34, src:ms5, label:"MS Steel Frame", cat:"MS Steel" },
  { id:35, src:ms6, label:"MS Steel Structure", cat:"MS Steel" },
  { id:36, src:ms7, label:"MS Steel Railing", cat:"MS Steel" },
  { id:37, src:ms8, label:"MS Steel Frame", cat:"MS Steel" },
  { id:38, src:ms9, label:"MS Steel Structure", cat:"MS Steel" },
  { id:39, src:ms10, label:"MS Steel Railing", cat:"MS Steel" },
  { id:40, src:ms11, label:"MS Steel Frame", cat:"MS Steel" },
  

  // Balcony
  { id:41, src:balcony1, label:"Balcony Railing", cat:"Balcony" },
  { id:42, src:balcony2, label:" Balcony Grill", cat:"Balcony" },
  { id:43, src:balcony3, label:"Modern Balcony Design", cat:"Balcony" },

  //safety_door
 
  { id: 44, src: safety_door1, label: "Safety Door Design", cat: "Safety Door" },
  { id: 45, src: safety_door2, label: "Iron Safety Door", cat: "Safety Door" },
  { id: 46, src: safety_door3, label: "Safety Door Design", cat: "Safety Door" },
  { id: 47, src: safety_door4, label: "Iron Safety Door", cat: "Safety Door" },
  { id: 48, src: safety_door5, label: "Safety Door Design", cat: "Safety Door" },
  { id: 49, src: safety_door6, label: "Iron Safety Door", cat: "Safety Door" },
];

  const categories = ["All", "Gate", "Windows", "Ladder", "MS Steel", "Balcony","Safety Door"];

  const filtered = filter === "All"
    ? items
    : items.filter((item) => item.cat === filter);

  return (
    <>
      <section id="gallery" className="gallery" ref={sectionRef}>
        <div className="gallery-inner">

          {/* Section header */}
          <div className="gallery-header">
            <div className="gallery-title-wrap">
              <div className="section-label" style={{ marginBottom: 16 }}>
                Our Work
              </div>
              <h2 className={`gallery-title ${visible ? "animate-fadeUp" : ""}`}>
                The Craft Speaks<br />For Itself
              </h2>
            </div>

            {/* Filter pills */}
            <div className="filter-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${filter === cat ? "active" : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry gallery grid — CSS columns handle layout automatically */}
          <div className="gallery-grid">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className={`gallery-item ${visible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="gallery-img"
                  loading="lazy"
                />
                {/* hover overlay */}
                <div className="gallery-overlay">
                  <div className="gallery-cat">{item.cat}</div>
                  <div className="gallery-label">{item.label}</div>
                </div>
                {/* expand icon */}
                <div className="gallery-expand">+</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <img
            src={lightbox.src}
            alt={lightbox.label}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox-info">
            <div className="gallery-cat">{lightbox.cat}</div>
            <div className="lightbox-label">{lightbox.label}</div>
          </div>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            ✕
          </button>
        </div>
      )}
    </>
  );
};

/* ─── CONTACT SECTION ───────────────────────────────────────────────── */
const Contact = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const cards = [
    {
      icon: "📍",
      label: "Address",
      value: "Madurai Main Road ,Kongapatti,\n Usilampatti, Madurai  – 625 532\nTamil Nadu, India",
    },
    {
      icon: "📞",
      label: "Phone",
      value: "+91 9688071559\n Whatsapp Number",
    },
    {
      icon: "✉",
      label: "Email",
      value: "gvrgrillworks01.com\n vishalraghav0304@gmail.com",
    },
    {
      icon: "👤",
      label: "Proprietor",
      value: "G. Vadivel\nFounder & Owner\nGVR Grill Works",
    },
  ];

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact-inner">
        <div className={`contact-header ${visible ? "animate-fadeUp" : ""}`}>
          <div className="section-label">Contact Us</div>
          <h2 className="contact-title">
            Find Us &amp; <em>Reach Out</em>
          </h2>
          <p className="contact-desc">
            Visit our workshop, call us, or drop an email. We're always ready
            to discuss your project and provide expert guidance on the right
            metalwork solution for your space.
          </p>
        </div>

        <div className="contact-cards">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`contact-card ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="card-icon-lg">{card.icon}</span>
              <div className="c-label">{card.label}</div>
              <div className="c-value" style={{ whiteSpace: "pre-line" }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <div className="map-wrap">
          <div className="map-label">Our Location · Usilampatti, Madurai</div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.6752592259163!2d77.80742459999999!3d9.9609532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07370049cdcb3b%3A0xcdaa4234916a4825!2sGVR%20GRILL%20WORKS!5e0!3m2!1sen!2sin!4v1773308915883!5m2!1sen!2sin" 
            allowFullScreen=""
            loading="lazy"
            title="GVR Grill Works Location"
          />
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-top">
        <div>
          <div className="footer-logo-main">
            GVR <span>Grill</span> Works
          </div>
          <div className="footer-logo-sub">
            Premium Metal Fabrication 
          </div>
        </div>
        <div className="footer-links">
          {["home", "why-us", "gallery", "contact"].map((id) => (
            <button
              key={id}
              className="footer-link"
              onClick={() =>
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {id.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">
          © 2024 GVR Grill Works. All rights reserved. Crafted with{" "}
          <span>♦</span> precision.
        </div>
        <div className="footer-tagline">"Where Steel Meets Artistry"</div>
      </div>
    </div>
  </footer>
);

/* ─── APP ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
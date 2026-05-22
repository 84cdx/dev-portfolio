"use client";

import { Mail, Download, ExternalLink, Code2, MonitorPlay, Component, Shield, Paintbrush, Phone, Globe, ChevronLeft, ChevronRight, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function BackgroundPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const dots: { x: number, y: number, baseX: number, baseY: number }[] = [];
    const spacing = 35;

    const initDots = () => {
      dots.length = 0;
      for (let x = -spacing; x < width + spacing * 2; x += spacing) {
        for (let y = -spacing; y < height + spacing * 2; y += spacing) {
          const offsetX = Math.sin(y * 0.01) * 20;
          const offsetY = Math.cos(x * 0.01) * 20;
          const finalX = x + offsetX;
          const finalY = y + offsetY;
          dots.push({ x: finalX, y: finalY, baseX: finalX, baseY: finalY });
        }
      }
    };

    initDots();

    let mouse = { x: -1000, y: -1000 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    };
    window.addEventListener("resize", onResize);

    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dotColor = isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";
    const dotColorActive = isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const time = Date.now() * 0.001;

      dots.forEach(dot => {
        let dx = mouse.x - dot.baseX;
        let dy = mouse.y - dot.baseY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 200;
        let force = 0;
        if (distance < maxDistance) {
          // smooth falloff
          force = Math.pow((maxDistance - distance) / maxDistance, 2);
        }

        // soft push away
        const targetX = dot.baseX - dx * force * 0.015;
        const targetY = dot.baseY - dy * force * 0.015;

        dot.x += (targetX - dot.x) * 0.05;
        dot.y += (targetY - dot.y) * 0.05;

        // gentle ambient wave motion
        const ambientX = Math.sin(dot.baseY * 0.01 + time * 0.5) * 5;
        const ambientY = Math.cos(dot.baseX * 0.01 + time * 0.5) * 5;

        ctx.beginPath();
        ctx.arc(dot.x + ambientX, dot.y + ambientY, 1.2 + force * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = force > 0 ? dotColorActive : dotColor;

        const waveOpacity = Math.sin(dot.baseX * 0.005 + time) * Math.cos(dot.baseY * 0.005 + time);

        ctx.globalAlpha = 0.2 + waveOpacity * 0.15 + force * 0.2;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }} />;
}

const creativeWorks = [
  { title: "Vector Logos", image: "/images/creative work/vector_logos.png" },
  { title: "Announcement 1", image: "/images/creative work/announcement_1.png" },
  { title: "Collage Artwork", image: "/images/creative work/collage_artwork.png" },
  { title: "Banner Design", image: "/images/creative work/banner_design.png" },
  { title: "Tour Poster", image: "/images/creative work/tourposter.png" },
  { title: "Announcement 2", image: "/images/creative work/announcement_2.png" }
];

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === creativeWorks.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? creativeWorks.length - 1 : prev - 1));
  };

  return (
    <>
      <BackgroundPattern />
      <main className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <section className="hero" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', flexWrap: 'wrap-reverse' }}>

          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', fontWeight: 800, letterSpacing: '-0.05em' }}>
              Christian Dietrich
            </h1>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 400 }}>
              Working Student / Web Developer based in Munich
            </h2>

            <p style={{ maxWidth: '600px', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Media Informatics (B.Sc.) student at LMU Munich & Working Student Software Engineer at Sixt SE. Focused on modern web architectures, LLM integration, and performant UI components.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://github.com/84cdx" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FaGithub size={18} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/chrisd03" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: 'var(--text-color)' }}>
                <FaLinkedin size={18} /> LinkedIn
              </a>
              <a href="mailto:christian-dietrich03@web.de" className="btn" style={{ color: 'var(--text-color)' }}>
                <Mail size={18} /> E-Mail
              </a>
              <button className="btn" style={{ color: 'var(--text-color)' }}>
                <Download size={18} /> Download CV
              </button>
            </div>
          </div>

          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
            <div className="profile-image-container">
              <Image src="/bewerbungsfoto.png" alt="Christian Dietrich" fill style={{ objectFit: 'cover' }} priority />
            </div>
          </div>

        </section>

        {/* About Section */}
        <section id="about">
          <h3 className="section-title">About</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', lineHeight: 1.8 }}>
            I am a Media Informatics (B.Sc.) graduate and a Working Student Software Engineer at Sixt SE. My primary focus is modern web development, especially with React and Next.js. I enjoy building performant front‑ends, designing robust APIs, and integrating AI/LLM features into user‑friendly products.
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h3 className="section-title">Projects</h3>
          <div className="grid grid-cols-2">

            <div className="card">
              <div style={{
                width: '100%',
                height: '200px',
                background: 'var(--bg-color)',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <Image src="/images/paddy-chat-ui.png" alt="Paddy Chat UI" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
              </div>
              <h4 className="card-title">Cybersecurity Assistant „Paddy“</h4>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', display: 'block', marginBottom: '1rem' }}>December 2025 (Bachelor Project)</span>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <p><strong>Fullstack- & LLM-Integration:</strong> Concept and design of a modular Node.js backend architecture to integrate a locally hosted LLM, coupled with a Chrome extension serving as an interactive frontend.</p>
                <p><strong>Backend Optimization:</strong> Implementation of memory-efficient RAM caching, isolated session management, and data streaming via the ReadableStream API under strict CPU constraints.</p>
              </div>
              <div className="tag-container" style={{ marginBottom: '1.5rem' }}>
                <span className="tag">Node.js</span>
                <span className="tag">TypeScript</span>
                <span className="tag">Chrome Ext</span>
                <span className="tag">LLMs</span>
              </div>
              <a href="https://github.com/84cdx/llm-cybersecurity-assistant" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: 'var(--text-color)' }}>
                <FaGithub size={16} /> View Repository
              </a>
            </div>

            <div className="card">
              <div style={{
                width: '100%',
                height: '200px',
                background: 'var(--bg-color)',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <Image src="/images/dreadbase_dashboard.png" alt="Dreadbase Dashboard" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
              </div>
              <h4 className="card-title">Dreadbase - Horror Media Platform</h4>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', display: 'block', marginBottom: '1rem' }}>April 2026</span>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <p><strong>Full-Stack Architecture:</strong> High-performance Next.js 15 SSR web application (App Router, Async Params) featuring progressive streaming via Suspense and Supabase OAuth.</p>
                <p><strong>API Interfaces & Deployment:</strong> Server-side isolated REST APIs (TMDB/IGDB via Twitch OAuth) and Vercel deployment, including hydration and cross-origin fixes.</p>
              </div>
              <div className="tag-container" style={{ marginBottom: '1.5rem' }}>
                <span className="tag">Next.js 15</span>
                <span className="tag">Supabase</span>
                <span className="tag">Tailwind CSS</span>
              </div>
              <a href="https://github.com/84cdx/dreadbase" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: 'var(--text-color)' }}>
                <FaGithub size={16} /> View Repository
              </a>
            </div>

          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <h3 className="section-title">Experience</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div className="card" style={{ background: 'transparent', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h4 className="card-title" style={{ margin: 0 }}>Working Student Software Engineer</h4>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>Nov. 2024 - heute</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Sixt SE, München</p>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><strong>Frontend & APIs:</strong> Development of modular UI components (React.js, TypeScript) and implementation of performant REST API endpoints for login and loyalty processes.</li>
                <li><strong>Architecture & UX:</strong> Further development of performant React components within a micro-frontend architecture.</li>
                <li><strong>Workflow:</strong> Agile development (Jira) and automated lifecycle management and deployment via GitHub CI/CD.</li>
              </ul>
            </div>

            <div className="card" style={{ background: 'transparent', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h4 className="card-title" style={{ margin: 0 }}>Digitalization Officer (Federal Volunteer Service)</h4>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>Okt. 2021 - Sept. 2022</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Beth Shalom, München</p>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><strong>Web & App:</strong> Maintenance and continuous visual and functional development of the website and community app.</li>
                <li><strong>Leadership & Support:</strong> Independent management of technical operations after the manager’s departure, plus onboarding and hardware support.</li>
              </ul>
            </div>

            <div className="card" style={{ background: 'transparent', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h4 className="card-title" style={{ margin: 0 }}>Digital Creative (Freelance)</h4>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>Jan. 2023 - Sept. 2023</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>CGL eSports, Dallas, Texas</p>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><strong>UI/UX & Branding:</strong> Design and development of interactive stream overlays for esports events.</li>
                <li><strong>Content Creation:</strong> Creation of high-quality graphics for social media and event broadcasts.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Education Section (Moved below Experience) */}
        <section id="education">
          <h3 className="section-title">Education</h3>
          <div className="card" style={{ background: 'transparent', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              <h4 className="card-title" style={{ margin: 0 }}>Bachelor of Science, Media Informatics (Grade 1.74)</h4>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>2022 - 2026</span>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}><p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Ludwig Maximilian University of Munich</p></p>
            <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><strong>Bachelor thesis (1.56):</strong> “LLM-based Cybersecurity Assistant” – integration of locally hosted language models into fullstack systems</li>
              <li><strong>Selected Modules:</strong> Software Development Internship (1.3), Computational Intelligence (1.0), Cloud Computing (1.3), Software Engineering (1.3), Computer Networks (1.7), Database Systems, IT Security (1.7)</li>
            </ul>
          </div>
        </section>

        {/* Qualifications Section */}
        <section id="skills">
          <h3 className="section-title">Skills</h3>
          <div className="grid grid-cols-2" style={{ gap: '2.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Code2 size={20} />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Programming Languages</h4>
              </div>
              <div className="tag-container">
                <span className="tag">TypeScript</span>
                <span className="tag">JavaScript</span>
                <span className="tag">Python</span>
                <span className="tag">Java</span>
                <span className="tag">HTML/CSS</span>
                <span className="tag">Dart</span>
                <span className="tag">SQL</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Component size={20} />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Software / Frameworks</h4>
              </div>
              <div className="tag-container">
                <span className="tag">React</span>
                <span className="tag">Next.js</span>
                <span className="tag">Claude</span>
                <span className="tag">Cursor</span>
                <span className="tag">Jira</span>
                <span className="tag">Figma</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Globe size={20} />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Languages</h4>
              </div>
              <div className="tag-container">
                <span className="tag">German (Native)</span>
                <span className="tag">English (Native)</span>
                <span className="tag">Turkish (Basic)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Creative Work Section */}
        <section id="creative">
          <h3 className="section-title">Creative Work</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            A selection of visual design, eSports branding, and UI/UX projects – examples from my freelance and hobby work, including announcement graphics, posters, advertising banners, brand logos, and collage artworks.
          </p>
          <div className="image-grid">
            {creativeWorks.map((item, i) => (
              <div key={i} className="image-item" onClick={() => openLightbox(i)}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="image-caption">{item.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        <div className={`lightbox ${lightboxOpen ? 'open' : ''}`} onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}><X size={32} /></button>
          <button className="lightbox-nav prev" onClick={prevImage}><ChevronLeft size={32} /></button>
          <button className="lightbox-nav next" onClick={nextImage}><ChevronRight size={32} /></button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {lightboxOpen && (
              <Image
                src={creativeWorks[currentImageIndex].image}
                alt={creativeWorks[currentImageIndex].title}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            )}
          </div>
        </div>

        {/* Contact Section */}
        <section id="contact" style={{ textAlign: 'center', padding: '6rem 0', borderTop: '1px solid var(--border-color)', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Let&apos;s build something great.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Always open to exciting projects, new opportunities, and collaboration.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:christian-dietrich03@web.de" className="btn btn-primary">
              <Mail size={18} /> E-Mail
            </a>
            <a href="https://github.com/84cdx" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: 'var(--text-color)' }}>
              <FaGithub size={18} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/chrisd03" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: 'var(--text-color)' }}>
              <FaLinkedin size={18} /> LinkedIn
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

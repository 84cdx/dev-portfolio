"use client";

import { Mail, Download, Code2, MonitorPlay, Component, Globe, X, Info, Cpu, Layers, ChevronDown, ChevronUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


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

    const mouse = { x: -1000, y: -1000 };
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
    const dotColor = isDarkMode ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)";
    const dotColorActive = isDarkMode ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)";

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const time = Date.now() * 0.001;

      dots.forEach(dot => {
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

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

const PROJECTS = [
  {
    id: "paddy",
    title: "Paddy — Local LLM Cybersecurity Assistant",
    subtitle: "Bachelor Thesis (LMU Munich, 2025)",
    image: "/images/paddy-chat-ui.png",
    github: "https://github.com/84cdx/llm-cybersecurity-assistant",
    tags: ["Node.js", "TypeScript", "Chrome Extension", "Local LLMs"],
    details: {
      title: "AI Cybersecurity Assistant (\"Paddy\") – Fullstack LLM-Integration",
      meta: [
        { label: "Period", value: "June - December 2025" },
        { label: "Role", value: "Fullstack / Backend & AI Engineer" },
        { label: "Tech-Stack", value: "Node.js, JavaScript, TypeScript, GPT4All, LLMs (TinyLlama-1.1B), MongoDB, Nginx, PM2, Google Cloud (OAuth2, APIs), Chrome Extension API" }
      ],
      overview: "Development of a resource-optimized cybersecurity assistant for a Bachelor's thesis at LMU Munich. The system integrates local AI inference, secure API workflows, and a Google Chrome extension for in-situ security analysis of URLs and passwords.",
      sections: [
        {
          title: "Technical Core & Architecture",
          items: [
            "Backend & LLM Engineering: Developed a resource-optimized Node.js backend tailored for a shared Linux server with strict limitations (< 5 GB RAM, CPU-only inference, and no root permissions).",
            "Local AI Integration: Embedded a quantized open-source LLM (TinyLlama Q4.0) using GPT4All Node.js bindings, implementing a ModelManager for efficient caching and latency reduction during server startup.",
            "Streaming & Frontend Bridge: Implemented incremental token streaming from backend to the Chrome Extension via the ReadableStream API for real-time risk evaluation.",
            "User Evaluation: Successfully validated the system through a week-long field study with 10 active users, employing IT security and UX evaluation frameworks (SUS, SeBIS, SA-6) to demonstrate high user trust."
          ]
        },
        {
          title: "Engineering Challenges Solved",
          items: [
            "Multi-User Concurrency under Single-Instance Constraints: Engineered a stateful ChatSessionManager and a server-side ChatQueue to handle isolated parallel user sessions. This resolved concurrency conflicts by queuing requests sequentially, preventing data leakage and system crashes on a single active LLM instance.",
            "Low-Latency Performance under Strict Resource Constraints: Achieved fast response times on a CPU-only server restricted to under 5 GB of RAM by benchmarking multiple open-source models, selecting a highly optimized model (TinyLlama Q4.0), and implementing aggressive caching rules.",
            "Strict Data Privacy & LMU Compliance: Adhered to highly restrictive LMU data protection guidelines by refactoring security checks (such as password strength and URL threat detection) to execute locally inside the Chrome Extension client instead of sending raw, sensitive user inputs to the backend.",
            "LLM Quality Limitation Fallback: Overcame the structural limitation of the lightweight LLM (which struggled to generate high-entropy passwords) by implementing a local cryptography fallback system using password generator APIs, ensuring secure password generation with sub-0.5s latency."
          ]
        }
      ]
    }
  },
  {
    id: "dreadbase",
    title: "Dreadbase — Horror Media Platform",
    subtitle: "Full-Stack Project (2026)",
    image: "/images/dreadbase_dashboard.png",
    github: "https://github.com/84cdx/dreadbase",
    website: "https://dreadbase.vercel.app/",
    tags: ["Next.js 15", "TypeScript", "Supabase", "Tailwind CSS"],
    details: {
      title: "DREADBASE – High-Performance Media Platform",
      meta: [
        { label: "Period", value: "March - April 2026" },
        { label: "Rolle", value: "Full-Stack Engineer" },
        { label: "Tech-Stack", value: "Next.js, TypeScript, Supabase, Tailwind CSS, REST & POST APIs, Vercel" }
      ],
      overview: "DREADBASE is a high-performance media platform built with a dark, minimalist \"hacker-terminal\" aesthetic. The system aggregates real-time data for movies and video games, seamlessly combining them with an interactive news and dossier system.",
      sections: [
        {
          title: "Technical Core & Architecture",
          items: [
            "Built with Next.js 15+, TypeScript, and Supabase, fully leveraging the App Router and asynchronous route validation (params Promises).",
            "Optimized initial page loads and reduced Time to Interactive (TTI) using React Suspense and custom Skeleton components for incremental data streaming.",
            "Secured server-side data fetching by isolating TMDB and IGDB API integrations (via Twitch OAuth) from the client side.",
            "Handled user sessions and authentication using Supabase (@supabase/ssr) tailored for Next.js Server Components.",
            "Implemented Next.js caching strategies (revalidate) to minimize API overhead, bypass rate limits, and ensure instant page transitions.",
            "Engineered a reactive, debounced live search."
          ]
        },
        {
          title: "Engineering Challenges Solved",
          items: [
            "Resolved cross-origin routing issues within the OAuth flow by dynamically generating redirect origins based on the Vercel deployment environment.",
            "Eliminated server-side rendering (SSR) hydration mismatches caused by client-side browser extensions using targeted hydration suppression.",
            "Passed production accessibility audits (a11y) by refactoring the DOM with semantic HTML5 landmarks (<main>, <html lang>) and fixing interactive focus traps on elements hidden from screen readers."
          ]
        }
      ]
    }
  }
];

export default function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [expandedExperiences, setExpandedExperiences] = useState<Record<string, boolean>>({});

  const toggleExperience = (id: string) => {
    setExpandedExperiences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    if (selectedProjectId) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [selectedProjectId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProjectId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId);

  return (
    <>
      <BackgroundPattern />
      <main className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <section className="hero" style={{ minHeight: '85vh', minWidth: '50vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', flexWrap: 'wrap-reverse' }}>

          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', fontWeight: 800, letterSpacing: '-0.05em' }}>
              Christian Dietrich
            </h1>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 400 }}>
              Software Engineer · Working Student @ Sixt SE · Munich
            </h2>

            <p style={{ maxWidth: '600px', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
              B.Sc. Media Informatics (LMU Munich). Working Student Software Engineer at Sixt SE, building frontend and fullstack features with React and TypeScript for a platform with millions of users.
            </p>

            <div className="hero-buttons">
              <a href="https://github.com/84cdx" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FaGithub size={18} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/christian-dietrich-dev" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: 'var(--text-color)' }}>
                <FaLinkedin size={18} /> LinkedIn
              </a>
              <a href="mailto:christian.dietrich.dev@gmail.com" className="btn" style={{ color: 'var(--text-color)' }}>
                <Mail size={18} /> E-Mail
              </a>
              <a href="/cv-dietrich.pdf" download="cv-dietrich.pdf" className="btn" style={{ color: 'var(--text-color)' }}>
                <Download size={18} /> Download CV
              </a>
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
            I studied Media Informatics at LMU Munich, with a focus on modern web development, software engineering, and digital product development. Since late 2024 I&apos;ve been working as a software engineering working student at Sixt SE, building production frontend and fullstack features with React and TypeScript for an international platform with millions of users. For my bachelor&apos;s thesis I developed an LLM-based cybersecurity assistant — local AI inference, OAuth API integrations, and a Chrome Extension for real-time security risk detection. My earlier background in creative work informs how I approach UI and product quality.
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h3 className="section-title">Projects</h3>
          <div className="grid grid-cols-2">
            {PROJECTS.map((project) => (
              <div className="card" key={project.id}>
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
                  <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                </div>
                <h4 className="card-title">{project.title}</h4>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', display: 'block', marginBottom: '1rem' }}>
                  {project.subtitle}
                </span>

                <div className="tag-container" style={{ marginBottom: '1.5rem' }}>
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', marginTop: 'auto' }}>
                  <button
                    onClick={() => setSelectedProjectId(project.id)}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    <Info size={16} /> View Details
                  </button>
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ color: 'var(--text-color)', width: '100%' }}
                    >
                      <Globe size={16} /> Visit Website
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ color: 'var(--text-color)', width: '100%' }}
                  >
                    <FaGithub size={16} /> View Repository
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <h3 className="section-title">Experience</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div className="card" style={{ background: 'transparent', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.5rem', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ position: 'relative', width: '45px', height: '16px', flexShrink: 0 }}>
                    <Image src="/images/SIXT_Logo_Neg_RGB.png" alt="SIXT" fill style={{ objectFit: 'contain' }} />
                  </div>
                  <h4 className="card-title" style={{ margin: 0 }}>Software Engineer (Working Student)</h4>
                </div>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>Nov. 2024 – present</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Sixt SE · Customer Account Team (CAT) · Munich</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                In the Customer Account Team (CAT) I work on production‑grade frontend and full‑stack solutions for an international platform with several million users. I develop modern account, identity, and onboarding flows using React, TypeScript, and REST APIs within a micro‑frontend architecture.
              </p>

              <button
                onClick={() => toggleExperience('sixt')}
                className="expand-btn"
              >
                {expandedExperiences['sixt'] ? (
                  <>
                    Read Less <ChevronUp size={16} className="up-icon" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown size={16} className="down-icon" />
                  </>
                )}
              </button>

              <div className={`expandable-content ${expandedExperiences['sixt'] ? 'expanded' : ''}`}>
                <div className="expandable-content-inner">
                  <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <li>Development and deployment of customer‑identity, loyalty, and corporate onboarding features for the SIXT platform</li>
                    <li>Modernization of security‑critical authentication and recovery flows (e.g., password reset, OTP, email verification) including API integration and monitoring via Instana</li>
                    <li>Working with scalable frontend architectures, CI/CD workflows and GitHub Actions across multiple micro‑frontend applications</li>
                    <li>Implementation of redesigns and new user flows based on the P100 design system, integrating modern UI components from Figma designs</li>
                    <li>Collaboration in agile teams using Jira and regular involvement in refactoring, performance, and tech‑debt initiatives.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card" style={{ background: 'transparent', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h4 className="card-title" style={{ margin: 0 }}>IT & Digital Operations (Federal Volunteer Service)</h4>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>Oct. 2021 – Sept. 2022</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Beth Shalom, Munich</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Originally supported the technical management in IT and digital infrastructure. After personnel changes, I took on independent responsibility for coordinating technical processes and onboarding new team members.
              </p>

              <button
                onClick={() => toggleExperience('bethShalom')}
                className="expand-btn"
              >
                {expandedExperiences['bethShalom'] ? (
                  <>
                    Read Less <ChevronUp size={16} className="up-icon" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown size={16} className="down-icon" />
                  </>
                )}
              </button>

              <div className={`expandable-content ${expandedExperiences['bethShalom'] ? 'expanded' : ''}`}>
                <div className="expandable-content-inner">
                  <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <li>Maintenance and further development of web and app platforms content‑wise, technically, and visually</li>
                    <li>Technical preparation and execution of livestreams, including support and equipment maintenance</li>
                    <li>Point of contact for IT support, hardware maintenance, and technical issues in daily operations</li>
                    <li>Coordination of technical processes and onboarding of new volunteers within the team</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card" style={{ background: 'transparent', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h4 className="card-title" style={{ margin: 0 }}>Digital Creative (Freelance)</h4>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>Feb. 2020 – Jan. 2021</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Console Gaming League (CGL eSports)</p>

              <button
                onClick={() => toggleExperience('cgl')}
                className="expand-btn"
                style={{ marginTop: '0.5rem' }}
              >
                {expandedExperiences['cgl'] ? (
                  <>
                    Read Less <ChevronUp size={16} className="up-icon" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown size={16} className="down-icon" />
                  </>
                )}
              </button>

              <div className={`expandable-content ${expandedExperiences['cgl'] ? 'expanded' : ''}`}>
                <div className="expandable-content-inner">
                  <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <li>Development of platform‑optimized visual assets for social media, streaming, and digital campaigns</li>
                    <li>Design of stream overlays and digital interfaces focusing on visual clarity, branding, and user guidance</li>
                    <li>Contribution to building consistent digital brand appearances and scalable visual systems</li>
                    <li>Close collaboration between design, content, and community‑oriented formats in the e‑sport environment</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Education Section */}
        <section id="education">
          <h3 className="section-title">Education</h3>
          <div className="card" style={{ background: 'transparent', padding: '2rem', border: '1px solid var(--border-color)' }}>

            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Bachelor of Science, Media Informatics</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.25rem' }}>Ludwig-Maximilians-Universität München</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>Nov. 2022 – Apr. 2026</span>
                <span style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text-color)',
                  fontWeight: 600
                }}>
                  Overall grade: 1.74
                </span>
              </div>
            </div>

            {/* Academic Projects / Focus */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h5 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                    Bachelor thesis <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 400, marginLeft: '0.5rem' }}>(Grade: 1.5)</span>
                  </h5>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
                  &quot;LLM-based Cybersecurity Assistant with focus on local AI integration, full‑stack architecture, and user‑centered security workflows&quot;
                </p>
                <button onClick={() => setSelectedProjectId("paddy")} className="btn" style={{ color: 'var(--text-color)', marginLeft: '0.5rem', marginTop: '1rem' }}><Info size={14} /> Open project details</button>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h5 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                    Team Project (Software Development Internship) <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 400, marginLeft: '0.5rem' }}>(Personal grade: 1,3)</span>
                  </h5>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
                  Developed an online multiplayer game in Java; after two team members left the team, I completed the project together with a colleague, being fully responsible for game‑logic, UI, and backend integration.
                </p>
              </div>
            </div>

            {/* Selected Modules */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <h5 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem' }}>Selected Modules</h5>
              <div className="tag-container">
                {[
                  { name: "Computational Intelligence", grade: "1,0" },
                  { name: "Cloud Computing", grade: "1,3" },
                  { name: "Software Engineering", grade: "1,3" },
                  { name: "Computer Networks", grade: "1,7" },
                  { name: "Analysis", grade: "1,0" },
                  { name: "Human-Machine Interaction", grade: null },
                  { name: "Database Systems", grade: null },
                  { name: "IT Security", grade: "1,7" }
                ].map((mod, idx) => (
                  <span className="tag" key={idx} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.3rem 0.8rem' }}>
                    {mod.name}
                    {mod.grade && (
                      <>
                        <span style={{ margin: '0 0.35rem', color: 'var(--border-color)' }}>·</span>
                        <span style={{ color: 'var(--text-color)', fontWeight: 500 }}>{mod.grade}</span>
                      </>
                    )}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <h3 className="section-title">Skills</h3>
          <div className="grid grid-cols-2" style={{ gap: '2.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Code2 size={20} />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Languages</h4>
              </div>
              <div className="tag-container">
                <span className="tag">TypeScript</span>
                <span className="tag">JavaScript</span>
                <span className="tag">Python</span>
                <span className="tag">Java</span>
                <span className="tag">Dart</span>
                <span className="tag">SQL</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Component size={20} />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Frameworks & Technologies</h4>
              </div>
              <div className="tag-container">
                <span className="tag">React</span>
                <span className="tag">Next.js</span>
                <span className="tag">Angular</span>
                <span className="tag">Node.js</span>
                <span className="tag">Tailwind CSS</span>
                <span className="tag">MongoDB</span>
                <span className="tag">Supabase</span>
                <span className="tag">OAuth2</span>
                <span className="tag">REST APIs</span>
                <span className="tag">Chrome Extensions API</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Layers size={20} />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Systems & Infrastructure</h4>
              </div>
              <div className="tag-container">
                <span className="tag">Server-side Rendering (SSR)</span>
                <span className="tag">Streaming Architectures</span>
                <span className="tag">Authentication Systems</span>
                <span className="tag">Caching Strategies</span>
                <span className="tag">Micro-Frontend Architectures</span>
                <span className="tag">CI/CD</span>
                <span className="tag">Linux Environments</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Cpu size={20} />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>AI / Interactive Systems</h4>
              </div>
              <div className="tag-container">
                <span className="tag">LLM Integration</span>
                <span className="tag">Local AI Inference</span>
                <span className="tag">GPT4All</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <MonitorPlay size={20} />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Tools & Platforms</h4>
              </div>
              <div className="tag-container">
                <span className="tag">Git / GitHub Actions</span>
                <span className="tag">Vercel</span>
                <span className="tag">Figma</span>
                <span className="tag">Jira</span>
                <span className="tag">Instana</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Globe size={20} />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Languages (Spoken)</h4>
              </div>
              <div className="tag-container">
                <span className="tag"><img src="/germany-flag-round-icon-256.png" alt="German" style={{ width: '16px', height: '16px', marginRight: '0.3rem' }} /> German (Native)</span>
                <span className="tag"><img src="/usa-flag-round-icon-256.png" alt="English" style={{ width: '16px', height: '16px', marginRight: '0.3rem' }} /> English (Native)</span>
                <span className="tag"><img src="/turkeyflag-round-icon-256.png" alt="Turkish" style={{ width: '16px', height: '16px', marginRight: '0.3rem' }} /> Turkish (Basic)</span>
              </div>
            </div>
          </div>
        </section>



        {/* Contact Section */}
        <section id="contact" style={{ textAlign: 'center', padding: '6rem 0', borderTop: '1px solid var(--border-color)', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Get in touch.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Open to new roles, interesting projects, and collaboration.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:christian.dietrich.dev@gmail.com" className="btn btn-primary">
              <Mail size={18} /> E-Mail
            </a>
            <a href="https://github.com/84cdx" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: 'var(--text-color)' }}>
              <FaGithub size={18} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/christian-dietrich-dev" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: 'var(--text-color)' }}>
              <FaLinkedin size={18} /> LinkedIn
            </a>
          </div>
        </section>

        {/* Detailed Project Modal Overlay */}
        <div
          className={`modal-overlay ${selectedProjectId ? 'open' : ''}`}
          onClick={() => setSelectedProjectId(null)}
        >
          {activeProject && (
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setSelectedProjectId(null)}
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              <div className="modal-image-wrapper">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
              </div>

              <div className="modal-content-body">
                <div>
                  <h4 className="modal-project-title">{activeProject.details.title}</h4>
                  <p className="modal-project-subtitle">{activeProject.subtitle}</p>
                </div>

                <div className="modal-meta-grid">
                  {activeProject.details.meta.map((m, idx) => (
                    <div key={idx} className={`modal-meta-item ${m.label === 'Tech-Stack' ? 'full-width' : ''}`}>
                      <span className="modal-meta-label">{m.label}</span>
                      <span className="modal-meta-value">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="modal-section">
                  <h5 className="modal-section-title">Overview</h5>
                  <p className="modal-overview-text">{activeProject.details.overview}</p>
                </div>

                {activeProject.details.sections.map((sec, idx) => (
                  <div key={idx} className="modal-section">
                    <h5 className="modal-section-title">{sec.title}</h5>
                    <ul className="modal-bullets-list">
                      {sec.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="modal-bullet-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FaGithub size={16} /> View Repository
                </a>
                {activeProject.website && (
                  <a
                    href={activeProject.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ color: 'var(--text-color)' }}
                  >
                    <Globe size={16} /> Visit Website
                  </a>
                )}
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="btn"
                  style={{ color: 'var(--text-color)' }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

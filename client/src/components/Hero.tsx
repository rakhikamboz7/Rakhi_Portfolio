  import { motion, useScroll, useTransform } from "framer-motion";
  import { ArrowRight, ChevronDown } from "lucide-react";
  import { useRef, useEffect, useState } from "react";

  const ROLES = ["Full Stack Developer", "UI/UX Designer", "Problem Solver"];

  interface HeroProps {
    onContactOpen: () => void;
  }

  function hexPoints(cx: number, cy: number, r: number, rotation = 0): string {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 180) * (60 * i + rotation);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
  }

  // Bright visible colors that work on BOTH dark and light
  const ACCENT = "#a855f7";
  const ACCENT_BRIGHT = "#c084fc"; // lighter purple for glow/highlights
  const ACCENT_DIM = "rgba(168,85,247,0.25)";
  // const ACCENT_FAINT = "rgba(168,85,247,0.10)";

  export default function Hero({ onContactOpen: _onContactOpen }: HeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"],
    });
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
      const current = ROLES[roleIndex];
      let t: ReturnType<typeof setTimeout>;
      if (!isDeleting && charIndex < current.length)
        t = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 80);
      else if (!isDeleting && charIndex === current.length)
        t = setTimeout(() => setIsDeleting(true), 2200);
      else if (isDeleting && charIndex > 0)
        t = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 40);
      else
        t = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((r) => (r + 1) % ROLES.length);
        }, 0);
      return () => clearTimeout(t);
    }, [charIndex, isDeleting, roleIndex]);

    const scrollTo = (id: string) =>
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    const titleLines = ["Building The", "Impossible", "Experiences."];

    const S = 420;
    const C = S / 2;

    return (
      <section
        ref={containerRef}
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(168,85,247,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.06) 1px, transparent 1px)`,
            backgroundSize: "55px 55px",
            maskImage:
              "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
          }}
        />

        {/* Strong purple glow right side */}
        <div
          className="absolute right-0 top-0 w-[65%] h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 75% at 78% 42%, rgba(168,85,247,0.15) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="relative z-10 w-full"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4">
              {/* ── LEFT: Text ── */}
              <div className="flex-1 max-w-lg z-20">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="flex items-center gap-3 mb-10"
                >
                  <motion.span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: ACCENT,
                      boxShadow: `0 0 10px ${ACCENT}`,
                    }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span
                    className="text-[11px] font-mono tracking-[0.22em] uppercase"
                    style={{ color: ACCENT }}
                  >
                    Available for opportunities
                  </span>
                </motion.div>

                <div className="mb-5 space-y-0.5">
                  {titleLines.map((word, i) => (
                    <div key={i} className="overflow-hidden leading-[1.05]">
                      <motion.h1
                        className={`font-display text-[clamp(2.2rem,7vw,4.8rem)] font-bold tracking-tight`}
                        style={{
                          color:
                            i === 1 ? ACCENT : "var(--text-primary, inherit)",
                        }}
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 0.9,
                          delay: 0.2 + i * 0.13,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {word}
                      </motion.h1>
                    </div>
                  ))}
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-px mb-5 origin-left"
                  style={{ width: "75%", background: "rgba(168,85,247,0.3)" }}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                  className="flex items-center gap-1 mb-4 min-h-[1.8rem]"
                >
                  <span
                    className="font-mono text-sm tracking-wider"
                    style={{ color: "var(--text-secondary, #888)" }}
                  >
                    {displayText}
                  </span>
                  <motion.span
                    className="inline-block w-px h-4"
                    style={{ background: ACCENT }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.88 }}
                  className="text-sm mb-10 leading-relaxed max-w-xs"
                >
                  Problem solving is what makes me unique.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.05 }}
                  className="flex flex-wrap items-center gap-5"
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-view-cv"
                    className="inline-flex items-center justify-center px-7 py-2.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300"
                    style={{
                      border: `1.5px solid ${ACCENT}`,
                      color: ACCENT,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = ACCENT;
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.color = ACCENT;
                    }}
                  >
                    View CV
                  </a>
                  <button
                    onClick={() => scrollTo("#projects")}
                    data-testid="button-see-work"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 group"
                    style={{ color: "var(--text-secondary, #888)" }}
                  >
                    See My Work
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </motion.div>
              </div>

              {/* ── RIGHT: Geometric Portrait ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex-shrink-0"
                style={{ width: `${S}px`, height: `${S}px` }}
              >
                {/* ── SVG BEHIND portrait ── */}
                <svg
                  width={S}
                  height={S}
                  viewBox={`0 0 ${S} ${S}`}
                  className="absolute inset-0 pointer-events-none"
                  style={{ zIndex: 2 }}
                >
                  <defs>
                    <linearGradient
                      id="hexGrad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor={ACCENT_BRIGHT}
                        stopOpacity="1"
                      />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient
                      id="hexGrad2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={ACCENT} stopOpacity="0.6" />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity="0.1" />
                    </linearGradient>
                    <filter
                      id="glowF"
                      x="-30%"
                      y="-30%"
                      width="160%"
                      height="160%"
                    >
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter
                      id="strongGlow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Outermost hex — dashed, slow spin */}
                  <motion.polygon
                    points={hexPoints(C, C, 190, 30)}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="1"
                    strokeDasharray="14 8"
                    strokeOpacity="0.45"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 45,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: `${C}px ${C}px` }}
                  />

                  {/* Mid hex — solid accent, bright, counter-spin */}
                  <motion.polygon
                    points={hexPoints(C, C, 160, 0)}
                    fill="none"
                    stroke="url(#hexGrad1)"
                    strokeWidth="1.6"
                    strokeDasharray="28 8"
                    strokeLinecap="round"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 28,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: `${C}px ${C}px` }}
                    filter="url(#glowF)"
                  />

                  {/* Vertex ticks on mid hex */}
                  {Array.from({ length: 6 }, (_, i) => {
                    const angle = (Math.PI / 180) * (60 * i);
                    const r = 160;
                    const x = C + r * Math.cos(angle);
                    const y = C + r * Math.sin(angle);
                    const nx = Math.cos(angle);
                    const ny = Math.sin(angle);
                    return (
                      <motion.line
                        key={i}
                        x1={x - nx * 9}
                        y1={y - ny * 9}
                        x2={x + nx * 9}
                        y2={y + ny * 9}
                        stroke={ACCENT_BRIGHT}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 28,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ transformOrigin: `${C}px ${C}px` }}
                        filter="url(#glowF)"
                      />
                    );
                  })}

                  {/* Inner hex — static, faint */}
                  <polygon
                    points={hexPoints(C, C, 132, 30)}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="0.8"
                    strokeOpacity="0.22"
                  />

                  {/* Cross diagonals from outer hex corners */}
                  {[0, 2, 4].map((i) => {
                    const a1 = (Math.PI / 180) * (60 * i + 30);
                    const a2 = (Math.PI / 180) * (60 * (i + 3) + 30);
                    const r = 190;
                    return (
                      <line
                        key={i}
                        x1={C + r * Math.cos(a1)}
                        y1={C + r * Math.sin(a1)}
                        x2={C + r * Math.cos(a2)}
                        y2={C + r * Math.sin(a2)}
                        stroke={ACCENT}
                        strokeWidth="0.6"
                        strokeOpacity="0.12"
                      />
                    );
                  })}

                  {/* Radar sweep lines */}
                  {[0, 120, 240].map((deg, i) => (
                    <motion.line
                      key={`scan${i}`}
                      x1={C}
                      y1={C}
                      x2={C + 158 * Math.cos((Math.PI / 180) * deg)}
                      y2={C + 158 * Math.sin((Math.PI / 180) * deg)}
                      stroke={ACCENT_BRIGHT}
                      strokeWidth="0.9"
                      strokeLinecap="round"
                      strokeOpacity="0.5"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10 + i * 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 1.2,
                      }}
                      style={{ transformOrigin: `${C}px ${C}px` }}
                    />
                  ))}

                  {/* Orbiting dots */}
                  <motion.circle
                    r="5"
                    fill={ACCENT_BRIGHT}
                    cx={C + 190}
                    cy={C}
                    filter="url(#strongGlow)"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${C}px ${C}px` }}
                  />
                  <motion.circle
                    r="3"
                    fill={ACCENT}
                    cx={C - 160}
                    cy={C}
                    filter="url(#glowF)"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 11,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: `${C}px ${C}px` }}
                  />

                  {/* Corner brackets */}
                  {[
                    { x: C - 178, y: C - 178, d: "M0 20 L0 0 L20 0" },
                    { x: C + 178, y: C - 178, d: "M0 20 L0 0 L-20 0" },
                    { x: C - 178, y: C + 178, d: "M0 -20 L0 0 L20 0" },
                    { x: C + 178, y: C + 178, d: "M0 -20 L0 0 L-20 0" },
                  ].map((b, i) => (
                    <path
                      key={`b${i}`}
                      d={b.d}
                      transform={`translate(${b.x}, ${b.y})`}
                      fill="none"
                      stroke={ACCENT_BRIGHT}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeOpacity="0.7"
                    />
                  ))}

                  {/* HUD labels */}
                  <text
                    x={C + 152}
                    y={C - 152}
                    fill={ACCENT_BRIGHT}
                    fontSize="9"
                    fontFamily="monospace"
                    opacity="0.85"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    DEV
                  </text>
                  <text
                    x={C - 152}
                    y={C + 158}
                    fill={ACCENT_BRIGHT}
                    fontSize="9"
                    fontFamily="monospace"
                    opacity="0.85"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    UI/UX
                  </text>
                  <text
                    x={C + 152}
                    y={C + 158}
                    fill={ACCENT}
                    fontSize="8"
                    fontFamily="monospace"
                    opacity="0.6"
                    textAnchor="middle"
                  >
                    2025
                  </text>
                </svg>

                {/* ── Glow behind portrait circle ── */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "260px",
                    height: "260px",
                    zIndex: 8,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: `radial-gradient(circle, rgba(168,85,247,0.30) 0%, rgba(168,85,247,0.10) 45%, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* ── Pulsing border ring ── */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "244px",
                    height: "244px",
                    zIndex: 9,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 0 1.5px rgba(168,85,247,0.4), 0 0 30px 4px rgba(168,85,247,0.15)`,
                      `0 0 0 1.5px rgba(192,132,252,0.8), 0 0 60px 16px rgba(168,85,247,0.35)`,
                      `0 0 0 1.5px rgba(168,85,247,0.4), 0 0 30px 4px rgba(168,85,247,0.15)`,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* ── Portrait ── */}
                <div
                  className="absolute rounded-full overflow-hidden"
                  style={{
                    width: "236px",
                    height: "236px",
                    zIndex: 20,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: `2px solid rgba(168,85,247,0.5)`,
                    boxShadow: `0 0 0 6px rgba(168,85,247,0.08), 0 24px 60px -8px rgba(0,0,0,0.4)`,
                  }}
                >
                  <div
                    className="absolute inset-0 z-10 pointer-events-none rounded-full"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, transparent 55%, rgba(168,85,247,0.10) 100%)",
                    }}
                  />
                  <img
                    src="/Rakhi-portfolio.jpg"
                    alt="Rakhi"
                    className="w-full h-full object-cover object-top select-none"
                    draggable={false}
                  />
                </div>

                {/* Name tag - below portrait with generous margin */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="absolute left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
                  style={{ zIndex: 30, top: `${C + 118 + 36}px` }}
                >
                  {/* Accent rule */}
                  <div
                    style={{
                      width: "36px",
                      height: "1.5px",
                      background: ACCENT,
                      borderRadius: "2px",
                      opacity: 0.8,
                    }}
                  />

                  {/* Name - purple on both themes */}
                
                  {/* Name - white on dark, purple on light */}
                  <p
                    className="mt-8 font-display font-bold text-lg tracking-[0.22em] uppercase
    text-purple-500 dark:text-white"
                    style={{ textShadow: "0 0 20px rgba(168,85,247,0.45)" }}
                  >
                    Rakhi
                  </p>

                  {/* Role - uses CSS var so it adapts to light/dark theme */}
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        width: "24px",
                        height: "1px",
                        color: ACCENT_DIM,
                        background: "rgba(168,85,247,0.4)",
                      }}
                    />
                    <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
                      Developer & Designer
                    </span>
                    <div
                      style={{
                        width: "24px",
                        height: "1px",
                        background: "rgba(168,85,247,0.4)",
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.button
            onClick={() => scrollTo("#about")}
            data-testid="button-scroll-down"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5 transition-colors font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-purple-500"
          >
            <ChevronDown size={18} />
            <span>Scroll</span>
          </motion.button>
        </motion.div>
      </section>
    );
  }

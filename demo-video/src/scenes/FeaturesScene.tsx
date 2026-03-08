import { AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

const PROMPTS = [
  {
    prompt: "Build a website showcasing all Generative AI tools with quickstarts and how-tos.",
    result: "Full HTML/CSS/JS app — 51 tools, categories, search, and descriptions generated",
    time: "~15 min",
    color: "#8b5cf6",
  },
  {
    prompt: "Use Frontend Design skills to enhance the UI.",
    result: "Animations, glassmorphism, gradient text, dark theme — complete visual overhaul",
    time: "~10 min",
    color: "#3b82f6",
  },
  {
    prompt: "Can this be made as Next.js for future scalability?",
    result: "Full migration to Next.js 15 App Router, TypeScript, Tailwind CSS, static export",
    time: "~20 min",
    color: "#10b981",
  },
  {
    prompt: "Commit with a proper message and push so I can deploy on Vercel.",
    result: "Git staged, committed with conventional message, pushed to GitHub — ready to deploy",
    time: "~1 min",
    color: "#f59e0b",
  },
];

const PromptCard: React.FC<{ item: (typeof PROMPTS)[0]; delay: number }> = ({ item, delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame, [delay, delay + 15], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, display: "flex", gap: 16, alignItems: "flex-start" }}>
      {/* Left — prompt bubble */}
      <div style={{ flex: 1, background: `${item.color}0d`, border: `1px solid ${item.color}28`, borderRadius: 12, padding: "13px 16px" }}>
        <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 11, fontWeight: 700, color: item.color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>
          Prompt
        </div>
        <div style={{ fontFamily: "ui-monospace, 'Cascadia Code', monospace", fontSize: 12.5, color: "rgba(240,240,255,0.75)", lineHeight: 1.5 }}>
          "{item.prompt}"
        </div>
      </div>

      {/* Arrow */}
      <div style={{ display: "flex", alignItems: "center", paddingTop: 28, color: item.color, fontSize: 18, fontWeight: 900 }}>
        →
      </div>

      {/* Right — result */}
      <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "13px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(240,240,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase" }}>
            Result
          </div>
          <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 100, padding: "2px 10px", fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 11, color: "#10b981", fontWeight: 600 }}>
            {item.time}
          </div>
        </div>
        <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 12.5, color: "rgba(240,240,255,0.55)", lineHeight: 1.5 }}>
          {item.result}
        </div>
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sceneOut = interpolate(frame, [367, 382], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const headingOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const headingY = interpolate(frame, [0, 22], [28, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0e17", opacity: Math.min(sceneIn, sceneOut) }}>
      <Html5Audio src={staticFile("audio-3-process.mp3")} />
      <div style={{ position: "absolute", width: 500, height: 350, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)", top: -80, right: -60 }} />
      <div style={{ position: "absolute", width: 400, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)", bottom: -60, left: 50 }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", gap: 30 }}>

        {/* Heading */}
        <div style={{ opacity: headingOpacity, transform: `translateY(${headingY}px)` }}>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 13, fontWeight: 700, color: "#3b82f6", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
            The Process
          </div>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 42, fontWeight: 800, color: "#f0f0ff", letterSpacing: -1 }}>
            Type a prompt.{" "}
            <span style={{ background: "linear-gradient(120deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Claude does the rest.
            </span>
          </div>
        </div>

        {/* Prompt → Result cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PROMPTS.map((item, i) => (
            <PromptCard key={i} item={item} delay={22 + i * 22} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

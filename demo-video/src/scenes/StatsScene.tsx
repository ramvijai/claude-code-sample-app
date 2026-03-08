import { AbsoluteFill, Html5Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const TOOLS = [
  {
    name: "Claude Code",
    role: "AI Coding Assistant",
    desc: "Writes, edits & runs code from natural-language prompts inside VS Code",
    icon: "✦",
    iconBg: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.2)",
    tag: "by Anthropic",
  },
  {
    name: "VS Code",
    role: "Development IDE",
    desc: "The editor where Claude Code runs as a native extension — zero extra setup",
    icon: "⬡",
    iconBg: "linear-gradient(135deg, #0078d4, #1e9be8)",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.2)",
    tag: "Microsoft",
  },
  {
    name: "Next.js 15",
    role: "React Framework",
    desc: "App Router, TypeScript, static export — production-grade from day one",
    icon: "▲",
    iconBg: "linear-gradient(135deg, #1a1a1a, #444)",
    color: "#f0f0ff",
    glow: "rgba(240,240,255,0.1)",
    tag: "by Vercel",
  },
  {
    name: "Vercel",
    role: "Deployment Platform",
    desc: "Push to GitHub → live in 60 seconds. Zero config for Next.js apps",
    icon: "◆",
    iconBg: "linear-gradient(135deg, #000, #333)",
    color: "#f0f0ff",
    glow: "rgba(240,240,255,0.1)",
    tag: "Hosting",
  },
];

const ToolCard: React.FC<{ tool: (typeof TOOLS)[0]; delay: number }> = ({ tool, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120, mass: 0.9 } });
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      opacity,
      transform: `scale(${scale})`,
      background: "#13172a",
      border: `1px solid ${tool.color}25`,
      borderRadius: 18,
      padding: "28px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      flex: 1,
      boxShadow: `0 8px 40px ${tool.glow}`,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 2, background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)`, borderRadius: 2 }} />

      {/* Icon + tag row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: tool.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", fontWeight: 900, boxShadow: `0 4px 20px ${tool.glow}` }}>
          {tool.icon}
        </div>
        <div style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}25`, borderRadius: 100, padding: "4px 12px", fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 11, color: tool.color, fontWeight: 600 }}>
          {tool.tag}
        </div>
      </div>

      {/* Name + role */}
      <div>
        <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 20, fontWeight: 800, color: "#f0f0ff", marginBottom: 4, letterSpacing: -0.3 }}>
          {tool.name}
        </div>
        <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 13, fontWeight: 600, color: tool.color }}>
          {tool.role}
        </div>
      </div>

      {/* Description */}
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 12, color: "rgba(240,240,255,0.45)", lineHeight: 1.55 }}>
        {tool.desc}
      </div>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sceneOut = interpolate(frame, [322, 337], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const headingOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const headingY = interpolate(frame, [0, 22], [30, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0e17", opacity: Math.min(sceneIn, sceneOut) }}>
      <Html5Audio src={staticFile("audio-2-stack.mp3")} />
      <div style={{ position: "absolute", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 72px", gap: 40 }}>

        {/* Heading */}
        <div style={{ opacity: headingOpacity, transform: `translateY(${headingY}px)`, textAlign: "center" }}>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 13, fontWeight: 700, color: "#8b5cf6", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
            The Stack
          </div>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 46, fontWeight: 800, color: "#f0f0ff", letterSpacing: -1.2 }}>
            4 tools.{" "}
            <span style={{ background: "linear-gradient(120deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              1 complete app.
            </span>
          </div>
        </div>

        {/* Tool cards */}
        <div style={{ display: "flex", gap: 16, width: "100%" }}>
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} delay={20 + i * 16} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

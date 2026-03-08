import { AbsoluteFill, Html5Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const MILESTONES = [
  { icon: "📁", label: "Blank folder", sub: "0 files, 0 lines of code", color: "rgba(240,240,255,0.3)" },
  { icon: "💬", label: "First prompt sent", sub: "Natural language — no syntax", color: "#8b5cf6" },
  { icon: "⚡", label: "App generated", sub: "HTML, CSS, JS — all files written", color: "#3b82f6" },
  { icon: "🎨", label: "UI enhanced", sub: "Design, animations, dark mode", color: "#10b981" },
  { icon: "▲", label: "Next.js migration", sub: "TypeScript, App Router, Tailwind", color: "#f59e0b" },
  { icon: "🚀", label: "Deployed to Vercel", sub: "Live on the internet", color: "#06b6d4" },
];

export const BuildScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sceneOut = interpolate(frame, [307, 322], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const headingOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const headingY = interpolate(frame, [0, 22], [28, 0], { extrapolateRight: "clamp" });

  const timeOpacity = interpolate(frame, [75, 95], [0, 1], { extrapolateRight: "clamp" });
  const timeScale = spring({ frame: frame - 75, fps, config: { damping: 14, stiffness: 130 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0e17", opacity: Math.min(sceneIn, sceneOut) }}>
      <Html5Audio src={staticFile("audio-4-timeline.mp3")} />
      <div style={{ position: "absolute", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 80px", gap: 44 }}>

        {/* Heading */}
        <div style={{ opacity: headingOpacity, transform: `translateY(${headingY}px)`, textAlign: "center" }}>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 13, fontWeight: 700, color: "#10b981", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
            From Zero to Production
          </div>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 46, fontWeight: 800, color: "#f0f0ff", letterSpacing: -1.2 }}>
            Every step driven by{" "}
            <span style={{ background: "linear-gradient(120deg, #8b5cf6, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              natural language
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
          {MILESTONES.map((m, i) => {
            const nodeDelay = 20 + i * 12;
            const nodeOpacity = interpolate(frame, [nodeDelay, nodeDelay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const nodeScale = spring({ frame: frame - nodeDelay, fps, config: { damping: 14, stiffness: 140 } });
            const lineOpacity = interpolate(frame, [nodeDelay + 8, nodeDelay + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={m.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                {/* Node */}
                <div style={{ opacity: nodeOpacity, transform: `scale(${nodeScale})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flex: "0 0 auto" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: i === 0 ? "rgba(255,255,255,0.05)" : `${m.color}18`,
                    border: `2px solid ${m.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22,
                    boxShadow: i > 0 ? `0 0 20px ${m.color}50` : "none",
                  }}>
                    {m.icon}
                  </div>
                  <div style={{ textAlign: "center", maxWidth: 90 }}>
                    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 11, fontWeight: 700, color: m.color, lineHeight: 1.3 }}>
                      {m.label}
                    </div>
                    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 10, color: "rgba(240,240,255,0.35)", lineHeight: 1.4, marginTop: 2 }}>
                      {m.sub}
                    </div>
                  </div>
                </div>

                {/* Connector line */}
                {i < MILESTONES.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, ${m.color}, ${MILESTONES[i + 1].color})`, opacity: lineOpacity, marginBottom: 44 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Time callout */}
        <div style={{ opacity: timeOpacity, transform: `scale(${timeScale})`, display: "flex", alignItems: "center", gap: 20, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 16, padding: "18px 36px" }}>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 52, fontWeight: 900, background: "linear-gradient(120deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: -2 }}>
            &lt; 2 hrs
          </div>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 16, color: "rgba(240,240,255,0.55)", lineHeight: 1.5 }}>
            Total time from blank folder<br />to live production app
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

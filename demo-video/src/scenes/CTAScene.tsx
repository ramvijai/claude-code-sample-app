import { AbsoluteFill, Html5Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const iconScale = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });

  const headingOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });
  const headingY = interpolate(frame, [15, 40], [40, 0], { extrapolateRight: "clamp" });

  const subOpacity = interpolate(frame, [38, 58], [0, 1], { extrapolateRight: "clamp" });

  const card1Opacity = interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" });
  const card1Scale = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 130 } });

  const card2Opacity = interpolate(frame, [68, 88], [0, 1], { extrapolateRight: "clamp" });
  const card2Scale = spring({ frame: frame - 68, fps, config: { damping: 14, stiffness: 130 } });

  const footerOpacity = interpolate(frame, [90, 110], [0, 1], { extrapolateRight: "clamp" });

  const orb1 = interpolate(frame, [0, 130], [0, 20]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0e17", opacity: sceneIn }}>
      <Html5Audio src={staticFile("audio-5-cta.mp3")} />
      {/* Orbs */}
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 65%)", top: -200 + orb1, left: -150, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%)", bottom: -100, right: -50, pointerEvents: "none" }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 80px", gap: 0 }}>

        {/* Icon */}
        <div style={{ opacity: iconScale, transform: `scale(${iconScale})`, width: 68, height: 68, borderRadius: 20, background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 28, boxShadow: "0 0 50px rgba(139,92,246,0.45)" }}>
          ✦
        </div>

        {/* Main heading */}
        <div style={{ opacity: headingOpacity, transform: `translateY(${headingY}px)`, textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 62, fontWeight: 900, letterSpacing: -2, lineHeight: 1.1, color: "#f0f0ff" }}>
            Build your own app
            <br />
            <span style={{ background: "linear-gradient(120deg, #8b5cf6, #a78bfa, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              with Claude Code
            </span>
          </div>
        </div>

        {/* Subheading */}
        <div style={{ opacity: subOpacity, fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 20, color: "rgba(240,240,255,0.45)", textAlign: "center", maxWidth: 600, lineHeight: 1.6, marginBottom: 44 }}>
          No prior coding experience needed. Just describe what you want — Claude Code writes, runs, and deploys it for you.
        </div>

        {/* Two cards */}
        <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>

          {/* Claude Code link */}
          <div style={{ opacity: card1Opacity, transform: `scale(${card1Scale})`, background: "rgba(139,92,246,0.1)", border: "1.5px solid rgba(139,92,246,0.35)", borderRadius: 16, padding: "20px 32px", textAlign: "center", minWidth: 280, boxShadow: "0 0 40px rgba(139,92,246,0.15)" }}>
            <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 12, fontWeight: 700, color: "#a78bfa", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
              Get Started
            </div>
            <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 15, color: "#f0f0ff", fontWeight: 600 }}>
              claude.ai/code
            </div>
            <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 11, color: "rgba(240,240,255,0.35)", marginTop: 6 }}>
              VS Code extension by Anthropic
            </div>
          </div>

          {/* Live example link */}
          <div style={{ opacity: card2Opacity, transform: `scale(${card2Scale})`, background: "rgba(6,182,212,0.08)", border: "1.5px solid rgba(6,182,212,0.25)", borderRadius: 16, padding: "20px 32px", textAlign: "center", minWidth: 280 }}>
            <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 12, fontWeight: 700, color: "#06b6d4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
              See the Live Example
            </div>
            <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, color: "#f0f0ff", fontWeight: 600 }}>
              claude-code-sample-app
              <br />.vercel.app
            </div>
            <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 11, color: "rgba(240,240,255,0.35)", marginTop: 6 }}>
              Built entirely with Claude Code
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ opacity: footerOpacity, fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 13, color: "rgba(240,240,255,0.22)", letterSpacing: 0.3 }}>
          Claude Code · VS Code · Next.js 15 · Vercel — a 2-hour build
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

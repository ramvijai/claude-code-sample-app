import { AbsoluteFill, Html5Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneOut = interpolate(frame, [216, 231], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const line1Opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const line1Y = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: "clamp" });

  const line2Opacity = interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" });
  const line2Y = interpolate(frame, [25, 50], [40, 0], { extrapolateRight: "clamp" });

  const dividerW = interpolate(frame, [55, 80], [0, 200], { extrapolateRight: "clamp" });

  const answerOpacity = interpolate(frame, [75, 100], [0, 1], { extrapolateRight: "clamp" });
  const answerY = interpolate(frame, [75, 100], [30, 0], { extrapolateRight: "clamp" });

  const badgeOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" });

  const orb1 = interpolate(frame, [0, 150], [0, 25]);
  const orb2 = interpolate(frame, [0, 150], [0, -18]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0e17", opacity: sceneOut }}>
      <Html5Audio src={staticFile("audio-1-hook.mp3")} />
      {/* Orbs */}
      <div style={{ position: "absolute", width: 650, height: 650, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 68%)", top: -180 + orb1, left: -120, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 68%)", bottom: -80 + orb2, right: 0, pointerEvents: "none" }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 100px", gap: 0 }}>

        {/* Line 1 — the old way */}
        <div style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)`, fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 36, fontWeight: 400, color: "rgba(240,240,255,0.45)", textAlign: "center", marginBottom: 16 }}>
          Building a production web app used to take
        </div>

        {/* Line 2 — weeks */}
        <div style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)`, fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 80, fontWeight: 900, color: "#f0f0ff", textAlign: "center", letterSpacing: -2.5, lineHeight: 1, marginBottom: 40 }}>
          weeks of work.
        </div>

        {/* Divider */}
        <div style={{ width: dividerW, height: 2, background: "linear-gradient(90deg, #8b5cf6, #06b6d4)", borderRadius: 2, marginBottom: 40 }} />

        {/* Answer */}
        <div style={{ opacity: answerOpacity, transform: `translateY(${answerY}px)`, textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 36, fontWeight: 400, color: "rgba(240,240,255,0.5)", marginBottom: 12 }}>
            With <span style={{ color: "#a78bfa", fontWeight: 700 }}>Claude Code</span>, the same app took
          </div>
          <div style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 80,
            fontWeight: 900,
            background: "linear-gradient(120deg, #8b5cf6, #a78bfa, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -2.5,
            lineHeight: 1,
          }}>
            under 2 hours.
          </div>
        </div>

        {/* Badge */}
        <div style={{ opacity: badgeOpacity, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 100, padding: "10px 24px", fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 15, color: "#a78bfa", letterSpacing: 0.3 }}>
          Here's exactly how it was done →
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

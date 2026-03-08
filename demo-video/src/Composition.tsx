import { AbsoluteFill, Sequence } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { StatsScene } from "./scenes/StatsScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { BuildScene } from "./scenes/BuildScene";
import { CTAScene } from "./scenes/CTAScene";

// Scene durations matched to re-scripted ElevenLabs audio (at 30fps, +20f buffer, no overlap)
// audio-1-hook:      7.03s → 231 frames
// audio-2-stack:    10.55s → 337 frames
// audio-3-process:  12.04s → 382 frames
// audio-4-timeline: 10.06s → 322 frames
// audio-5-cta:      12.09s → 383 frames
// Total: 1655 frames ≈ 55s
const TITLE_START    = 0;
const TITLE_DURATION = 231;

const STATS_START    = 231;
const STATS_DURATION = 337;

const FEATURES_START    = 568;
const FEATURES_DURATION = 382;

const BUILD_START    = 950;
const BUILD_DURATION = 322;

const CTA_START    = 1272;
const CTA_DURATION = 383;

export const GenAIHubDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0e17" }}>
      <Sequence from={TITLE_START} durationInFrames={TITLE_DURATION}>
        <TitleScene />
      </Sequence>

      <Sequence from={STATS_START} durationInFrames={STATS_DURATION}>
        <StatsScene />
      </Sequence>

      <Sequence from={FEATURES_START} durationInFrames={FEATURES_DURATION}>
        <FeaturesScene />
      </Sequence>

      <Sequence from={BUILD_START} durationInFrames={BUILD_DURATION}>
        <BuildScene />
      </Sequence>

      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};

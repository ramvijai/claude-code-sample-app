import "./index.css";
import { Composition } from "remotion";
import { GenAIHubDemo } from "./Composition";

// Total frames = CTA_START (1272) + CTA_DURATION (383) = 1655 frames ≈ 55 seconds at 30fps
const TOTAL_FRAMES = 1655;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GenAIHubDemo"
        component={GenAIHubDemo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};

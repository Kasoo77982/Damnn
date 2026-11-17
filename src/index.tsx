import { registerRoot, Composition } from 'remotion';
import { GreciaEmEbulicao as Video } from './Composition';

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 30;
const DURATION_FRAMES = 480 * FPS; // 8 minutos

const Root = () => (
  <Composition
    id="GreciaEmEbulicao"
    component={Video}
    durationInFrames={DURATION_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);

registerRoot(Root);

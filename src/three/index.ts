import { camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { objects } from "./objects";
import { renderTarget } from "./core/renderTarget";
import { threeSizes } from "./utils/sizes";
import { resources } from "../utils/resources";
import { raycast } from "./utils/raycast";

let canvas: HTMLCanvasElement | null = null;

const init = (_canvas: HTMLCanvasElement) => {
  canvas = _canvas;

  const setup = () => {
    threeSizes.init(_canvas);
    threeSizes.resize();
    camera.init();
    renderTarget.init();
    renderer.init(canvas);

    objects.init();
    raycast.init();
  };
  if (resources.isReady) setup();
  else resources.once("ready", setup);
};

const destroy = () => {
  threeSizes.destroy();
  renderTarget.destroy();
  renderer.destroy();
  objects.destroy();
  camera.destroy();
  canvas = null;
};

export const three = { init, destroy };

import { Render } from './render.js';
import { SortTarget } from './sortTarget.js';

export function createTargetWithVisualizer(xBegin, yBegin, width, height, n) {
  const render = new Render(xBegin, yBegin, width, height);
  const tg     = new SortTarget(n);

  tg.setRender(render);
  render.setTarget(tg);

  return {render, target: tg};
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}
// minˆÈãmax–¢–ž
export const randomInt = (min, max) => Math.floor(Math.random() * (max-min) + min);

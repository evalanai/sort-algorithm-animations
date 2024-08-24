// -*- coding: utf-8-unix -*-
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
// min以上max未満
export const randomInt = (min, max) => Math.floor(Math.random() * (max-min) + min);

export const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; --i) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
}

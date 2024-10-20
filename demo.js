// -*- coding: utf-8-unix -*-
import { createTargetWithVisualizer } from './util.js';
import { SortTarget } from './sortTarget.js';
import { sleep } from './util.js';

export class Demo {
  #sort;
  #render;
  #target;
  #sleepTime;
  #intervalFrame = 60;
  #t = 0;
  #p;

  constructor(name, sort, n) {
    ({render: this.#render, target: this.#target} = createTargetWithVisualizer(0, 0, 400, 400, n));
    this.#sort = sort;
    this.#sort.name = name;
    this.#sleepTime = this.#sort.interval ?? 50; 
  }

  resize(width, height) {
    this.#render.width  = width;
    this.#render.height = height;
    this.#render.adjustCanvas(this.#p);
  }

  changeLength(n) {
    this.#target.changeLength(n);
  }

  setSleepTime(ms) {
    this.#sleepTime = ms;
  }

  setP5Instance(p) {
    this.#p = p;
    this.#render.setP5Instance(p);
  }

  get finished() {
    return this.#target.isSorted && this.#t >= this.#intervalFrame;
  }

  get name() {
    return this.#sort.name;
  }

  describe() {
    return this.#sort.description;
  }

  start(signal) {
    this.#sort.doSort(this.#target, () => sleep(this.#sleepTime), signal);
    this.#render.adjustCanvas(this.#p);
    this.#p.loop();
  }

  draw() {
    this.#p.background(200);
    this.#render.draw(this.#p, {info: `${this.#sort.name}`});
    if (this.#target.isSorted) this.#t++;
  }

  stopDraw() {
    this.#p.noLoop();
  }
  
  reset() {
    this.#target.shuffle();
    this.#p.noLoop();
    this.#t = 0;
  }

  restart() {
    // todo: ちょっといい方法が思いつかない
    this.#target = new SortTarget(this.#target.length);
    this.#target.setRender(this.#render);
    this.#render.setTarget(this.#target);
    this.reset();
    this.start();
  }
}


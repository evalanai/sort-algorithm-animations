// -*- coding: utf-8-unix -*-
import { EachDraw } from './eachDraw.js';
import { AllDraw  } from './allDraw.js';

// 順番に表示するための裏方作業

export class DemoList {
  #eachDraw;
  #allDraw;

  constructor() {
    this.#eachDraw = new EachDraw();
    this.#allDraw  = new AllDraw ();
  }

  addDemo(name, sort, n=10) {
    this.#eachDraw.addDemo(name, sort, n);
    this.#allDraw .addDemo(name, sort, n);
  }

  startEach() {
    this.#allDraw.stop();
    this.#eachDraw.display();
    this.#eachDraw.start();
  }

  initAll() {
    this.#allDraw.init();
  }

  initEach() {
    this.#eachDraw.init();
  }

  startAll(width, height) {
    this.#eachDraw.stop();
    this.#allDraw.display();
    this.#allDraw.start(width, height);
  }
}

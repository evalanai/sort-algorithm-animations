// -*- coding: utf-8-unix -*-
import { Demo } from './demo.js';

export class EachDraw {
  #demos = [];
  #cur = 0;
  #p;

  addDemo(name, sort, n) {
    this.#demos.push(new Demo(name, sort, n));
  }

  next() {
    this.#demos[this.#cur].reset();
    this.#cur = (this.#cur+1) % this.#demos.length;
  }

  thisDescription() {
    return this.#demos[this.#cur].describe();
  }

  init() {
    new p5(p => {
      this.#demos[this.#cur].setP5Instance.bind(this.#demos[this.#cur])(p);
      p.draw = this.eachDraw.bind(this, p);
      this.#demos[this.#cur].reset();
    }, "cnv_default");
    //this.#demos.forEach(demo => demo.reset());
  }

  display() {
    document.querySelector('#draw-each').checked = true;
    const container = document.querySelector('#canvas-container');
    for (let cnv of container.children) {
      cnv.hidden = cnv.id !== 'cnv_default';
    }
  }

  stop() {
    this.#demos[this.#cur].reset();
  }

  start() {
    this.#demos[this.#cur].start();
  }

  eachDraw(p) {
    if (this.#demos[this.#cur].finished) {
      this.next();
      this.#demos[this.#cur].setP5Instance(p);
      this.start();

    } else {
      this.#demos[this.#cur].draw();
    }
  }
}

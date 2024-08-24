// -*- coding: utf-8-unix -*-
import { Demo } from './demo.js';

// 順番に表示するための裏方作業

export class DemoList {
  #demos = [];
  #cur = 0;
  #intervalFrame = 60;
  #t = 0;

  addDemo(name, sort, n=10) {
    this.#demos.push(new Demo(name, sort, n));
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

  loopDraw(i) {
    if (this.#demos[i].finished) {
      this.restart(i);

    } else {
      this.#demos[i].draw();
    }
  }

  startAll() {
    const container = document.querySelector('#canvas-container');
    this.#demos.forEach((demo, i) => {
      const btn = document.createElement('button');
      const id = `sk_${demo.name}`;
      btn.className = 'cnv-button';
      btn.id = id;
      container.appendChild(btn);
      new p5(p => {
        demo.setP5Instance.bind(demo)(p);
        p.draw = () => this.loopDraw(i);
      }, id);
      demo.start();
    });

    container.addEventListener('click', this.onClick);
  }

  startEach() {
    new p5(p => {
      this.#demos[this.#cur].setP5Instance.bind(this.#demos[this.#cur])(p);
      p.draw = this.eachDraw.bind(this, p);
    }, "cnv_default");
    this.#demos[this.#cur].start();
  }

  onClick(e) {
    if (e.target.tagName !== 'CANVAS') return;
    const container = document.querySelector('#canvas-container');
    const targetButton = e.target.closest('button');

    // todo: 説明部のトグル
    if (targetButton.classList.contains('pressed')) {
      targetButton.classList.remove('pressed');
      return;
    }
    // ???: 無駄が減るようにもうちょっと工夫する？
    for (let child of container.children) {
      child.classList.remove('pressed');
    }
    targetButton.classList.add('pressed');
  }
/*
  interval(next) {
    if (this.#t >= this.#intervalFrame) {
      next();
      return;
    }

    this.#demos[this.#cur].draw();
    this.#t++;
  }*/

  next() {
    this.#demos[this.#cur].reset();

    this.#cur = (this.#cur+1) % this.#demos.length;
    this.#t = 0;

  }

  restart(i) {
    this.#demos[i ?? this.#cur].reset();
    this.#demos[i ?? this.#cur].start();
  }

  start() {
    this.#demos[this.#cur].start();  
  }

  thisDescription() {
    return this.#demos[this.#cur].describe();
  }
}

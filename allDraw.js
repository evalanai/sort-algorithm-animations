// -*- coding: utf-8-unix -*-
import { Demo } from './demo.js';

export class AllDraw {
  #demos = [];
  #onClick = this.onClick.bind(this);

  addDemo(name, sort, n) {
    this.#demos.push(new Demo(name, sort, n));
  }

  restart(i) {
    this.#demos[i].reset();
    this.#demos[i].start();
  }

  loopDraw(i) {
    if (this.#demos[i].finished) {
      this.restart(i);

    } else {
      this.#demos[i].draw();
    }
  }

  init() {
    const container = document.querySelector('#canvas-container');
    this.#demos.forEach((demo, i) => {
      const btn = document.createElement('button');
      const id = `sk_${i}`;
      btn.className = 'cnv-button';
      btn.id = id;
      btn.hidden=true;
      container.appendChild(btn);
      new p5(p => {
        p.noLoop();
        demo.setP5Instance(p);
        p.draw = this.loopDraw.bind(this,i);
      }, id);
      demo.reset();
    });
  }

  display() {
    const container = document.querySelector('#canvas-container');
    document.querySelector('#draw-tile').checked = true;
    for (let cnv of container.children) {
      cnv.hidden = cnv.id === 'cnv_default';
    }
    container.addEventListener('click', this.#onClick);
  }

  stop() {
    this.#demos.forEach(demo => demo.stopDraw());
    document.querySelector('#canvas-container').removeEventListener('click', this.#onClick)
  }

  start(w=400, h=400) {
    this.#demos.forEach((demo, i) => {
      demo.resize(w, h);
      demo.reset();
      demo.start();
    });
  }

  onClick(e) {
    if (e.target.tagName !== 'CANVAS') return;
    const container = document.querySelector('#canvas-container');
    const info = document.querySelector('#info');
    const targetButton = e.target.closest('button');

    const isPressed = targetButton.classList.contains('pressed')
    // todo: 説明部のトグル
    if (isPressed) {
      info.classList.add('hidden');
      targetButton.classList.remove('pressed');
      return;
    }
    // ???: 無駄が減るようにもうちょっと工夫する？
    for (let child of container.children) {
      child.classList.remove('pressed');
    }

    info.classList.remove('hidden');
    targetButton.classList.add('pressed');
    const sketchId = targetButton.id.replace('sk_', '');
    info.innerHTML = this.#demos[sketchId].describe() ?? 'no document.';
  }
}

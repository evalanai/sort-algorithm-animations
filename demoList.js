// -*- coding: utf-8-unix -*-
import { Demo } from './demo.js';

// 順番に表示するための裏方作業

export class DemoList {
  #eachDraw;
  #allDraw;
  #mode;

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
    this.#mode = "each";
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
    this.#mode = "all";
  }

  restart() {
    switch (this.#mode) {
    case "each":
      this.#eachDraw.restart();
      break;

    case "all":
      this.#allDraw .restartAll();
      break;
    }
  }
}


class EachDraw {
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

  restart() {
    this.stop();
    this.start();
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


// ファイル分けしたいが分けたらGithub Pagesが止まったのでとりあえず...
class AllDraw {
  #demos = [];
  #onClick = this.onClick.bind(this);

  addDemo(name, sort, n) {
    this.#demos.push(new Demo(name, sort, n));
  }

  restart(i) {
    this.#demos[i].reset();
    this.#demos[i].start();
  }

  restartAll() {
    this.#demos.forEach(demo => {
      demo.reset();
      demo.start();
    })
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

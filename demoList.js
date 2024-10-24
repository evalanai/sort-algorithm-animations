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

  setSleepTime(ms) {
    this.#eachDraw.setSleepTime(ms);
    this.#allDraw .setSleepTime(ms);
  }
}


class EachDraw {
  #demos = [];
  #cur = 0;
  #isScrolled = false;
  #t = 0;
  #changeDelay = 60;  // [frame]
  #p;

  addDemo(name, sort, n) {
    this.#demos.push(new Demo(name, sort, n));
  }

  next() {
    this.reset();
    this.#cur = (this.#cur+1) % this.#demos.length;
  }

  set activeDemo(name) { // todo: あとでもうちょい軽い処理に書き換える
    this.reset();
    this.#cur = this.#demos.findIndex(demo => demo.name === name);
    this.start();
  }

  thisDescription() {
    return this.#demos[this.#cur].describe();
  }

  init() {
    new p5(p => {
      this.#demos.forEach(demo => {
        demo.setP5Instance.bind(demo)(p);
        demo.reset();
      });
      p.draw = this.eachDraw.bind(this, p);
    }, "cnv_default");

    document.querySelector('#sort-choice')
      .addEventListener('change', e =>
        this.activeDemo = e.target.value);

    document.querySelector('#description')
      .addEventListener('scroll', () => {
        this.#t = 0;
        this.#isScrolled = true;
      });
  }

  display() {
    document.querySelector('#draw-each').checked = true;
    const container = document.querySelector('#canvas-container');
    for (let cnv of container.children) {
      cnv.hidden = cnv.id !== 'cnv_default';
    }
  }

  reset() {
    this.#demos[this.#cur].reset();
    this.#t = 0;
    this.#isScrolled = false;
  }

  updateLength() {
    const newLength = Number(document.querySelector('#target-n-number').value);
    if (newLength > 2) {
      this.#demos[this.#cur].changeLength(newLength);
    }
  }

  setSleepTime(ms) {
    this.#demos.forEach(demo => demo.setSleepTime(ms));
  }

  stop() {
    this.#demos[this.#cur].reset();
    this.#t = 0;
    this.#isScrolled = false;
  }

  start() {
    document.querySelector(`#${this.#demos[this.#cur].name}`).checked=true;
    this.updateLength();
    this.#demos[this.#cur].start();
  }

  restart() {
    this.updateLength();
    this.reset();
    this.#demos[this.#cur].restart();
  }

  eachDraw(p) {
    const desc = document.querySelector('#description');
    desc.innerHTML = this.thisDescription() ?? 'not documented.';

    /* descriptionがスクロールされたらthis.#changeDelay分延長
     * 放置されてるなら普通に変更
     * ソート未完了なら続行
     */
    if (this.#demos[this.#cur].finished && this.#t >= this.#changeDelay) {
      this.next();
      this.start();

    } else if (this.#demos[this.#cur].finished && this.#isScrolled) {
      this.reset();
      this.start();

    } else {
      this.#demos[this.#cur].draw();
      this.#t++;
    }
  }
}


// ファイル分けしたいが分けたらGithub Pagesが止まったのでとりあえず...
class AllDraw {
  #demos = [];
  #onClick = this.onClick.bind(this);
  #abort = new AbortController();

  addDemo(name, sort, n) {
    this.#demos.push(new Demo(name, sort, n));
  }

  setSleepTime(ms, i) {
    if (typeof i === 'number' && i >= 0) {
      this.#demos[i].setSleepTime(ms);
    } else {
      this.#demos.forEach(demo => demo.setSleepTime(ms));
    }
  }

  restart(i) {
    this.#demos[i].reset();
    this.#demos[i].start();
  }

  restartAll() {
    this.#abort.abort();
    this.#demos.forEach(demo => {
      demo.restart();
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
      demo.start(this.#abort.signal);
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

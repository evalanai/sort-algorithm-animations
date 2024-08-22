import { createTargetWithVisualizer, sleep } from './util.js';

// 鬆�逡ｪ縺ｫ陦ｨ遉ｺ縺吶ｋ縺溘ａ縺ｮ陬乗婿菴懈･ｭ

export class DemoList {
  #demos = [];
  #cur = 0;
  #intervalFrame = 60;
  #t = 0;

  addDemo(name, sort, n=10) {
    this.#demos.push(new Demo(name, sort, n));
  }

  eachDraw() {
    if (this.#demos[this.#cur].finished) {
      this.interval();

    } else {

      background(200);
      this.#demos[this.#cur].draw();
    }
  }

  interval() {
    if (this.#t >= this.#intervalFrame) {
      this.next();
      return;
    }

    this.#demos[this.#cur].draw();
    this.#t++;
  }

  next() {
    this.#demos[this.#cur].reset();

    this.#cur = (this.#cur+1) % this.#demos.length;
    this.#t = 0;

    this.start();
  }

  start() {
    this.#demos[this.#cur].start();  
  }

  thisDescription() {
    return this.#demos[this.#cur].describe();
  }
}

export class Demo {
  #sort;
  #render;
  #target;
  #waitTime;

  constructor(name, sort, n) {
    ({render: this.#render, target: this.#target} = createTargetWithVisualizer(5, 5, width-10, height-10, n));
    this.#sort = sort;
    this.#sort.name = name;
    this.#waitTime = this.#sort.interval ?? 50; 
  }
/*
  // optで使えるもの
  // n: 棒の数
  // xBegin, yBegin: x, y始点
  // width, height: 幅、高さ
  resize(opt) {
  }
*/
  setWaitTime(ms) {
    this.#waitTime = ms;
  }

  get finished() {
    return this.#target.isSorted;
  }

  describe() {
    return this.#sort.description;
  }

  start() {
    this.#sort.doSort(this.#target, () => sleep(this.#waitTime));
  } 

  draw() {
    this.#render.draw({info: `${this.#sort.name}`});
  }
  
  reset() {
    this.#target.shuffle();
  }
}


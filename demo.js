// 順番に表示するための裏方作業

class DemoList {
  #demos = [];
  #cur = 0;
  #intervalFrame = 60;
  #t = 0;

  addDemo(name, sort) {
    this.#demos.push(new Demo(name, sort));
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
    console.log(this.#demos[this.#cur])
    return this.#demos[this.#cur].describe();
  }
}

class Demo {
  #sort;
  #render;
  #target;

  constructor(name, sort) {
    ({render: this.#render, target: this.#target} = createTargetWithVisualizer(5, 5, width-10, height-10, 10));
    this.#sort = sort;
    this.#sort.name = name;
  }

  get finished() {
    return this.#target.isSorted;
  }

  describe() {
    return this.#sort.description;
  }

  start() {
    this.#sort.doSort(this.#target);
  } 

  draw() {
    this.#render.draw({info: `${this.#sort.name}`});
  }
  
  reset() {
    this.#target.shuffle();
  }
}


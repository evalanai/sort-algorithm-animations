export class Render {  // 描画
  #xBegin;
  #yBegin;
  #width;
  #height;
  #highlightedIndex;
  #highlightedRange;
  #target;
  #marks;
  #p;

  constructor(xBegin, yBegin, width, height) {  // 描画範囲の指定
    this.#xBegin = xBegin;
    this.#yBegin = yBegin;
    this.#width  = width;
    this.#height = height;
    this.#marks  = new Map();
  }

  set width(w) {
    this.#width = w;
  }

  set height(h) {
    this.#height = h;
  }

  createMark(name, colour, withText=false) {
    this.#marks.set(name, {color: this.#p.color(colour), withText, active: true});
  }

  setP5Instance(p) {
    this.#p = p;
  }

  addMark(index, name) {  // 見た目用
    this.#target.barAt(index).addMark(name);
  }

  removeMark(index, name) {
    if (name) {
      return this.#target.barAt(index).removeMark(name);
    }
    this.#target.barAt(index).clearMark();
  }
    
  setTarget(target) {
    this.#target = target;
  }

  setup(p) {
    p.createCanvas(this.#width, this.#height);
  }

  adjustCanvas() {
    this.#p.resizeCanvas(this.#width, this.#height);
  }

  draw(p, captions) {  // 常に呼ぶ描画
    const margin = 10;
    const tickness = (this.#width-margin*2)/this.#target.length;

    p.push();
    p.noStroke();
    p.fill(0);

    // 背景
    p.rect(this.#xBegin, this.#yBegin, this.#width, this.#height);
    // 注目中範囲
    if (this.#highlightedRange) {
     /* const rangeLeft  = this.#highlightedRange.begin * tickness+margin;
      const rangeRight = (this.#highlightedRange.end) * tickness-margin;
      fill(50, 100, 50);
      rect(rangeLeft, this.#yBegin, rangeRight, this.#height-margin);*/
    }

    p.translate(margin/2,-margin/2);

    // 棒
    this.#target.bars.forEach((bar, idx) => {
      const x = idx+tickness*idx;
      const h = p.map(bar.value, 0, this.#target.length, margin, this.#height-margin);
      const activeMark = bar.marks.find(i => this.#marks.get(i).active);

      if (this.#highlightedIndex?.has(idx)) {  // 棒の色
        p.fill('red');

      } else if (activeMark) {
        p.fill(this.#marks.get(activeMark).color);

      } else {
        p.fill(255);
      }

      p.rect(x, this.#height, tickness, -h);  // 棒1本
    });

    p.fill(255);
    p.textAlign(p.LEFT, p.TOP);
    p.textFont('Monospace');
    p.textSize(p.max(this.#width/20, 10));
    p.text(captions.info, 0, margin);

    p.pop();
  }

  highlightSelect(...indexes) {
    this.#highlightedIndex = new Set(indexes);
  }

  highlightRange(begin, end) {
    this.#highlightedRange = {begin, end};
  }

  clearHighlight() {
    this.#highlightedRange = null;
    this.#highlightedIndex = null;
  }

  done() {  // 並べ替え完了演出
    this.clearHighlight();
  }
}


class Render {  // 描画
  #xBegin;
  #yBegin;
  #width;
  #height;
  #highlightedIndex;
  #highlightedRange;
  #target;
  #marks;

  constructor(xBegin, yBegin, width, height) {  // 描画範囲の指定
    this.#xBegin = xBegin;
    this.#yBegin = yBegin;
    this.#width  = width;
    this.#height = height;
    this.#marks  = new Map();
  }

  createMark(name, colour, withText=false) {
    this.#marks.set(name, {color: color(colour), withText, active: true});
  }

  addMark(index, name) {  // 見た目用
    this.#target.barAt(index).addMark(name);
  }

  unmark(name) {
    this.#marks.get(name).active = false;
  }
    
  setTarget(target) {
    this.#target = target;
  }

  draw(captions) {  // 常に呼ぶ描画
    const margin = 10;
    const tickness = (this.#width-margin*2)/this.#target.length;

    push();
    noStroke();
    fill(0);

    // 背景
    rect(this.#xBegin, this.#yBegin, this.#width, this.#height);
    // 注目中範囲
    if (this.#highlightedRange) {
      const rangeLeft  = this.#highlightedRange.begin;
      const rangeRight = this.#highlightedRange.end/*todo: 位置加工*/;

      rect(rangeLeft, this.yBegin, rangeRight, this.#height);
    }

    translate(margin,0);

    // 棒
    this.#target.bars.forEach((bar, idx) => {
      const x = idx+tickness*idx;
      const h = map(bar.value, 0, this.#target.length, margin, this.#height-margin);

      if (this.#highlightedIndex?.has(idx)) {  // 棒の色
        fill('red');

      } else if (bar.marks.some(i => i.active)) {
        const mark = bar.marks.find(i => i.active);
        console.log(mark);
        fill(mark.color);

      } else {
        fill(255);
      }

      rect(x, this.#height, tickness, -h);  // 棒1本
    });

    fill(255);
    textAlign(LEFT, TOP);
    textFont('Monospace');
    textSize(20);
    text(captions.info, 15, 20);

    pop();
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


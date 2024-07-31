class SortTarget {  // 並べ替え対象
  #numbers;
  #render;
  #isSorted;

  constructor(length) {
    this.#numbers = shuffle([...Array(length)].map((itm, idx) => idx+1));
    this.#isSorted = false;
  }

  setRender(render) {
    this.#render = render;
  }

  get length() {
    return this.#numbers.length;
  }

  get values() {
    return this.#numbers;
  }

  get isSorted() {
    return this.#isSorted;
  }

  at(...indexes) {  // なんぼでも同時に取ってこれるように
    this.#render.highlightSelect(...indexes);
    return indexes.map(index => this.#numbers[index]);
  }

  between(beg, end) { // beg <= index <= endの範囲の値
    this.#render.highlightRange(beg, end);
    return this.#numbers.slice(beg, end+1);
  }

  swap(index1, index2) {
    const temp = this.#numbers[index1];

    this.#numbers[index1] = this.#numbers[index2];
    this.#numbers[index2] = temp;
  }

  done() {
    this.#render.done();
    this.#isSorted = true;
  }

  shuffle() {
    shuffle(this.#numbers, true);
    this.#isSorted = false;
  }
}

const sortList = {

  bubbleSort: {

    async doSort(tg) {

      // 本当ならこっちに突っ込もうかと思っていた処理を全部
      // SortTargetに追い出したのでこんな感じで配列の代わりに
      // SortTargetをいじくり回してくだちい

      let finished = false;

      while (!finished) {

        finished = true;

        for (let i = 1; i < tg.length; ++i) {

          // 隣り合う2要素
          const left_i  = i-1;
          const right_i = i;
          const [left_v, right_v] = tg.at(left_i, right_i);

          // 左に行くほど小さく、右ほど大きく並べ替える
          if (left_v > right_v) {
            tg.swap(left_i, right_i);
            finished = false;
          }

          await sleep(50);  // 人間が目で追えるくらいのスピードに
        }
      }
      tg.done();   // ソート完了通知
    },

    description: `バブルソート
ソート対象のデータ列を順番に調べ、
隣り合う2つのデータが順番通りに並んでいればそのまま、
逆順になっていればその2つを入れ替えるというアルゴリズムです。`
  },

  /* 上のバブルソートを参考に追加していってね☆★☆ */
  /*
  yourSort: {
    doSort() {...},
    description: `...`
  },
  ...
  */
};

    


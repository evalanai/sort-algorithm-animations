export const bubblesort = {
  async doSort(tg, sleep) {
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

        await sleep();  // 人間が目で追えるくらいのスピードに
      }
    }
    tg.done();   // ソート完了通知
  },

  description: `<h2>バブルソート</h2>
ソート対象のデータ列を順番に調べ、
隣り合う2つのデータが順番通りに並んでいればそのまま、
逆順になっていればその2つを入れ替えるというアルゴリズムです。`
};

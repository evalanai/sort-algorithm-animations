export const bubblesort = {
  async doSort(tg, sleep, signal) {
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

  description: `<h1>バブルソート</h1>
ソート対象のデータ列を順番に調べ、
隣り合う2つのデータが順番通りに並んでいればそのまま、
逆順になっていればその2つを入れ替えるというアルゴリズムです。

<h2>動作の詳細</h2>
<ol>
  <li> 左から順番に要素を見ていきます。 </li>
  <ol>
    <li> 今見ている要素と隣にある要素の2つを比較します。 </li>
    <li> 右隣の要素のほうが小さければ、2つを入れ替えます。 </li>
  </ol>
  <li> 入れ替えチェックを終えたら、次に並んでいる2つについても同じことを行います。 </li>
  <li> 最後の2つまで入れ替えチェックを終えた場合は、また一番左から始めて比較を続けます。
  ただし、もし一周する間に1度も入れ替えを行わなかった場合は、ソート完了です。</li>
</ol>

<h2> 推しポイント </h2>
<b>簡単！作りやすい！！！</b>
`
};

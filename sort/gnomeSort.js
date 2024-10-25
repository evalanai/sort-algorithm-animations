export const gnomeSort = {
  async doSort(tg, sleep) {

    let i = 0;    // 現在位置

    // 前に要素がない場合は終了
    while (tg.at(i + 1)) {
      const right_i = i + 1;

      // 現在位置と隣の2要素を比較
      if (tg.at(right_i) < tg.at(i)) {  // 順序が逆の場合は入れ替え

        tg.swap(right_i, i);
        await sleep();

        // 後ろの要素がある場合は後退
        if (tg.at(i - 1)) {
          --i;
          continue;
        }
      }

      // 前進
      ++i;
    }

    tg.done();
  },

  description: `<h1>ノームソート</h1>
隣接する2要素を比較し、順序が逆の場合は2つを入れ替えて後退、
正しい場合は前進移動するというアルゴリズムです。
ガーデンノームが植木鉢を順番に並べるときに使う方法とされています。

<h2>動作の詳細</h2>
<ol>
<li>左から2番目の位置を現在地とし、その要素からスタートします。</li>
<li>現在地の要素と隣の要素を比較します。</li>
<li>右側の要素のほうが小さければ2つを入れ替え、現在地から1つ後退します。</li>
<li>最後の要素にたどり着いたらソート完了です。</li>
</ol>

<h2> 推しポイント </h2>
上述のルールに従った入れ替えと移動を行っているだけですが、挿入ソートのように適切な位置を探しているように見えるところが不思議でずっと見てしまいます！
そしてバブルソートのようにシンプルな仕組みなのに、挿入ソートに匹敵する効率の良さです!!`
}
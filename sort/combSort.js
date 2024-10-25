export const CombSort = {
  async doSort(tg, sleep) {
    let h = tg.length;  //空ける間隔
    let finished = false;

    while (!finished) {
      // 間隔が1より大きければ徐々に間隔を狭める
      if (h > 1) h = Math.floor(h / 1.3);

      // hが1の時はバブルソート。入れ替えがなければ終了。
      if (h === 1) finished = true;

      for (let i = 0; i < tg.length-h; ++i) {
        const left_i  = i;
        const right_i = i + h;
        const [left_v, right_v] = tg.at(left_i, right_i);

        if (left_v > right_v) {
          tg.swap(left_i, right_i);
          finished = false;
        }

        await sleep();
      }
    }

    tg.done();
  },

  description: `<h1>コムソート</h1>
バブルソートの改良版です。櫛（くし、コーム）の形のように間隔をあけ、その間隔を徐々に狭めながらソートします。

<h2>動作の詳細</h2>
<ol>
<li>要素の総数÷1.3(小数点以下切り捨て)の間隔をあけて、順番に2つの要素を比較します。</li>
<li>比較対象となる2つの要素で、左側の要素のほうが大きい場合は入れ替えます。</li>
<li>端まで要素を比較しつくしたら今の間隔をさらに1.3で割った間隔に狭め、同様の比較を繰り返します。</li>
<li>もし間隔が1で隣りあう要素同士の比較になっている場合は、入れ替えがなくなるまで間隔1のまま入れ替えを繰り返します。この時はバブルソートと同じ動きをします。</li>
<li>間隔1の状態で、入れ替えが発生しなくなったらソート完了です。</li>
</ol>

<h2>推しポイント</h2>
櫛のように間隔があいているため見た目がオシャレです。
平均計算量で見るとシェーカーソートよりも高速です。`
}

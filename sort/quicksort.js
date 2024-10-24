// -*- coding: utf-8-unix -*-
import { randomInt } from '../util.js';

export const quicksort = {
  async doSort(tg, sleep) {  // sleep: 停止時間の指定されたsleep
    tg.createMark('Pivot', '#88f', true);
    tg.createMark('attention', '#9aed97', false);

    async function sort(beg, max) {
      const end = max - 1;
      if (beg >= end || beg === max) return;

      for (let i = beg; i < max; ++i) tg.markIndex(i, 'attention');


      // pivotを決める
      let pivotIndex = randomInt(beg, max);
      const pivot = tg.at(pivotIndex);
      tg.markIndex(pivotIndex, 'Pivot');

      let high_i = beg;  // pivot以上の値のindex
      let low_i  = end;  // pivot未満の値のindex

      // 左にpivot未満、右にpivot以上の値を集める
      while (true) {
        // 左からpivot以上の値を探す
        for (; tg.at(high_i) < pivot; high_i++) {
          await sleep();
        }

        // 右からpivot以下の値を探す
        for (; tg.at(low_i) > pivot; low_i--) {
          await sleep();
        }

        // 左から探したindexのほうが左にある（= 交ざってる）
        if (high_i < low_i) {
          tg.swap(high_i, low_i);
          await sleep();

        } else { // 逆になってる or 一致（= 分け尽くした）
          break;
        }
      }

      pivotIndex = high_i;  // high_i === low_i && low_i === pivotIndex
      tg.unmarkAll('attention');
      tg.unmarkIndex(pivotIndex, 'Pivot');

      // pivot未満の部分とそれ以外でそれぞれ
      await sort(beg, pivotIndex);

      await sort(pivotIndex+1, max);
    }

    await sort(0, tg.length);
    tg.done();

  },

  description: `<h1> クイックソート </h1>
    初めにピボットと呼ばれる基準値を選び、
    それより大きい値と小さい値に分けることを繰り返すアルゴリズムです。
    多くの場合、他のソートに比べ高速であるとされています。

    <h2>動作の詳細</h2>
    <ol>
  <li> ピボットとなる値を選びます。
    ピボットには色々な選び方があるのですが、ここではランダムに選んでいます。 </li>
  
  <li> ピボットと各要素を比較し、
    左にピボット未満、右にピボット以上の要素を集めます。 </li>
  <li> 集めた左側と右側のそれぞれの中でまたピボットを選び、同じことを繰り返します。 </li>
  <li> これを並べ替える範囲をどんどん細かくして繰り返すことで、順番に並べることができます。 </li>
</ol>

<h2> 推しポイント </h2>
<b>速い、かっこいい、実装はむずい！</b>正直自分に書けると思ってなかったです。おすすめは並べ替え対象300本くらいの設定です。かっこいいので絶対見てください！！！`
};

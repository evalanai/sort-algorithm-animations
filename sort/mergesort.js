// -*- coding: utf-8-unix -*-
export const mergesort = {
  async doSort(tg, sleep) {

    await mergesort(0, tg.length);
    tg.done();

    async function mergesort(left, right) {
      if (right - left < 2) return;

      // 真ん中で分ける
      const center = Math.floor((left + right) / 2);
      await mergesort(left  , center);
      await mergesort(center, right );

      await merge(left, center, right);
    }

    async function merge(left, center, right) {
      // その場でいじるので元データ退避
      let leftGroup  = tg.between(left  , center-1);
      let rightGroup = tg.between(center, right-1 );
      let li = 0,               // 左側グループ0から
          ri = 0,               // 右側グループ0から
          cur = left;           // 元データでの位置

      // 2つのグループの先頭を比較し小さいほうからマージ先に入れていく
      // 先にどちらかのグループがなくなることがある
      while (li < leftGroup.length && ri < rightGroup.length) {  // 両グループともに残っている要素がある
        if (leftGroup[li] <= rightGroup[ri]) {
          tg.set(cur, leftGroup[li]);
          li++;
          cur++;
        } else {
          tg.set(cur, rightGroup[ri]);
          ri++;
          cur++;
        }
        await sleep();
      }

      // 残ったものを順番に入れる
      while (li < leftGroup.length) { // 左だけ残った
        tg.set(cur, leftGroup[li]);
        await sleep();
        li++;
        cur++;
      }
      while (ri < rightGroup.length) { // 右だけ残った
        tg.set(cur, rightGroup[ri]);
        await sleep();
        ri++;
        cur++;
      }
    }
  },
  description: `<h2>マージソート</h2>
いわゆる「しめじソート」。2つの値のペアから始め、
2つのグループから端の値を順番になるよう取り出し、
1列に並べることを繰り返すソートです。

    <h2>動作の詳細</h2>
    <ol>
  <li> 要素を1~2個のまとまりになるまでグループに分けます。
この時点では並べ替えはしません。 </li>
  
  <li> 分けたグループを2つずつ合成（マージ）していきます。 </li>
<ol>
  <li> 2つのグループの要素を先頭から比較していき、小さいものから先に並べていきます。 </li>
  <li> 要素の大きさが偏っており、先に片方のグループが無くなる場合もありますが、その時は残ったグループをそのまま続けて並べます。 </li>
  <li> マージしてできた、より大きなグループ同士に対しても同じことを行い、どんどん大きなグループにまとめていきます。 </li>
</ol>
<li> 最終的に大きな2つのグループをマージして、ソート完了です。</li>
</ol>

<h2> 推しポイント </h2>
見た目がおもしろい！マージ動作でグループごとに綺麗に並んだ細かいソート済み列ができては崩れる動きは何度も繰り返し見たくなります！！`
}

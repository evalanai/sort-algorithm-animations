// -*- coding: utf-8-unix -*-
export const mergesort = {
  async doSort(tg, sleep) {

    await mergesort(0, tg.length);
    tg.done();

    async function mergesort(left, right) {
      if (right - left < 2) return;

      const center = Math.floor((left + right) / 2);
      // 真ん中で分ける
      await mergesort(left  , center);
      await mergesort(center, right );

      await merge(left, center, right);
    }

    async function merge(left, center, right) {
      // その場でいじるので元データ退避
      let leftGroup = tg.between(left, center-1);
      let rightGroup = tg.between(center, right-1);
      let li = 0,               // 左側グループ0から
          ri = 0,   // 右側グループ0から
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
1列に並べることを繰り返すソートです。`
}

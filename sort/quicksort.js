// -*- coding: utf-8-unix -*-
sortList.quicksort = {
  async doSort(tg) {
    async function sort(beg, max) {
      console.log('sort');
      const end = max - 1;
      if (beg >= end || beg === max) return;
      
      
      // pivotを決める
      let pivotIdx = randomInt(beg, max);
      let [pivot] = tg.at(pivotIdx);
      tg.createMark('Pivot', 'blue', true);
      tg.markIndex(pivotIdx, 'Pivot');
      console.log(`pivot: ${pivot}, index: ${pivotIdx}`);

      let high_i = beg;  // pivot以上の値のindex
      let low_i  = end;  // pivot未満の値のindex
      let high_found, low_found;

      // 左にpivot未満、右にpivot以上の値を集める
      while (true) {
        console.log('find');
        console.log(tg.values.slice(beg, max));
        // 左からpivot以上の値を探す
        for (let left = high_i; left < max; left++) {
          high_found = false;
          const [v] = tg.at(left);
          await sleep(50);
          console.log(`→left: i: ${left}, ${v} >= ${pivot} (${v >= pivot})`);
          if (v >= pivot) {
            high_i = left;
            high_found = true;
            break;
          }
        }
        // 右からpivot未満の値を探す
        for (let right = low_i; right >= beg; right--) {
          low_found = false;
          const [v] = tg.at(right);
          await sleep(50);
          console.log(`←right: ${right}, ${v} <= ${pivot} (${v <= pivot})`);
          if (v <= pivot) {
            low_i = right;
            low_found = true;
            break;
          }
        }

        console.log('validate');
        // 左から探したindexのほうが左にある（= 交ざってる）
        if (high_i < low_i) {
          tg.swap(high_i, low_i);
          await sleep(50);
          high_i++;
          console.log(`${high_i} < ${low_i}, swapped`);

        } else { // 逆になってる or 一致（= 分け尽くした）
          break;
        }
      }

      console.log(pivot, tg.values.slice(beg, max), high_i, low_i);
      // pivot未満の部分とそれ以外でそれぞれ
      await sort(beg, high_i);
      await sort(high_i, max);
    }

    let finished = false;

    await sort(0, tg.length);
    tg.done();

  },

  description: `<h2>クイックソート</h2>
初めにピボットと呼ばれる基準値を選び、それより大きい値と小さい値に分けることを繰り返すアルゴリズムです。多くの場合、他のソートに比べ高速であるとされています。`
};

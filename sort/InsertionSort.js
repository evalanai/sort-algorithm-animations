export const InsertionSort = {
    async doSort(arr, sleep) {
        let len = arr.length;
        let holder;

        for (let i = 1; i < len; i++) {
            holder = arr.at(i);

            let j = i - 1;
            for (; j >= 0; j--) {
                if (arr.at(j) > holder) {
                    arr.set(j + 1, arr.at(j));
                }
                else {
                    break;
                }
                await sleep();
            }
            arr.set(j + 1, holder);
        }
        arr.done();
        return arr;
    },
    discription: `<h1>選択ソート</h1>
    データを順番に調べながら1番大きい要素を記憶し、
    それを1番前に移動することを繰り返すアルゴリズムです。

    <h2>動作の詳細</h2>
    <ol>
    <li>データを始めの値を記憶し、順に見ていきます。</li>
    <li>記憶した値と今見ている値を比較します。</li>
    <li>記憶した値より今見ている値が大きければ新たにそちらを記憶します。</li>
    <li>最後まで見たらその時記憶している1番大きい値を1番前に移動します。</li>
    <li>移動が無くなるまで繰り返したら、ソート完了です。</li>
    </ol>

    <h2>推しポイント</h2>
    <ul>
    <li>動きが人間の思い描くものに近いので、視覚的に分かりやすいです。</li>
    </ul>`
}

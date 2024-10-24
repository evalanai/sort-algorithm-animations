export const SelectionSort = {
    async doSort(arr, sleep) {
        const len = arr.length;
        let biggest;
        let holder;

        for (let i = 0; i < len; i++) {
            biggest = i;

            for (let j = i; j < len; j++) {
                if (arr.at(biggest) < arr.at(j)) {
                    biggest = j;
                    await sleep();
                }
            }
            holder = arr.at(biggest);
            for (let k = biggest - 1; k >= i; k--) {
                arr.set(k + 1, arr.at(k));
                await sleep();
            }
            arr.set(i, holder);
        }
        arr.done();
        return arr;
    }
}
/*
description: `<h2>選択ソート</h2>
    最大値を探して1番前に移動させることを繰り返すアルゴリズムです。

    <h2>動作の詳細</h2>
    <ol>
    <li>データ列の1番最初の要素を記憶します。</li>
    <li>記憶した要素とそれ以降の要素を順番に比較し、1番大きい値を記憶し続けます。</li>
    <li>最後まで比較したら、記憶している(1番大きい)値をデータ列の最初に移動します。</li>
    <li>最初に記憶する値を移動した分ずらしながら、
    これを移動が無くなるまで繰り返したらソート完了です。</li>
    <\ol>

    <h2>推しポイント</h2>
    動きが人間が想像するものに近いため理解しやすいです。
    */

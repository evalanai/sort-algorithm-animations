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
                //await sleep();
            }
            arr.set(j + 1, holder);
            await sleep();    //ここに入れると見やすいかも
        }
        arr.done();
        return arr;
    },
    description: `<h2>挿入ソート</h2>
    各要素を既に整列されているデータ列に新たに追加するものとして見て、
    それらを正しい位置に挿入するソートです。

    <h2>動作の詳細</h2>
    <ol>
    <li>最初は要素が1つだけのデータ列として見ます。</li>
    <li>2つめの要素を新たに追加された要素として見て、それより前の要素と比較します。</li>
    <li>比較が終わったら正しい位置に追加された要素を挿入します。</li>
    <li>このような処理を最後の要素まで繰り返したらソート完了です。</li>
    </ol>

    <h2>推しポイント</h2>
    普通にソートする分にはこれを使わなくてもできますが、
    後から要素を増やしてソートし直すことには強いです。`
}

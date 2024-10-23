
function swap(arr, a, b)
{
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

export const ShakerSort = {
    async doSort(arr, sleep) {
        const len = arr.length;
        let latest;
        let bigining = 0;
        let ending = len - 1;

        while (1) {
            for (let i = 0; i < len; i++) {
                latest = i;
                if (arr.at(i) > arr.at(i + 1)) {
                    arr.swap(i, i + 1);
                    latest = i;
                }
                await sleep();
            }
            ending = latest;

            if (bigining == ending) {
                return arr;
            }

            for (let i = latest - 1; i >= bigining; i--) {
                if (arr.at(i) > arr.at(i + 1)) {
                    arr.swap(i, i + 1);
                    latest = i;
                }
                await sleep();
            }
            bigining = latest;

            if (bigining == ending) {
                arr.done();
                return arr;
            }
        }
    },
    description: `<h2>シェーカー(双方向バブル)ソート</h2>
    その名の通り反対からもやるバブルソートです。

    <h2>動作の詳細</h2>
    <ol>
    <li>バブルソートと同じように、順番に隣の要素と比較し入れ替える、という動作を行います。</li>
    <li>最後まで行ったら、今度は最初からではなく最後から同じようにやります。</li>
    <li>最初から見る、と最後から見るを入れ替えが無くなるまでやったらソート完了です。</li>
    </ol>

    <h2>推しポイント</h2>
    処理は増えますがバブルソートより早いです。`
}

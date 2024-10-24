function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

//適当に思いついたけどなんだこのソート
export const kariSort = {
    async doSort(tg, sleep) {
        const len = tg.length;
        for (let i = 0; i < len; i++) {
            for (let j = i; j < len; j++) {
                await sleep();
                if (tg.at(i) > tg.at(j)) {
                    tg.swap(i, j);
                }
            }
        }
        tg.done();
        return tg.value;
    },

    description: `<h2>仮ソート</h2>
    私がなんとなく書いたら運よく動いてしまったコードです。
    総当たりで比較をしているだけのあまり効率が良くないソートです。

    <h2>動作の詳細</h2>
    <ul>
    <li>全ての要素を比較し、入れ替えているだけです。</li>
    </ul>

    <h2>推しポイント</h2>
    シンプルでコードがとっても短い！！！暇つぶしで書いたものにしては上出来！`
}

//バブルソートレベル0
export const bubbleSort0 = {
    async doSort(tg, sleep) {
        const len = tg.length;
        for (let i = 0; i < len; i++) {
            for (let j = len - 1; j > i; j--) {
                await sleep();
                if (tg.at(j - 1) > tg.at(j)) {
                    tg.swap(j - 1, j);
                }
            }
        }
        tg.done();
        return tg;
    }
}

//バブルソートレベル1
export const bubbleSort1 = {
    async doSort(tg, sleep) {
        const len = tg.length;
        for (let i = 0; i < len; i++) {
            let count = 0;
            for (let j = len - 1; j > i; j--) {
                await sleep();
                if (tg.at(j - 1) > tg.at(j)) {
                    tg.swap(j - 1, j);
                    count++;
                }
            }
            if (count === 0) break;
        }
        tg.done();
        return tg.values;
    }
}

//バブルソートレベル2
export const bubbleSort2 = {
    async doSort(tg, sleep) {
        let i = 0;
        const len = tg.length;
        while (i < len - 1) {
            let lastSwap = len - 1;
            for (let j = len - 1; j > i; j--) {
                await sleep();
                if (tg.at(j - 1) > tg.at(j)) {
                    tg.swap(j - 1, j);
                    lastSwap = j;
                }
            }
            i = lastSwap;
        }
        tg.done();
        return tg.values;
    },

    description: `<h2>バブルソート2</h2>
    上記バブルソートの改良版です。
    最後に入れ替えられた場所をカウントし、ループを行う範囲を限定していきます。それにより、効率よく入れ替えを実行できます。

    <h2>動作の詳細</h2>
    ほとんど上記のソートと変わらないため、違う点を解説します。
    <ul>
    <li>このソートは左でなく右から入れ替えを実行しています。//深い意味はありません。作者が違うだけです。</li>
    <li>最後に交換が起こった場所を記録し、それを基準にループを実行しています。右から順に値を入れ替え、最後に入れ替えが発生した場所が一番右ならループを終了します。</li>
    </ul>

    <h2>推しポイント</h2>
    仕組みが単純な割に効率がいい！！`
}

//シャトルソート
export const shuttleSort = {
    async doSort(tg, sleep) {
        const len = tg.length;
        for (let i = 1; i < len; i++) {
            const temp = tg.at(i);
            let j;
            for (j = i; j > 0 && tg.at(j - 1) > temp; j--) {
                await sleep();
                tg.set(j, tg.at(j - 1));
            }
            await sleep();
            tg.set(j, temp);
        }
        tg.done();
        return tg.value;
    },

    description: `<h2>シャトルソート(単純挿入ソート)</h2>
    シャトルソート(単純挿入ソート)は、着目要素をそれより先頭側の適切な位置に要素を挿入していく作業を繰り返していくソートです。

    <h2>動作の詳細</h2>
    <ol>
    <li>左から2番目の要素から右側に順に基準にしていきます。</li>
    <li>基準より左側の値をチェックし、基準の要素が入るべき場所を定めます。</li>
    <li>その場所に値を挿入します。</li>
    <li>これらの操作を基準が一番右になるまで繰り返します。</li>
    </ol>

    <h2>推しポイント</h2>
    ソート済みに近い状態の要素なら高速！！！`
}

//シェルソート
export const shellSort = {
    async doSort(tg, sleep) {
        const len = tg.length;
        for (let h = Math.floor(len / 2); h > 0; h = Math.floor(h / 2)) {
            for (let i = h; i < len; i++) {
                const temp = tg.at(i);
                let j;
                for (j = i; j >= h && tg.at(j - h) > temp; j -= h) {
                    tg.set(j, tg.at(j - h));
                    await sleep();
                }
                tg.set(j, temp);
                await sleep();
            }
        }
        tg.done();
        return tg.value;
    },

    description: `<h2>シェルソート</h2>
    シェルソートはシャトルソートの長所を生かしながら短所を補い、高速なソートを実現するソートです。
    要素をグループに分け、離れた場所の値を比較していきます。
    クイックソートが登場するまで最速のソートアルゴリズムとされていました。

    <h2>動作の詳細</h2>
    <ol>
    <li>要素を全要素の半分に分けてグループ化します。</li>
    <li>その各グループ内の要素を左から基準に設定し、その基準同士でソートを実行していきます。</li>
    <li>グループをさらに半分に分割し、2を実行します。</li>
    <li>分割できなくなるまで繰り返していきます。</li>
    </ol>

    <h2>推しポイント</h2>
    ソートの回数自体は多いのに全体としては要素の移動回数が少ない！！！`
}

//度数分布ソート
export const frequencySort = {
    async doSort(tg, sleep) {
        const len = tg.length;
        const max = Math.max(...tg.values);

        const f = new Array(max + 1).fill(0);
        const n = new Array(len).fill(0);

        for (let i = 0; i < len; i++) {
            f[tg.at(i)]++;
        }

        for (let i = 1; i <= max; i++) {
            f[i] += f[i - 1];
        }

        for (let i = len - 1; i >= 0; i--) {
            n[--f[tg.at(i)]] = tg.at(i);
        }

        for (let i = 0; i < len; i++) {
            tg.set(i, n[i]);
            await sleep();
        }

        tg.done();
        return tg.value;
    },

    description: `<h2>度数分布ソート</h2>
    要素の累積度数分布グラフを作成し、それから要素を生成するソートです。<br>
    ソートなのに値の比較を1度も行わないという世界一美しい(当社比)アルゴリズムです。<br>
    完全にロマンに全振りしている素晴らしいソートです。

    <h2>動作の詳細</h2>
    <ol>
    <li>各要素が何個あるか示す度数分布表を作成します。</li>
    <li>1でできた度数分布表から、その要素までの値の合計である累積度数分布表を作成します。</li>
    <li>1と2の情報を繋げてソート済みデータを作成します。<br>    //度数分布表は各点数を取った人の分布、累積度数分布表は点数の分布を指しているため</li>
    </ol>

    <h2>推しポイント</h2>
    ソートをするのに条件分岐を一つも使わない！！！美しい！！！！！`
}


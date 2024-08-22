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
    }
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
    }
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
    }
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
    }
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
    }
}


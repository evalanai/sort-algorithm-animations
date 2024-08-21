function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

//適当に思いついたけどなんだこのソート
function kariSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = i; j < len; j++) {
            if (arr[i] > arr[j]) {
                swap(arr, i, j);
            }
        }
    }
    return arr;
}

//バブルソートレベル0
function bubbleSort0(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = len - 1; j > i; j--) {
            if (arr[j - 1] > arr[j]) {
                swap(arr, j - 1, j);
            }
        }
    }
    return arr;
}

//バブルソートレベル1
function bubbleSort1(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let count = 0;
        for (let j = len - 1; j > i; j--) {
            if (arr[j - 1] > arr[j]) {
                swap(arr, j - 1, j);
                count++;
            }
        }
        if (count === 0) break;
    }
    return arr;
}

//バブルソートレベル2
function bubbleSort2(arr) {
    let i = 0;
    const len = arr.length;
    while (i < len - 1) {
        let lastSwap = len - 1;
        for (let j = len - 1; j > i; j--) {
            if (arr[j - 1] > arr[j]) {
                swap(arr, j - 1, j);
                lastSwap = j;
            }
        }
        i = lastSwap;
    }
    return arr;
}

//シャトルソート
function shuttleSort(arr) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        const temp = arr[i];
        let j;
        for (j = i; j > 0 && arr[j - 1] > temp; j--) {
            arr[j] = arr[j - 1];
        }
        arr[j] = temp;
    }
    return arr;
}

//シェルソート
function shellSort(arr) {
    const len = arr.length;
    for (let h = Math.floor(len / 2); h > 0; h = Math.floor(h / 2)) {
        for (let i = h; i < len; i++) {
            const temp = arr[i];
            let j;
            for (j = i; j >= h && arr[j - h] > temp; j -= h) {
                arr[j] = arr[j - h];
            }
            arr[j] = temp;
        }
    }
    return arr;
}

//度数分布ソート
function frequencySort(arr) {
    const len = arr.length;
    const max = Math.max(...arr);

    const f = new Array(max + 1).fill(0);
    const n = new Array(len).fill(0);

    for (let i = 0; i < len; i++) {
        f[arr[i]]++;
    }

    for (let i = 1; i <= max; i++) {
        f[i] += f[i - 1];
    }

    for (let i = len - 1; i >= 0; i--) {
        n[--f[arr[i]]] = arr[i];
    }

    for (let i = 0; i < len; i++) {
        arr[i] = n[i];
    }

    return arr;
}



function swap(arr, a, b)
{
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

function ShakerSort(arr) {
    const len = arr.length;
    let latest;
    let bigining = 0;
    let ending = len - 1;

    while (1) {
        for (let i = 0; i < len; i++) {
            latest = i;
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                latest = i;
            }
        }
        ending = latest;

        if (bigining == ending) {
            return arr;
        }

        for (i = latest - 1; i >= bigining; i--) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                latest = i;
            }
        }
        bigining = latest;

        if (bigining == ending) {
            return arr;
        }
    }
}
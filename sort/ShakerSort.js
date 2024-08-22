
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
    }
}

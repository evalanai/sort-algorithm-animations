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
    }
}

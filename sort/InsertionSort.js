function InsertionSort(arr) {
    let len = arr.length;
    let holder;

    for (let i = 1; i < len; i++) {
        holder = arr[i];

        for (let j = i - 1; j >= 0; j--) {
            if (a[j] > holder) {
                arr[j + 1] = arr[j];
            }
            else {
                break;
            }
        }
        arr[j + 1] = holder;
    }
    return arr;
}

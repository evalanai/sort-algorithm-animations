function SelectionSort(arr) {
    const len = arr.length;
    let biggest;
    let holder;

    for (let i = 0; i < len; i++) {
        biggest = i;

        for (let j = i; j < len; j++) {
            if (arr[j] < arr[j + 1]) {
                biggest = j + 1;
            }
        }
        holder = arr[biggest];
        for (let k = biggest - 1; k >= i; k--) {
            arr[k + 1] = arr[k];
        }
        arr[i] = holder;
    }
    console.log(arr);
    return arr;
}

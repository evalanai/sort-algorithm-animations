function SelectionSort(arr)
{
	const len = arr.length;
	let biggest;

	for (let i = 0; i < len; i++)
	{
		biggest = i;

		for (let j = i; j < len; j++)
		{
			if (arr[j] < arr[j + 1])
			{
				biggest = j;
			}
		}

		swap(後で);
	}

	return arr;
}

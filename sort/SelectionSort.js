function swap(arr, a, b)
{
	var tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;
}

function SelectionSort(arr)
{
	const len = arr.length;
	let biggest;

	for (let i = 0; i < len; i++)
	{
		biggest = i;

		for (let j = 0; j < len; j++)
		{
			if (arr[j] < arr[j + 1])
			{
				biggest = j;
			}
		}

		swap(arr, i, biggest);
	}

	return arr;
}
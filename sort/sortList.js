// -*- coding utf-8-unix -*-
import { bubblesort } from './bubbleSort.js';
import { quicksort  } from './quicksort.js';
import { kariSort,
         bubbleSort2,
         shuttleSort,
         shellSort,
         frequencySort } from './sort0000.js';
import { InsertionSort } from './InsertionSort.js';
import { SelectionSort } from './SelectionSort.js';
import { ShakerSort } from './ShakerSort.js';
import { CombSort   } from './combSort.js';
import { mergesort } from './mergesort.js';
import { gnomeSort } from './gnomeSort.js';

export const sortList = {
  bubblesort,
  bubbleSort2,
  ShakerSort,
  CombSort,
  quicksort,
  InsertionSort,
  SelectionSort,
  gnomeSort,
  kariSort,
  shuttleSort,
  shellSort,
  frequencySort,
  mergesort,
  
  /* こんな感じね
  yourSort: {
    async doSort() {...},
    description: `...`
  },
  ...
  */
};

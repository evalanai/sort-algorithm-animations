// -*- coding utf-8-unix -*-
import { bubblesort } from './bubbleSort.js';
import { quicksort  } from './quicksort.js';
import { kariSort,
         bubbleSort0,
         bubbleSort1,
         bubbleSort2,
         shuttleSort,
         shellSort,
         frequencySort } from './sort0000.js';
import { InsertionSort } from './InsertionSort.js';
//import { SelectionSort } from './SelectionSort.js';
import { ShakerSort } from './ShakerSort.js';
import { mergesort } from './mergesort.js'; 

export const sortList = {
  bubblesort,
  bubbleSort0,
  bubbleSort1,
  bubbleSort2,
  ShakerSort,
  quicksort,
  InsertionSort,
  //SelectionSort,
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

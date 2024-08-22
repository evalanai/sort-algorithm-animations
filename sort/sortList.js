// -*- coding utf-8-unix -*-
import { bubblesort } from './bubbleSort.js';
import { quicksort  } from './quicksort.js';
import * as sort0000 from './sort0000.js';

export const sortList = {
  bubblesort,
  quicksort,
  /* こんな感じね
  yourSort: {
    async doSort() {...},
    description: `...`
  },
  ...
  */
};

// い、いっぱいあったもん...(震え声)
Object.entries(sort0000).forEach(([name, sort]) => sortList[name] = sort);

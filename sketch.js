import { DemoList } from './demoList.js';
import { sortList } from './sort/sortList.js';

const demoList = new DemoList();
const desc = document.querySelector('#description');

function showDescription() {
  desc.innerHTML=demoList.thisDescription() ?? 'no document.';
  desc.hidden=false;
}

function setMaxScale() {
  document.querySelector('#canvas-scale-w').max = window.innerWidth;
  document.querySelector('#canvas-scale-h').max = window.innerHeight;
} 


window.onload = () => {
  document.querySelector('#draw-each').addEventListener('change', demoList.startEach.bind(demoList));
  document.querySelector('#draw-tile').addEventListener('change', demoList.startAll.bind(demoList, 200, 200));
  setMaxScale();
  window.onresize = setMaxScale;

  Object.entries(sortList).forEach(([name, sort]) => 
    demoList.addDemo(name, sort)
  );

  demoList.initAll();
  demoList.initEach();
  demoList.startAll();
}

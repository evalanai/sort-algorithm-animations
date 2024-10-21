import { DemoList } from './demoList.js';
import { sortList } from './sort/sortList.js';

const demoList = new DemoList();
const desc = document.querySelector('#description');

function showDescription() {
  desc.innerHTML=demoList.thisDescription() ?? 'no document.';
  desc.hidden=false;
}

function setMaxScale() {
  document.querySelector('#canvas-scale-w-range' ).max = window.innerWidth;
  document.querySelector('#canvas-scale-w-number').max = window.innerWidth;

  document.querySelector('#canvas-scale-h-range' ).max = window.innerHeight;
  document.querySelector('#canvas-scale-h-number').max = window.innerHeight;
} 


window.addEventListener('load', () => {
  document.querySelector('#draw-each').addEventListener('change', demoList.startEach.bind(demoList));
  document.querySelector('#draw-tile').addEventListener('change', demoList.startAll.bind(demoList, 200, 200));
  document.querySelector('#reset').addEventListener('click', demoList.restart.bind(demoList));
  const changeSpeed = (e) => demoList.setSleepTime(+e.target.value);
  document.querySelector('#sort-speed-number').addEventListener('change', changeSpeed);
  document.querySelector('#sort-speed-range' ).addEventListener('input', changeSpeed);

  setMaxScale();
  window.addEventListener('resize', setMaxScale);

  Object.entries(sortList).forEach(([name, sort]) => 
    demoList.addDemo(name, sort)
  );

  demoList.initAll();
  demoList.initEach();
  demoList.startAll(200, 200);
});

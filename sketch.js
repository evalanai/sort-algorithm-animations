import { DemoList } from './demoList.js';
import { sortList } from './sort/sortList.js';

// 本当はconstにしたいのですがp5ライブラリの都合上…
let demoList;
const desc = document.querySelector('#description');

function showDescription() {
  desc.innerHTML=demoList.thisDescription() ?? 'no document.';
  desc.hidden=false;
}

window.onload = () => {

  demoList = new DemoList();
  Object.entries(sortList).forEach(([name, sort]) => 
    demoList.addDemo(name, sort)
  );
  
  demoList.startAll(200, 200);
}
/*
window.draw = () => {
  background(220);
  showDescription();
  demoList.eachDraw();
}
*/

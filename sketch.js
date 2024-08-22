import { DemoList } from './demo.js';
import { sortList } from './sort/sortList.js';

// 本当はconstにしたいのですがp5ライブラリの都合上…
let demoList;
const desc = document.querySelector('#description');

function showDesctiption() {
  desc.innerHTML=demoList.thisDescription();
  desc.hidden=false;
}

window.setup = () => {
  createCanvas(400, 400);
  
  //document.querySelector('main>canvas').addEventListener('click', showDescription);
  
  demoList = new DemoList();
  Object.entries(sortList).forEach(([name, sort]) => 
    demoList.addDemo(name, sort)
  );
  demoList.start();
}

window.draw = () => {
  background(220);
  demoList.eachDraw();
}

import { DemoList } from './demoList.js';
import { sortList } from './sort/sortList.js';

const demoList = new DemoList();
const desc = document.querySelector('#description');

function showDescription() {
  desc.innerHTML=demoList.thisDescription() ?? 'no document.';
  desc.hidden=false;
}

window.onload = () => {
  Object.entries(sortList).forEach(([name, sort]) => 
    demoList.addDemo(name, sort)
  );
  
  demoList.startEach();
}

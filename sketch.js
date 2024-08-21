// 本当はconstにしたいのですがp5ライブラリの都合上…
let demoList;
const desc = document.querySelector('#description');

function setup() {
  createCanvas(400, 400);
  demoList = new DemoList();
  Object.entries(sortList).forEach(([name, sort]) => 
    demoList.addDemo(name, sort)
  );
  demoList.start();
}

function draw() {
  background(220);
  demoList.eachDraw();
}

function mouseClicked() {
  desc.innerHTML=demoList.thisDescription();
  desc.hidden=false;
}

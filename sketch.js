import { DemoList } from './demoList.js';
import { sortList } from './sort/sortList.js';

const demoList = new DemoList();

function setMaxScale() {
  document.querySelector('#canvas-scale-w-range' ).max = window.innerWidth;
  document.querySelector('#canvas-scale-w-number').max = window.innerWidth;

  document.querySelector('#canvas-scale-h-range' ).max = window.innerHeight;
  document.querySelector('#canvas-scale-h-number').max = window.innerHeight;
} 


window.addEventListener('load', () => {
  const desc = document.querySelector('#description');
  const info = document.querySelector('#info');
  const sortChoice = document.querySelector('#sort-choice');
  const main = document.querySelector('main');
  const changeSpeed = (e) => demoList.setSleepTime(+e.target.value);

  document.querySelector('#draw-each').addEventListener('change', () => {
    demoList.startEach();
    main.dataset.drawMode = "each";
    sortChoice.hidden = false;
    info.classList.add('hidden');
    sortChoice.classList.remove('hidden');
    desc.classList.remove('hidden');
  });
  document.querySelector('#draw-tile').addEventListener('change', () => {
    demoList.startAll(200, 200);
    main.dataset.drawMode = "all";
    sortChoice.hidden = true;
    sortChoice.classList.add('hidden');
    desc.classList.add('hidden');
  });
  document.querySelector('#reset').addEventListener('click', demoList.restart.bind(demoList));

  document.querySelector('#sort-speed-number').addEventListener('change', changeSpeed);
  document.querySelector('#sort-speed-range' ).addEventListener('input', changeSpeed);

  setMaxScale();
  window.addEventListener('resize', setMaxScale);

  Object.entries(sortList).forEach(([name, sort]) => {
    const radio = document.createElement('input');
    radio.type  = 'radio';
    radio.name  = 'sort-select';
    radio.id    = name;
    radio.value = name;

    const label     = document.createElement('label');
    label.innerText = name;
    label.htmlFor   = name;

    const div = document.createElement('div');
    div.appendChild(radio);
    div.appendChild(label);
    sortChoice.appendChild(div);

    demoList.addDemo(name, sort);
  });

  demoList.initAll();
  demoList.initEach();
  demoList.startAll(200, 200);
});

'use strict';

window.addEventListener('load', () => {
  function createConstrain(rangeInput, numberInput) {
    rangeInput .addEventListener('input', e =>
      numberInput.value=e.target.value
    );

    numberInput.addEventListener('change', e =>
      rangeInput.value=e.target.value
    );
  }
  const nRange = document.querySelector('#target-n-range');
  const nNumber = document.querySelector('#target-n-number');

  createConstrain(nRange, nNumber);

  const more = document.querySelector('#show-more');
  const moreOptions = document.querySelector('#more-options');
  more.addEventListener('click', () => {
    moreOptions.hidden = !moreOptions.hidden;
    more.classList.toggle('more-open');
  });

  const drawEach = document.querySelector('#draw-each');
  const targetN = document.querySelector('#target-n');
  document.querySelector('#draw-style').addEventListener('change', e => {
    targetN.disabled = e.target !== drawEach && e.target.checked;
  });
});

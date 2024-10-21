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


  const nRange      = document.querySelector('#target-n-range');
  const nNumber     = document.querySelector('#target-n-number');
  const speedRange  = document.querySelector('#sort-speed-range');
  const speedNumber = document.querySelector('#sort-speed-number');

  const more = document.querySelector('#show-more');
  const moreOptions = document.querySelector('#more-options');
  const drawEach = document.querySelector('#draw-each');
  const targetN = document.querySelector('#target-n');

  createConstrain(nRange    , nNumber);
  createConstrain(speedRange, speedNumber);

  more.addEventListener('click', () => {
    moreOptions.classList.toggle('hidden');
    more.classList.toggle('more-open');
  });

  document.querySelector('#draw-style').addEventListener('change', e => {
    targetN.disabled = e.target !== drawEach && e.target.checked;
  });
});

function createTargetWithVisualizer(xBegin, yBegin, width, height, n) {
  const render = new Render(xBegin, yBegin, width, height);
  const tg     = new SortTarget(n);

  tg.setRender(render);
  render.setTarget(tg);

  return {render, target: tg};
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}
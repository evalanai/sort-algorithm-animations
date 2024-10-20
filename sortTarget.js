import { Bar } from './bar.js';
import { shuffle } from './util.js';

export class SortTarget {  // 並べ替え対象
  #numbers;
  #render;
  #isSorted;

  constructor(length) {
    this.#numbers = shuffle([...Array(length)].map((itm, idx) => new Bar(idx+1)));
    this.#isSorted = false;
  }

  setRender(render) {
    this.#render = render;
  }

  changeLength(n) {
    this.#numbers = shuffle([...Array(n)].map((itm, idx) => new Bar(idx+1)));
  }

  get length() {
    return this.#numbers.length;
  }

  get values() {
    return this.#numbers.map(i => i.value);
  }

  get bars() {
    return this.#numbers;
  }

  get isSorted() {
    return this.#isSorted;
  }

  set(index, value) {
    this.#numbers[index] = new Bar(value);
  }

  at(...indexes) {  // なんぼでも同時に取ってこれるように
    this.#render.highlightSelect(...indexes);
    if (indexes.length === 1) return this.#numbers[indexes[0]]?.value;
    return indexes.map(index => this.#numbers[index]?.value);
  }

  barAt(index) {
    return this.#numbers[index];
  }

  between(beg, end) { // beg <= index <= endの範囲の値
    this.#render.highlightRange(beg, end);
    return this.#numbers.slice(beg, end+1).map(i => i.value);
  }

  swap(index1, index2) {
    const temp = this.#numbers[index1];

    this.#numbers[index1] = this.#numbers[index2];
    this.#numbers[index2] = temp;
  }

  done() {
    this.#render.done();
    this.#isSorted = true;
  }

  shuffle() {
    shuffle(this.#numbers, true);
    this.#isSorted = false;
  }

  createMark(name, color, withText=false) {
    this.#render.createMark(name, color, withText);
  }

  markIndex(idx, name) {  // 見た目用 色を付ける
    this.#render.addMark(idx, name);
  }

  unmarkIndex(idx, name) {
    this.#render.removeMark(idx, name);
  }
}

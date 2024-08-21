class Bar {
  #value;  // 棒が表す数値
  #marks;
  
  constructor(value) {
    this.#value = value;
    this.#marks = new Set();
  }

  get value() {
    return this.#value;
  }

  get marks() {
    return this.#marks.values();
  }

  addMark(name) {
    this.#marks.add(name);
  }

  clearMark() {
    this.#marks.clear();
  }

  has(name) {
    return this.#marks.has(name);
  }
}

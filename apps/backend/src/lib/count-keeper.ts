export class CountKeeper {
  completed = 0;

  public increment() {
    this.completed++;
  }

  public get() {
    return this.completed;
  }
}

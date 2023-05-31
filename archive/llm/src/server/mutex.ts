import invariant from 'tiny-invariant';

export default class Mutex {
  private queue: (() => void)[] = [];
  private isLocked = false;

  lock() {
    return new Promise<void>(resolve => {
      if (this.isLocked) {
        console.log("Mutex locked, adding to queue")
        this.queue.push(resolve);
      } else {
        console.log("Locking mutex")
        this.isLocked = true;
        resolve();
      }
    });
  }

  unlock() {
    if (this.queue.length > 0) {
      console.log("Unlocking mutex, running next in queue")
      const next = this.queue.shift();
      invariant(next);
      next();
    } else {
      this.isLocked = false;
    }
  }
}

import invariant from 'tiny-invariant';

export default class Mutex {
  private queue: (() => void)[] = [];
  private isLocked = false;

  lock() {
    return new Promise<void>(resolve => {
      if (this.isLocked) {
        console.log("[mutex] Mutex locked, adding to queue")
        this.queue.push(resolve);
      } else {
        console.log("[mutex] Locking mutex")
        this.isLocked = true;
        resolve();
      }
    });
  }

  unlock() {
    if (this.queue.length > 0) {
      console.log("[mutex] Unlocking mutex, running next in queue")
      const next = this.queue.shift();
      invariant(next);
      next();
    } else {
      console.log("[mutex] Unlocking mutex")
      this.isLocked = false;
    }
  }

  async run<T>(fn: () => Promise<T>) {
    await this.lock();
    try {
      return await fn();
    } finally {
      this.unlock();
    }
  }
}

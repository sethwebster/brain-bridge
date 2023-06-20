import invariant from 'tiny-invariant';

interface MutexOptions {
  name?: string;
  logging?: boolean;
}

export default class Mutex {
  private queue: (() => void)[] = [];
  private isLocked = false;

  constructor(private options: MutexOptions = {}) {
    this.options = {
      ...{
        name: "mutex",
        logging: false
      }, ...options
    }
  }

  lock() {
    return new Promise<void>(resolve => {
      if (this.isLocked) {
        this.log("Mutex locked, adding to queue")
        this.queue.push(resolve);
      } else {
        this.log("Locking mutex")
        this.isLocked = true;
        resolve();
      }
    });
  }

  unlock() {
    if (this.queue.length > 0) {
      this.log("Unlocking mutex, running next in queue")
      const next = this.queue.shift();
      invariant(next);
      next();
    } else {
      this.log("Unlocking mutex")
      this.isLocked = false;
    }
  }

  async run<T>(fn: () => T | Promise<T>) {
    await this.lock();
    try {
      return await fn();
    } finally {
      this.unlock();
    }
  }

  private log(str: string) {
    if (this.options.logging) {
      const nameStr = this.options.name ? `[${this.options.name}]` : "";
      console.log(`[mutex]${nameStr}: ${str}`);
    }
  }
}

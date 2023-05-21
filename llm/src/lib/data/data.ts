import { RedisClientType } from "redis";

import redis from "redis";
import invariant from "tiny-invariant";

interface RedisClient<T> {
  set(key: string, value: T): Promise<void>;
  get(key: string): Promise<T | undefined>;
  del(key: string): Promise<void>;
  keys(pattern?: string): Promise<string[]>;
  scan(cursor: number, match?: string, count?: number): Promise<{ cursor: number; keys: string[] }>;
}

class RedisClientImpl<T> implements RedisClient<T> {
  private client: RedisClientType;

  constructor(redisClient: RedisClientType) {
    this.client = redisClient;
  }

  async set(key: string, value: T) {
    await this.client.set(key, JSON.stringify(value));
  }

  async get(key: string): Promise<T | undefined> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : undefined;
  }

  async del(key: string) {
    await this.client.del(key);
  }

  async keys(pattern?: string): Promise<string[]> {
    invariant(pattern, "Pattern must be defined")
    const keys = await this.client.keys(pattern);
    return keys;
  }

  async scan(cursor: number, match?: string, count?: number): Promise<{ cursor: number; keys: string[] }> {
    let hasMoreKeys = true;
    let keys: string[] = [];
    while (hasMoreKeys) {
      const response = await this.client.scan(cursor, { MATCH: match, COUNT:  count });
      keys = keys.concat(response.keys);
      cursor = response.cursor;
      hasMoreKeys = response.cursor !== 0;
    }
    return {
      cursor,
      keys,
    };
  }
}


class DataManager {
  redisClient: RedisClientType

  constructor(redisClient: RedisClientType) {
    this.redisClient = redisClient;
  }


}
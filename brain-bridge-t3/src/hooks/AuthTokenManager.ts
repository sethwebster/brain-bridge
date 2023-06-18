import ms from 'ms';
import DataClient from "~/utils/data-client";
import Mutex from "~/lib/mutex";
import generateId from "~/utils/generate-id";

export class AuthTokenManager {
  private _id = generateId();
  private _token: string | null = null;
  private _tokenExpiration: number | null = null;
  private interval: NodeJS.Timeout | null = null;
  private authTokenSubscribers = new Set<(token: string | null) => void>();
  private _refreshingToken = false;
  private _REFRESH_TIME = ms("5m");
  private _mutex: Mutex;
  private _statusMutex = new Mutex({ name: 'AuthTokenManager status ' + this._id, logging: true });
  constructor() {
    this._mutex = new Mutex({ name: 'AuthTokenManager ' + this._id, logging: true });
    this.refreshTokenIfNecessary();
    this.interval = setInterval(() => this.refreshTokenIfNecessary.bind(this), this._REFRESH_TIME);
  }

  get tokenIsValid() {
    return !!(this._token && this._tokenExpiration && Date.now() < this._tokenExpiration);
  }

  get token() {
    if (!this.tokenIsValid) {
      this.refreshTokenIfNecessary();
      return null;
    }
    return this._token;
  }

  public subscribeToAuthToken(callback: (token: string | null) => void) {
    this.authTokenSubscribers.add(callback);
    return () => {
      this.authTokenSubscribers.delete(callback);
    };
  }

  private refreshTokenIfNecessary() {
    this._statusMutex.run(() => {
      if (!this.tokenIsValid) {
        this.getToken().catch(console.error);
      }
    }).catch(console.error);
  }

  private async getToken(): Promise<string | null> {
    const abortController = new AbortController();
    abortController.signal.addEventListener('abort', () => {
      console.log("Aborting token fetch", this._id)
    });
    const task = (async () => {
      if (this.tokenIsValid && this._token) {
        console.log("Token is valid, returning without a fetch");
        return this._token;
      } else {
        console.log("Token is invalid, fetching new token", this.tokenIsValid, this._token);
      }
      const abortInterval = setTimeout(() => {
        abortController.abort();
      }, ms("3s"));
      console.log("Refreshing token");
      this._refreshingToken = true;
      console.log("Getting new token");
      let result: { token: string | null } | null = null;
      result = await isomorphicGenerateToken(result);
      this._token = result.token;
      this._tokenExpiration = Date.now() + ms("1m");
      this.authTokenSubscribers.forEach((callback) => {
        callback(this._token);
      });
      this._refreshingToken = false;
      clearTimeout(abortInterval);
      console.log("Got new token", this._token);
      return result.token;
    });
    task.bind(this);
    const id = generateId();
    console.log("Running task", id, this._id, new Date().toISOString());
    const result = await this._mutex.run(task);
    console.log("Completed", id, this._id, new Date().toISOString())
    return result;
  }
}
async function isomorphicGenerateToken(result: { token: string | null; } | null) {
  if (typeof window !== 'undefined') {
    result = await DataClient.getToken();

  } else {
    const { getServerSession } = await import('~/server/auth');
    const { createJwt } = await import('~/lib/jwt');
    const session = await getServerSession();
    if (!session) throw new Error("No session");
    result = { token: createJwt(session.user) };
  }
  return result;
}


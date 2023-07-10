import ms from 'ms';
import DataClient from "@/utils/data-client";
import Mutex from "@/lib/mutex";
import generateId from "@/utils/generate-id";
import Logger from '@/lib/logger';

export class AuthTokenManager {
  private _id = generateId();
  private _token: string | null = null;
  private _tokenExpiration: number | null = null;
  private interval: NodeJS.Timeout | null = null;
  private authTokenSubscribers = new Set<(token: string | null) => void>();
  private _refreshingToken = false;
  private _REFRESH_TIME = ms("5m");
  private _mutex: Mutex;
  private _statusMutex = new Mutex({ name: 'AuthTokenManager status ' + this._id, logging: false });
  constructor() {
    this._mutex = new Mutex({ name: 'AuthTokenManager ' + this._id, logging: false });
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

  private async getToken(): Promise<void> {
    const abortController = new AbortController();
    abortController.signal.addEventListener('abort', () => {
      Logger.warn("Aborting token fetch", this._id)
    });
    const task = (async () => {
      if (this.tokenIsValid && this._token) {
        // Already have a valid token
        return this._token;
      }
      // Timeout if we don't get a response in 3 seconds
      const abortInterval = setTimeout(() => {
        abortController.abort();
      }, ms("3s"));

      // Flag that a fetch has started
      this._refreshingToken = true;

      // Fetch the token
      let result: { token: string | null } | null = null;
      result = await isomorphicGenerateToken(result);
      if (result) {
        this._token = result.token;
        this._tokenExpiration = Date.now() + ms("1m");

        // Dispatch the token to all subscribers
        // Logger.info("Notifying", this.authTokenSubscribers.size, "subscribers")
        this.authTokenSubscribers.forEach((callback) => {
          callback(this._token);
        });

        // Flag that the fetch has finished
        this._refreshingToken = false;

        // Abandon the abort timeout
        clearTimeout(abortInterval);
        return result.token;
      }
      else {
        return null;
      }
    });
    task.bind(this);
    await this._mutex.run(task);
  }
}
async function isomorphicGenerateToken(result: { token: string | null; } | null) {
  if (typeof window !== 'undefined') {
    result = await DataClient.getToken();

  } else {
    try {
      const { getServerSession } = await import('@/server/auth');
      const { createJwt } = await import('@/lib/jwt');
      const session = await getServerSession();
      if (!session) throw new Error("No session");
      result = { token: createJwt(session.user) };
    } catch (e) {
      Logger.error("Error getting server side token", e)
    }
  }
  return result;
}

const defaultTokenManager = new AuthTokenManager();
export default defaultTokenManager;
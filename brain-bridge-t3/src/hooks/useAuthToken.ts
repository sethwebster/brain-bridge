import { use, useEffect, useState } from "react";
import ms from 'ms';
import DataClient from "~/utils/data-client";

class AuthTokenManager {
  private _token: string | null = null;
  private _tokenExpiration: number | null = null;
  private interval: NodeJS.Timeout | null = null;
  private authTokenSubscribers = new Set<(token: string | null) => void>();
  private _refreshingToken = false;

  constructor() {
    this.refreshTokenIfNecessary();
    this.interval = setInterval(() => this.refreshTokenIfNecessary.bind(this), ms("1m"));
  }

  get tokenIsValid() {
    return this._token && this._tokenExpiration && Date.now() < this._tokenExpiration;
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
    console.log("Refreshing token if necessary")
    if (!this.tokenIsValid) {
      this.getToken().catch(console.error);
    }
  }

  private async getToken() {
    if (this.tokenIsValid) this._token;
    if (this._refreshingToken) {
      return new Promise<string | null>((resolve) => {
        const interval = setInterval(() => {
          if (this.tokenIsValid) {
            clearInterval(interval);
            resolve(this._token);
          }
        }, 100);
      });
    }
    const result = await DataClient.getToken();
    this._token = result.token;
    this._tokenExpiration = Date.now() + ms("1m");
    this.authTokenSubscribers.forEach((callback) => {
      callback(this._token)
    });
    this._refreshingToken = false;
    return result.token;
  }
}

const authTokenManager = new AuthTokenManager();

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(authTokenManager.token);

  useEffect(() => {
    const unsubscribe = authTokenManager.subscribeToAuthToken((token) => {
      setToken(token);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return { token };
}

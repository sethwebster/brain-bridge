import { useCallback, useEffect, useState } from "react";
import { AuthTokenManager } from "./AuthTokenManager";

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

  const isTokenValid = useCallback(() => {
    if (!token) return false;
    return authTokenManager.tokenIsValid;
  }, [token]);

  return {
    token, isTokenValid
  };
}

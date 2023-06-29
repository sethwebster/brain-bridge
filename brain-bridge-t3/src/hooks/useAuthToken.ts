import { useCallback, useEffect, useState } from "react";
import defaultTokenManager from "./AuthTokenManager";

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(defaultTokenManager.token);
  useEffect(() => {
    const unsubscribe = defaultTokenManager.subscribeToAuthToken((token) => {
      setToken(token);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  const isTokenValid = useCallback(() => {
    if (!token) return false;
    return defaultTokenManager.tokenIsValid;
  }, [token]);

  // Logger.info("useAuthToken", token, isTokenValid())
  return {
    token, isTokenValid
  };
}

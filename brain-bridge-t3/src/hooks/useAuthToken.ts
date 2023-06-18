import { useCallback, useEffect, useState } from "react";
import { AuthTokenManager } from "./AuthTokenManager";
import { verifyJWT } from "~/lib/jwt";

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
    const result = verifyJWT(token);
    return !!result;

  }, [token]);

  return {
    token, isTokenValid
  };
}

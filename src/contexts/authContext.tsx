"use client";

import { createContext, useContext, useState, useMemo, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

type AuthTokens = {
  token: string;
} | null;

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

export const AuthContext = createContext({
    login: (authTokens: AuthTokens) => {},
    logout: () => {},
    isLoggedIn: false,
    authTokens: null as AuthTokens,
  });

  export default function AuthContextProvider({
    children,
  }: {
    children: ReactNode;
  }) {
    const router = useRouter();
    const authTokensInLocalStorage = typeof window !== "undefined"
      ? window.localStorage.getItem(AUTH_TOKENS_KEY)
      : null;
  
    const [authTokens, setAuthTokens] = useState<AuthTokens>(
      authTokensInLocalStorage ? JSON.parse(authTokensInLocalStorage) : null
    );

    const login = useCallback((token: AuthTokens) => {
        if (!token) return;
        window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(token));
        setAuthTokens(token);
      }, []);

      const logout = useCallback(() => {
        window.localStorage.removeItem(AUTH_TOKENS_KEY);
        setAuthTokens(null);
        router.push("/login");
      }, [router]);

      const value = useMemo(
        () => ({
          login,
          logout,
          authTokens,
          isLoggedIn: authTokens !== null,
        }),
        [authTokens, login, logout]
      );
     
      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }
    
    export function useAuthContext() {
      return useContext(AuthContext);
}
"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type AuthTokens = {
  token: string;
} | null;

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

interface AuthContextType {
  login: (authTokens: AuthTokens) => void;
  logout: () => void;
  isLoggedIn: boolean;
  authTokens: AuthTokens;
  userId: string | null;
  userName: string | null;
  avatar: string | null;
  isPremium: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  authTokens: null,
  userId: null,
  userName: null,
  avatar: null,
  isPremium: false,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const authTokensInLocalStorage =
    typeof window !== "undefined"
      ? window.localStorage.getItem(AUTH_TOKENS_KEY)
      : null;

  const [authTokens, setAuthTokens] = useState<AuthTokens>(
    authTokensInLocalStorage ? JSON.parse(authTokensInLocalStorage) : null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  const login = useCallback((token: AuthTokens) => {
    if (!token) return;

    window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(token));
    setAuthTokens(token);

    const decodedToken: any = jwtDecode(token.token);
    setUserId(decodedToken.sub || null);
    setUserName(decodedToken.name || null);
    setAvatar(decodedToken.avatar || null);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKENS_KEY);
    setAuthTokens(null);
    setUserId(null);
    setUserName(null);
    setAvatar(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const profileComplete = queryParams.get("profileComplete") === "true";

    if (token) {
      login({ token });

      const cleanURL = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanURL);

      if (profileComplete) {
        router.push("/");
      } else {
        router.push("/completeprofile");
      }
    } else {
      setLoading(false);
    }
  }, [login, router]);

  useEffect(() => {
    if (authTokens) {
      const decodedToken: any = jwtDecode(authTokens.token);
      setUserId(decodedToken.sub || null);
      setUserName(decodedToken.name || null);
      setAvatar(decodedToken.avatar || null);
      setIsPremium(decodedToken.isPremium || false);
      setLoading(false);
    }
  }, [authTokens]);

  const value = useMemo(
    () => ({
      login,
      logout,
      authTokens,
      isLoggedIn: authTokens !== null,
      userId,
      userName,
      avatar,
      isPremium,
    }),
    [authTokens, login, logout, userId, userName, avatar, isPremium]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

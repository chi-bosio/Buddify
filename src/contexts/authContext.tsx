"use client";

import { createContext, useContext, useState, useMemo, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";// Corrige el nombre de la importación
import axios from "axios";

type AuthTokens = {
  token: string;
} | null;

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

export const AuthContext = createContext({
    login: (authTokens: AuthTokens) => {},
    logout: () => {},
    isLoggedIn: false,
    authTokens: null as AuthTokens,
    userId: null as string | null,  // Añade userId al contexto
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

  console.log("Token en localStorage al iniciar el contexto:", authTokensInLocalStorage);

  const [authTokens, setAuthTokens] = useState<AuthTokens>(
    authTokensInLocalStorage ? JSON.parse(authTokensInLocalStorage) : null
  );

  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((token: AuthTokens) => {
    if (!token) return;
    console.log("Token almacenado en login:", token);
    window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(token));
    setAuthTokens(token);

    // Decodificar el token para obtener el userId
    const decodedToken: any = jwtDecode(token.token);
    setUserId(decodedToken.sub);  // Aquí 'sub' es el id del usuario
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKENS_KEY);
    setAuthTokens(null);
    setUserId(null);  // Asegúrate de resetear userId
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const profileComplete = queryParams.get('profileComplete') === 'true';

    console.log("Token recibido desde la URL:", token);
    console.log("Estado de profileComplete:", profileComplete);

    if (token) {
      // Si hay un token, lo guardamos en el contexto y redirigimos
      login({ token });

      if (profileComplete) {
        router.push("/activities");
      } else {
        router.push("/completeprofile");
      }
    }
  }, [login, router]);

  const value = useMemo(() => {
    console.log("AuthTokens actuales:", authTokens);
    console.log("User ID actual:", userId); // Verifica el ID del usuario
    return {
      login,
      logout,
      authTokens,
      isLoggedIn: authTokens !== null,
      userId,  // Aquí pasas el userId al contexto
    };
  }, [authTokens, login, logout, userId]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

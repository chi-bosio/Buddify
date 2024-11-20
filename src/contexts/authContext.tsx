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

type AuthTokens = {
  token: string;
} | null;

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

interface AuthContextType {
  login: (authTokens: AuthTokens) => void;
  logout: () => void;
  isLoggedIn: boolean;
  authTokens: AuthTokens;
  userId: string | null; // Aseguramos que el tipo incluya userId
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  authTokens: null,
  userId: null, // Valor predeterminado para userId
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

  // Efecto para leer y rehidratar el userId al cargar la página
  useEffect(() => {
    if (authTokens) {
      const decoded = JSON.parse(atob(authTokens.token.split(".")[1]));
      const extractedUserId = decoded.sub; // Usamos 'sub' como userId
      console.log("User ID extraído del token:", extractedUserId);

      if (extractedUserId) {
        setUserId(extractedUserId); // Establecer el userId
      } else {
        console.error("No se encontró el userId en el token");
      }
    }
  }, [authTokens]);

  const login = useCallback((token: AuthTokens) => {
    if (!token) return;
    window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(token));
    setAuthTokens(token);

    const decoded = JSON.parse(atob(token.token.split(".")[1]));
    const extractedUserId = decoded.sub;
    console.log("User ID extraído del token:", extractedUserId);

    if (extractedUserId) {
      setUserId(extractedUserId); // Guardar el userId extraído
    } else {
      console.error("No se encontró userId en el token");
    }
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKENS_KEY);
    setAuthTokens(null);
    setUserId(null);
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      login,
      logout,
      authTokens,
      isLoggedIn: authTokens !== null,
      userId, // Exponer el userId en el contexto
    }),
    [authTokens, login, logout, userId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para consumir el contexto de autenticación
export function useAuthContext() {
  return useContext(AuthContext);
}

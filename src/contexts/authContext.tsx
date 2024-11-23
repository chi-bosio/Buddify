"use client";

import { createContext, useContext, useState, useMemo, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode"; // Corregimos el uso de jwt-decode

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
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  authTokens: null,
  userId: null,
  userName: null,
  avatar: null,
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
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

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

      // Limpiamos los parámetros de la URL
      const cleanURL = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanURL);

      if (profileComplete) {
        router.push("/");
      } else {
        router.push("/completeprofile");
      }
    } else {
      // Cuando no hay token, cargamos el estado inicial
      setLoading(false);
    }
  }, [login, router]);

  useEffect(() => {
    // Si ya existe un token almacenado, procesamos los datos del usuario
    if (authTokens) {
      const decodedToken: any = jwtDecode(authTokens.token);
      setUserId(decodedToken.sub || null);
      setUserName(decodedToken.name || null);
      setAvatar(decodedToken.avatar || null);
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
    }),
    [authTokens, login, logout, userId, userName, avatar]
  );

  // Retornamos una pantalla de carga si aún estamos inicializando
  if (loading) {
    return <div>Loading...</div>; // Puedes personalizar esto con un spinner o pantalla de carga
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}


/*"use client";

import { createContext, useContext, useState, useMemo, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";  // Corrige el nombre de la importación
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
  MI CODIGO DIN CAMBIOS
*/

/*"use client";
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
  userId: string | null; 
  userName: string | null; 
  avatar: string | null; 
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  authTokens: null,
  userId: null, 
  userName: null,
  avatar: null,
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

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const profileComplete = queryParams.get('profileComplete') === 'true';

    if (token) {
      setAuthTokens({token})
      // Si hay un token, lo guardamos en el contexto y redirigimos
      login({ token });
    }

    if (profileComplete) {
  
      if (authTokens) {
        const decoded = JSON.parse(atob(authTokens.token.split(".")[1]));
        const extractedUserId = decoded.sub; 
        const extractedUserName = decoded.name; 
        const extractedAvatar = decoded.avatar; 
  
        if (extractedUserId) {
          setUserId(extractedUserId); 
        } else {
          console.error("No se encontró el userId en el token");
        }
        if (extractedUserName) {
          setUserName(extractedUserName); 
        } else {
          console.error("No se encontró el userName en el token");
        }
        if (extractedAvatar) {
          setAvatar(extractedAvatar); 
        } else {
          console.error("No se encontró el avatar en el token");
        }
      }

      router.push("/");
    } else {
      if(authTokens){
        const decoded = JSON.parse(atob(authTokens.token.split(".")[1]));
        const extractedUserId = decoded.sub; 
        const extractedUserName = decoded.name;

        setUserId(extractedUserId); 
        setUserName(extractedUserName); 
        router.push("/completeprofile");
      }
    }

  }, [authTokens]);

  const login = useCallback((token: AuthTokens) => {
    if (!token) return;
    window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(token));
    setAuthTokens(token);

    const decoded = JSON.parse(atob(token.token.split(".")[1]));
    const extractedUserId = decoded.sub;
    const extractedUserName = decoded.name; 
    const extractedAvatar = decoded.avatar; 
    if (extractedUserId) {
      setUserId(extractedUserId); 
    } else {
      console.error("No se encontró userId en el token");
    }
    if (extractedUserName) {
      setUserName(extractedUserName); 
    } else {
      console.error("No se encontró userId en el token");
    }
    if (extractedAvatar) {
      setAvatar(extractedAvatar); 
    } else {
      console.error("No se encontró el avatar en el token");
    }
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKENS_KEY);
    setAuthTokens(null);
    setUserId(null);
    setUserName(null)
    setAvatar(null)
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      login,
      logout,
      authTokens,
      isLoggedIn: authTokens !== null,
      userId, 
      userName, 
      avatar,
    }),
    [authTokens, login, logout, userId, userName,avatar]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
VALEN CAMBIOS*/


/*"use client";
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
import { jwtDecode } from "jwt-decode";// Corrige el nombre de la importación
import axios from "axios";

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
  profileComplete: boolean | null;
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  authTokens: null,
  userId: null, 
  userName: null,
  avatar: null,
  profileComplete: null
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

 /* const login = useCallback((token: AuthTokens) => {
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

    if (token) {

      if (profileComplete) {

        if (authTokens) {
          const decoded = JSON.parse(atob(authTokens.token.split(".")[1]));
          const extractedUserId = decoded.sub; 
          const extractedUserName = decoded.name; 
          const extractedAvatar = decoded.avatar; 
          
          if (extractedUserId) {
            setUserId(extractedUserId); 
          } else {
            console.error("No se encontró el userId en el token");
          }
          if (extractedUserName) {
            setUserName(extractedUserName); 
          } else {
            console.error("No se encontró el userName en el token");
          }
          if (extractedAvatar) {
            setAvatar(extractedAvatar); 
          } else {
            console.error("No se encontró el avatar en el token");
          }
        }

        router.push("/activities");
      } else {
        setUserName()

        router.push("/completeprofile");
      }


  }, [authTokens]);


  const value = useMemo(() => {
    console.log("AuthTokens actuales:", authTokens);
    console.log("User ID actual:", userId); // Verifica el ID del usuario
    return {
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
  
  const login = useCallback((token: AuthTokens) => {
    if (!token) return;
    window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(token));
    setAuthTokens(token);
    
    const decoded = JSON.parse(atob(token.token.split(".")[1]));
    const extractedUserId = decoded.sub;
    const extractedUserName = decoded.name; 
    const extractedAvatar = decoded.avatar; 
    if (extractedUserId) {
      setUserId(extractedUserId); 
    } else {
      console.error("No se encontró userId en el token");
    }
    if (extractedUserName) {
      setUserName(extractedUserName); 
    } else {
      console.error("No se encontró userId en el token");
    }
    if (extractedAvatar) {
      setAvatar(extractedAvatar); 
    } else {
      console.error("No se encontró el avatar en el token");
    }
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKENS_KEY);
    setAuthTokens(null);
    setUserId(null);
    setUserName(null)
    setAvatar(null)
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      login,
      logout,
      authTokens,
      isLoggedIn: authTokens !== null,
      userId, 
      userName, 
      avatar,
    }),
    [authTokens, login, logout, userId, userName,avatar]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
*/
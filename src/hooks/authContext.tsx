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
const ISPREMIUM_KEY = "ISPREMIUM_KEY";
const AVATAR_KEY = "AVATAR_KEY";

interface AuthContextType {
  login: (authTokens: AuthTokens) => void;
  logout: () => void;
  isLoggedIn: boolean;
  authTokens: AuthTokens;
  userId: string | null;
  userName: string | null;
  avatar: string | null;
  isPremium: boolean;
  setterAvatar: (newAvatar:string) => void;
  setterIsPremiumTrue: () => void;
  setterIsPremiumFalse: () => void;
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
  setterIsPremiumTrue: () => {},
  setterIsPremiumFalse: () => {},
  setterAvatar: (newAvatar:string) => {if(false) console.log(newAvatar)},
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

  const isPremiunInLocalStorage =
    typeof window !== "undefined"
      ? window.localStorage.getItem(ISPREMIUM_KEY)
      : null;
  const AvatarInLocalStorage =
    typeof window !== "undefined"
      ? window.localStorage.getItem(AVATAR_KEY)
      : null;
  const [authTokens, setAuthTokens] = useState<AuthTokens>(
    authTokensInLocalStorage ? JSON.parse(authTokensInLocalStorage) : null
  );
  
  const [isPremium, setIsPremium] = useState<boolean>(
    isPremiunInLocalStorage ? JSON.parse(isPremiunInLocalStorage) : false
  );
  
  const [avatar, setAvatar] = useState<string | null>(
    AvatarInLocalStorage ? JSON.parse(AvatarInLocalStorage) : null
  );

  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  const login = useCallback((token: AuthTokens) => {
    if (!token) return;

    window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(token));
    setAuthTokens(token);

    const decodedToken: any = jwtDecode(token.token);
    setUserId(decodedToken.sub || null);
    setUserName(decodedToken.name || null);
    const avatarValue = decodedToken.avatar || null;
    window.localStorage.setItem(AVATAR_KEY, JSON.stringify(avatarValue));
    setAvatar(avatarValue);

    const isPremiumValue = decodedToken.isPremium == true;
    window.localStorage.setItem(ISPREMIUM_KEY, JSON.stringify(isPremiumValue));
    setIsPremium(isPremiumValue);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKENS_KEY);
    window.localStorage.removeItem(ISPREMIUM_KEY);
    window.localStorage.removeItem(AVATAR_KEY);
    setAuthTokens(null);
    setUserId(null);
    setUserName(null);
    setAvatar(null);
    setIsPremium(false);
    router.push("/login");
  }, [router]);

  const setterIsPremiumTrue = useCallback(() => {
    setIsPremium(true);
    window.localStorage.setItem(ISPREMIUM_KEY, JSON.stringify(true));
  }, []);

  const setterIsPremiumFalse = useCallback(() => {
    setIsPremium(false);
    window.localStorage.setItem(ISPREMIUM_KEY, JSON.stringify(false));
  }, []);
  const setterAvatar = useCallback((newAvatar:string)=>{
    setAvatar(newAvatar)
    window.localStorage.setItem(AVATAR_KEY, JSON.stringify(newAvatar)); 
  },[])
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
      setLoading(false);
    } 
  }, [authTokens, isPremium, logout, router]);

  const value = useMemo(
    () => ({
      login,
      logout,
      authTokens,
      setterAvatar,
      setterIsPremiumTrue,
      setterIsPremiumFalse,
      isLoggedIn: authTokens !== null,
      userId,
      userName,
      avatar,
      isPremium,
    }),
    [setterAvatar,login, logout, authTokens, setterIsPremiumTrue, setterIsPremiumFalse, userId, userName, avatar, isPremium]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
import { useState } from "react";
import { cinemaService } from "../services/cinemaService";
import { AuthContext } from "./useAuth";

const TOKEN_KEY = "cinelux_token";
const USER_KEY = "cinelux_user";
const REMEMBER_KEY = "cinelux_remember";

function readStoredSession() {
  const stores = [window.localStorage, window.sessionStorage];
  for (const store of stores) {
    try {
      const token = store.getItem(TOKEN_KEY);
      const rawUser = store.getItem(USER_KEY);
      if (token && rawUser) {
        return {
          token,
          user: JSON.parse(rawUser),
          remembered: store === window.localStorage,
        };
      }
    } catch {
      // Ignore malformed storage entries
    }
  }
  return { token: null, user: null, remembered: true };
}

function persistSession({ token, user }, rememberMe) {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.removeItem(USER_KEY);

  const targetStore = rememberMe
    ? window.localStorage
    : window.sessionStorage;
  targetStore.setItem(TOKEN_KEY, token);
  targetStore.setItem(USER_KEY, JSON.stringify(user));
  window.localStorage.setItem(REMEMBER_KEY, String(Boolean(rememberMe)));
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());

  const login = async ({ email, password, rememberMe = true }) => {
    const result = await cinemaService.login({ email, password });
    persistSession(result, rememberMe);
    setSession({
      token: result.token,
      user: result.user,
      remembered: rememberMe,
    });
    return result;
  };

  const register = async ({ name, email, password, phone, rememberMe = true }) => {
    const result = await cinemaService.register({
      name,
      email,
      password,
      phone,
    });
    persistSession(result, rememberMe);
    setSession({
      token: result.token,
      user: result.user,
      remembered: rememberMe,
    });
    return result;
  };

  const logout = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    setSession({ token: null, user: null, remembered: true });
  };

  const value = {
    user: session.user,
    token: session.token,
    role: session.user?.role || null,
    isAuthenticated: Boolean(session.user && session.token),
    remembered: session.remembered,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

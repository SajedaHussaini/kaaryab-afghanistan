"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { storageKeys } from "@/lib/constants";
import { readStorage, removeStorage, writeStorage } from "@/lib/storage";
import type { AppUser, UserRole } from "@/types/opportunity";
import type { ReactNode } from "react";

type AuthContextValue = {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (input: { name: string; email: string; role: UserRole }) => void;
  signOut: () => void;
};


const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const savedUser = readStorage<AppUser | null>(storageKeys.user, null);

  setUser(savedUser);
  setIsLoading(false);
}, []);

  const signIn = useCallback(
    (input: { name: string; email: string; role: UserRole }) => {
      const nextUser: AppUser = {
        id: input.email.toLowerCase(),
        name: input.name,
        email: input.email,
        role: input.role,
      };

      setUser(nextUser);
      writeStorage(storageKeys.user, nextUser);
    },
    [],
  );

  const signOut = useCallback(() => {
    setUser(null);
    removeStorage(storageKeys.user);
  }, []);

  const value = useMemo(
  () => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    signIn,
    signOut,
  }),
  [user, isLoading, signIn, signOut],
);


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}

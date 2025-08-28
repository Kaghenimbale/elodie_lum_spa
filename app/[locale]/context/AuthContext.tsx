// context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

interface AuthContextType {
  verified: boolean;
  setVerified: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  verified: false,
  setVerified: () => {},
  user: null,
  setUser: () => {},
  loading: true,
  setLoading: () => {},
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setVerified(!!currentUser?.emailVerified);

      if (currentUser?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        verified,
        setVerified,
        user,
        setUser,
        loading,
        setLoading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStatus = () => useContext(AuthContext);

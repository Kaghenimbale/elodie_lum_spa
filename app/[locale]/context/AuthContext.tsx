// context/AuthContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "firebase/auth";

interface AuthContextType {
  verified: boolean;
  setVerified: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  verified: false,
  setVerified: () => {},
  user: null,
  setUser: () => {},
  loading: true,
  setLoading: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{ verified, setVerified, user, setUser, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStatus = () => useContext(AuthContext);

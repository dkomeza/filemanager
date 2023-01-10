import React, { useContext, useEffect, useState } from "react";

interface User {
  username: string;
  publicKey: string;
}

interface AuthContextType {
  currentUser: User | undefined;
  signUp: (username: string, password: string) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: any }) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const value = {
    currentUser,
    signUp,
  };

  async function signUp(username: string, password: string) {
    console.log("Super");
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

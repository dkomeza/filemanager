import React, { useContext, useEffect, useState } from "react";

interface User {
  username: string;
  publicKey: string;
}

interface AuthContextType {
  currentUser: User | undefined;
  signUp: (username: string, password: string) => Promise<void>;
  logIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: any }) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const userString = localStorage.getItem("user");
      if (!userString) {
        console.log(userString);
        setLoading(false);
        return undefined;
      }
      const { username, publicKey } = JSON.parse(userString);
      try {
        setCurrentUser(await auth(username, publicKey));
      } catch (err: any) {
        console.log(err.message);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    signOut,
  };

  async function signUp(username: string, password: string) {
    const res = await fetch("https://filemanager.dawidkomeza.pl/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    setCurrentUser(data);
    saveCredentials(data);
  }

  async function logIn(username: string, password: string) {
    const res = await fetch("https://filemanager.dawidkomeza.pl/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error("Invalid username or password");
    }
    setCurrentUser(data);
    saveCredentials(data);
  }

  async function auth(username: string, publicKey: string) {
    const res = await fetch("https://filemanager.dawidkomeza.pl/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, publicKey: publicKey }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return { username: data.username, publicKey: data.publicKey };
  }

  function signOut() {
    setCurrentUser(undefined);
    localStorage.removeItem("user");
  }

  function saveCredentials(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

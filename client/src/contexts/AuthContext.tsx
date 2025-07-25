import { createContext, useEffect, useState } from "react";
import type { Auth, Children, UserPayload } from "../types/user";

export const AuthContext = createContext<null | Auth>(null);

export const AuthProvider = ({ children }: Children) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3310/api/refresh-token", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setIsLogged(true);
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setUser(data);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);
  return (
    <AuthContext
      value={{ isLogged, setIsLogged, user, setUser, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext>
  );
};

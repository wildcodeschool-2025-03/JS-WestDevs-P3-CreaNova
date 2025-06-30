import { createContext, useState } from "react";
import type { Auth, Children } from "../types/user";

export const AuthContext = createContext<null | Auth>(null);

export const AuthProvider = ({ children }: Children) => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <AuthContext value={{ isLogged, setIsLogged }}>{children}</AuthContext>
  );
};

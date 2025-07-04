import type { ReactNode } from "react";

export interface Children {
  children: ReactNode;
}
export interface UserPayload {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
}
export interface Auth {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  user: UserPayload | null;
  setUser: (value: UserPayload | null) => void;
}

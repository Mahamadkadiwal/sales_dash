export interface User {
  username: string;
  role: "user" | "admin";
}

export interface Users{
  id?: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}
import { createContext } from "react";

export const UserContext = createContext({
  username: "pseudo",
  email: "email@gmail.com",
  birthYear: 2000,
  avatar: "avatar.png",
});

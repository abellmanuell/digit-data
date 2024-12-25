import { createContext, useState } from "react";
export const TokenContext = createContext(localStorage.getItem("token"));
export const UserContext = createContext(null);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </TokenContext.Provider>
  );
};

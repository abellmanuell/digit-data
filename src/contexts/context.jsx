import React, { createContext, useState } from "react";
import userService from "../services/user.service";
export const TokenContext = createContext(null);
export const UserContext = createContext(null);
export const IsLoadingContext = createContext(null);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function startFetching() {
      setUser(null);
      if (token) {
        const getUserData = await userService.getUserData(token);
        if (!ignore) {
          setUser(getUserData);
          setIsLoading(false);
        }
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
          {children}
        </IsLoadingContext.Provider>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
};

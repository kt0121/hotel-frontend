import React, { useContext } from "react";
import { TokenContext } from "./token";
export type SetTokenContext = {
  setToken: (token: TokenContext["token"]) => void;
};

const defaultSetTokenContext: SetTokenContext = {
  setToken: (token: TokenContext["token"]) => {
    console.log("setTokenIsNotProvided");
  },
};

export const setTokenContext = React.createContext<SetTokenContext>(
  defaultSetTokenContext
);
export const useSetTokenContext = () => useContext(setTokenContext);

const SetTokenProvider: React.FC<{
  setToken: SetTokenContext["setToken"];
  children: React.ReactNode;
}> = React.memo(({ setToken, children }) => {
  return (
    <setTokenContext.Provider value={{ setToken }}>
      {children}
    </setTokenContext.Provider>
  );
});
export default SetTokenProvider;

SetTokenProvider.displayName = "SetTokenProvider";

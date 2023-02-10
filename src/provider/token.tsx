import React, { useContext } from "react";
export type TokenContext = {
  token: string | null;
};

const defaultTokenContext: TokenContext = {
  token: null,
};

export const tokenContext =
  React.createContext<TokenContext>(defaultTokenContext);
export const useTokenContext = () => useContext(tokenContext);

const TokenProvider: React.FC<{
  token: TokenContext["token"];
  children: React.ReactNode;
}> = React.memo(({ token, children }) => {
  return (
    <tokenContext.Provider value={{ token }}>{children}</tokenContext.Provider>
  );
});
export default TokenProvider;

TokenProvider.displayName = "TokenProvider";

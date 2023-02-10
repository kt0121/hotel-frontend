import React, { useContext } from "react";
export type ApiContext = {
  serverHost: string;
};

const defaultApiContext: ApiContext = {
  serverHost: "server-host-not-provided",
};

export const apiContext = React.createContext<ApiContext>(defaultApiContext);
export const useApiContext = () => useContext(apiContext);

const ApiProvider: React.FC<{
  serverHost: ApiContext["serverHost"];
  children: React.ReactNode;
}> = React.memo(({ serverHost, children }) => {
  return (
    <apiContext.Provider value={{ serverHost }}>{children}</apiContext.Provider>
  );
});
export default ApiProvider;

ApiProvider.displayName = "ApiProvider";

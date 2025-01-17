import * as React from "react";
import { useApiContext } from "provider/api";

export const useGetAPI = <T = any>(endpoint: string) => {
  const { serverHost } = useApiContext();
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean | null>(null);
  const [status, setStatus] = React.useState<number | null>(null);

  const get = (token: string, variables?: any) => {
    const headers = new Headers();
    headers.set("X-ACCESS-TOKEN", token!);
    const query = new URLSearchParams(variables);
    setLoading(true);
    fetch(`${serverHost}${endpoint}?${query}`, {
      method: "GET",
      mode: "cors",
      headers: headers,
    })
      .then((res) => {
        setStatus(res.status);
        return res.status === 200 ? res.json() : { data: {} };
      })
      .then((json) => {
        return setData(json);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  return [get, { data, loading, status }] as [
    typeof get,
    { data: T; loading: boolean; status: number | null }
  ];
};

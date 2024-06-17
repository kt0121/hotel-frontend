import * as React from "react";
import { useApiContext } from "provider/api";

export const usePostAPI = <T = any>(endpoint: string) => {
  const { serverHost } = useApiContext();
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<number | null>(null);

  const post = (token: string, body?: any) => {
    const headers = new Headers();
    headers.set("X-ACCESS-TOKEN", token!);
    headers.set("Content-Type", "application/json");
    setLoading(true);
    fetch(`${serverHost}${endpoint}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
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

  return [post, { data, loading, status }] as [
    typeof post,
    { data: T; loading: boolean; status: number | null }
  ];
};

import { Button, Form, Input } from "antd";
import { useGetAPI } from "hooks/useGetAPI";
import { useSetTokenContext } from "provider/setToken";
import { useTokenContext } from "provider/token";
import { useEffect, useState } from "react";
import { ResTokenCheck } from "types/response";

const { Search } = Input;
const TokenForm: React.FC = () => {
  const [uncheckedToken, setUncheckedToken] = useState<string | null>(null);
  const { token } = useTokenContext();
  const { setToken } = useSetTokenContext();
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
  const [
    getTokenCheck,
    { data, loading: isTokenCheckLoading, status: getTokenCheckStatus },
  ] = useGetAPI<ResTokenCheck>("/token-check");
  const onInputChange = (e: any) => {
    setUncheckedToken(e.target.value);
  };
  const onAccessClick = () => {
    getTokenCheck(uncheckedToken!);
  };

  useEffect(() => {
    if (uncheckedToken) {
      setIsTokenValid(
        Boolean(
          uncheckedToken.match(
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
          )
        )
      );
    }
  }, [uncheckedToken]);
  useEffect(() => {
    if (!isTokenCheckLoading) {
      if (getTokenCheckStatus === 200) {
        console.log("ok!");
        setToken(uncheckedToken);
      }
    }
  }, [getTokenCheckStatus, isTokenCheckLoading]);

  return (
    <>
      <Input id="access_token" onChange={onInputChange} />

      <Button
        type="primary"
        htmlType="submit"
        id="token_check"
        onClick={onAccessClick}
        disabled={Boolean(token) || !isTokenValid}
      >
        Submit
      </Button>
    </>
  );
};

export default TokenForm;

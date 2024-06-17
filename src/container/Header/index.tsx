import { Layout, Space } from "antd";
import TokenForm from "components/Header/TokenForm";
import { useGetAPI } from "hooks/useGetAPI";
import { useSetTokenContext } from "provider/setToken";
import { useTokenContext } from "provider/token";
import { useEffect, useState } from "react";
import { ResTokenCheck } from "types/response";
import { Style } from "types/style";

const { Header: AntdHeader } = Layout;
const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .split("")
    .map((c) => {
      switch (c) {
        case "x":
          return ((Math.random() * 16) | 0).toString(16);
        case "y":
          return (((Math.random() * 4) | 0) + 8).toString(16);
        default:
          return c;
      }
    })
    .join("");
};
const Header: React.FC = () => {
  const defaultToken = uuid();
  const [uncheckedToken, setUncheckedToken] = useState<string>(defaultToken);
  const { token } = useTokenContext();
  const { setToken } = useSetTokenContext();
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true);
  const [
    getTokenCheck,
    { loading: isTokenCheckLoading, status: getTokenCheckStatus },
  ] = useGetAPI<ResTokenCheck>("/token-check");
  const onInputChange = (e: any) => {
    setUncheckedToken(e.target.value);
  };
  const onAccessClick = () => {
    getTokenCheck(uncheckedToken!);
  };

  useEffect(() => {
    setIsTokenValid(
      Boolean(
        uncheckedToken.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        )
      )
    );
  }, [uncheckedToken]);
  useEffect(() => {
    if (!isTokenCheckLoading) {
      if (getTokenCheckStatus === 200) {
        setToken(uncheckedToken);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTokenCheckStatus, isTokenCheckLoading]);

  return (
    <AntdHeader style={style.header}>
      <TokenForm
        token={token}
        isTokenValid={isTokenValid}
        onAccessClick={onAccessClick}
        onInputChange={onInputChange}
        defaultToken={defaultToken}
      />
    </AntdHeader>
  );
};

export default Header;

const style: Style = {
  header: {
    width: "80vw",
    minWidth: "1000px",
    maxWidth: "1400px",
    margin: "0 auto",
    background: "#f5f5f5",
  },
};

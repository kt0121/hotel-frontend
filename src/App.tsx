import React, { useState } from "react";
import { Layout, Space } from "antd";

import "antd/dist/reset.css";

import "./App.css";
import { Style } from "./types/style";
import ApiProvider from "provider/api";
import TokenProvider, { TokenContext } from "provider/token";
import SetTokenProvider, { SetTokenContext } from "provider/setToken";
import TokenForm from "components/Header/TokenForm";
import Header from "container/Header";
import Content from "container/Content";

const { Header: AntdHeader, Content: AntdContent } = Layout;

const App = () => {
  const [token, setToken] = useState<TokenContext["token"]>(null);
  const setAppToken: SetTokenContext["setToken"] = (token) => {
    setToken(token);
  };
  return (
    <ApiProvider serverHost="https://track-challenge-api-labrat.herokuapp.com/hotel-reservation">
      <TokenProvider token={token}>
        <SetTokenProvider setToken={setAppToken}>
          <Layout style={style.layout}>
            <Header />
            <Content />
          </Layout>
        </SetTokenProvider>
      </TokenProvider>
    </ApiProvider>
  );
};

const style: Style = {
  layout: {
    textAlign: "center",
    width: "100vw",
    minHeight: "100vh",
  },
  content: {
    textAlign: "center",
    width: "80vw",
    minWidth: "1000px",
    maxWidth: "1400px",
    margin: "0 auto",
    height: "100%",
  },
};
export default App;

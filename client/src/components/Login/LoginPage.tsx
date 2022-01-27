import React from "react";
import { Register } from "../../lib/types";
import { Card, Layout, Typography } from "antd";
import loginLogo from "./assets/loginLogo.png";
import useApolloClient from "@apollo/client";

interface Props {
  setRegister: (register: Register) => void;
}

const { Content } = Layout;
const { Text, Title } = Typography;

export const LoginPage = ({ setRegister }: Props) => {
  const client = useApolloClient();
  const handleAuthrize;
  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            Log in to order!
          </Title>
          <Text>Sign in to start ordering!</Text>
        </div>

        <button className="log-in-card__logo-button">
          <img src={loginLogo} alt="Logo" className="log-in-card__logo-button-logo" />
          <span className="log-in-card__logo-button-text">Sign in</span>
        </button>
        <Text type="secondary">Note: By signing in, you'll be redirected to the Google consent form to sign in with your Google account.</Text>
      </Card>
    </Content>
  );
};

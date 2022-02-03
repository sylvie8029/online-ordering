import React, { useEffect, useRef } from "react";
import { Register } from "../../lib/types";
import { Card, Layout, Spin, Typography } from "antd";
import loginLogo from "./assets/loginLogo.png";
import { useApolloClient, useMutation } from "@apollo/client";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import { AUTH_URL } from "../../lib/graphql/queries";
import { LogIn as LogInData, LogInVariables } from "../../lib/graphql/mutations/LogIn/__generated__/LogIn";
import { LOG_IN } from "../../lib/graphql/mutations/LogIn";
import { ErrorBanner } from "../ErrorBanner";
import { displaySuccessNotification, displayErrorMessage } from "../../lib/utils";
import { Navigate } from "react-router-dom";

interface Props {
  setRegister: (register: Register) => void;
}

const { Content } = Layout;
const { Text, Title } = Typography;

export const LoginPage = ({ setRegister }: Props) => {
  const client = useApolloClient();

  const [logIn, { data: logInData, loading: logInLoading, error: logInError }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setRegister(data.logIn);
        displaySuccessNotification("You've successfully logged in!");
      }
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(`code:`, code);
    if (code) {
      logInRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);
  const handleAuthrize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });
      console.log(`data:`, data);
      window.location.href = data.authUrl;
    } catch {
      displayErrorMessage("Sorry! We weren't able to log you in. Please try again later!");
    }
  };
  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    );
  }
  if (logInData && logInData.logIn) {
    const { id: registerId } = logInData.logIn;
    return <Navigate to={`/user/${registerId}`} />;
  }
  const logInErrorBannerElement = logInError ? (
    <ErrorBanner description="We weren't able to log you in to order-online sys.. Please try again later." />
  ) : null;

  return (
    <Content className="log-in">
      {logInErrorBannerElement}
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

        <button className="log-in-card__logo-button" onClick={handleAuthrize}>
          <img src={loginLogo} alt="Logo" className="log-in-card__logo-button-logo" />
          <span className="log-in-card__logo-button-text">Sign in</span>
        </button>
        <Text type="secondary">Note: By signing in, you'll be redirected to the Google consent form to sign in with your Google account.</Text>
      </Card>
    </Content>
  );
};

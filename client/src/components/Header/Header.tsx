import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import logo from "./assets/appLogo.png";

const { Header } = Layout;

export const AppHeader = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-serch-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={logo} alt="App logo"></img>
          </Link>
        </div>
      </div>
    </Header>
  );
};

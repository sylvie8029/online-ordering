import React from "react";
import { Layout } from "antd";
import logo from "../assets/appLogo.png";

const { Header } = Layout;

export const SkeletonOfHeader = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <img src={logo} alt="App logo"></img>
        </div>
      </div>
    </Header>
  );
};

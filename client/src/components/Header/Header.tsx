import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import logo from "./assets/appLogo.png";
import { Register } from "../../lib/types";
import { MenuItems } from "./Menu/Menu";

const { Header } = Layout;
interface Props {
  register: Register;
}

export const AppHeader = ({ register }: Props) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-serch-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={logo} alt="App logo"></img>
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        {" "}
        <MenuItems register={register}></MenuItems>
      </div>
    </Header>
  );
};

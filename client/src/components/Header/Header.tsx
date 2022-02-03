import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import logo from "./assets/appLogo.png";
import { Register } from "../../lib/types";
import { MenuItems } from "./Menu/Menu";

interface Props {
  register: Register;
  setRegister: (register: Register) => void;
}
const { Header } = Layout;

export const AppHeader = ({ register, setRegister }: Props) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={logo} alt="App logo"></img>
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems register={register} setRegister={setRegister}></MenuItems>
      </div>
    </Header>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Avatar } from "antd";
import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Register } from "../../../lib/types";
import { useMutation } from "@apollo/client";
import { LOG_OUT } from "../../../lib/graphql/mutations/LogOut";
import { LogOut as LogOutData } from "../../../lib/graphql/mutations/LogOut/__generated__/LogOut";
import { displaySuccessNotification, displayErrorMessage } from "../../../lib/utils/index";

interface Props {
  register: Register;
  setRegister: (register: Register) => void;
}
const { Item, SubMenu } = Menu;

export const MenuItems = ({ register, setRegister }: Props) => {
  const [logout] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setRegister(data.logOut);
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: (data) => {
      displayErrorMessage("Sorry, you won't able to log out. Please try again later.");
    },
  });

  const handleLogOut = () => {
    logout();
  };
  const subMenuLogin =
    register.id && register.avatar ? (
      <SubMenu title={<Avatar src={register.avatar}></Avatar>}>
        <Item key="/user">
          <Link to={`/user/${register.id}`}></Link>
          <UserOutlined type="user" />
          Profile
        </Item>
        <Item key="logout">
          <LogoutOutlined type="user" />
          Log out
          <div onClick={handleLogOut}> Log out</div>
        </Item>
      </SubMenu>
    ) : (
      <Item>
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    );
  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/cooker">
        <Link to="/cooker">
          <HomeOutlined type="home" />
          Cooker
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};

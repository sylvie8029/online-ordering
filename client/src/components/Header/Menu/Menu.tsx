import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Avatar } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Register } from "../../../lib/types";
import { useMutation } from "@apollo/client";
import { LOG_OUT } from "../../../lib/graphql/mutations/LogOut";
import { LogOut as LogOutData } from "../../../lib/graphql/mutations/LogOut/__generated__/LogOut";

const { Item, SubMenu } = Menu;
interface Props {
  register: Register;
}

export const MenuItems = ({ register }: Props) => {
  const [logout] = useMutation<LogOutData>(LOG_OUT);

  const handleLogOut = () => {
    logout();
  };
  const subMenuLogin =
    register.id && register.avatar ? (
      <SubMenu title={<Avatar src={register.avatar}></Avatar>}>
        <Item key="/user">
          <Link to={`/user/${register.id}`}></Link>
          Profile
          <UserOutlined type="user" />
        </Item>
        <Item key="logout">
          profile
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
      <Item key="/host">
        <Link to="/host">
          <HomeOutlined type="home" />
          Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};

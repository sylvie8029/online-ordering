import { Card, Divider, Typography, Avatar, Button } from "antd";
import React, { Fragment } from "react";
import { User as UserData } from "../../../lib/graphql/queries/User/__generated__/User";

interface Props {
  user: UserData["user"];
  registerIsUser: boolean;
}

const { Paragraph, Text, Title } = Typography;

export const UserProfile = ({ user, registerIsUser }: Props) => {
  const additionalDetailSection = registerIsUser ? (
    <Fragment>
      <Divider></Divider>
      <div className="user-profile__details">
        <Title level={4}>More Details</Title>
        <Paragraph>Want to order or cook online? Register right now!</Paragraph>
        <Button type="primary" className="user-profile__details-cta">
          Go to Register
        </Button>
        <Paragraph type="secondary">Online Order use</Paragraph>
      </div>
    </Fragment>
  ) : null;
  return (
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="use-profile__avatar">
          <Avatar size={100} src={user.avatar}></Avatar>
        </div>
        <Divider></Divider>
        <div className="user-profile__details">
          <Title level={4}>Details</Title>
          <Paragraph>
            Name:<Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Contact:<Text strong>{user.contact}</Text>
          </Paragraph>
        </div>
        {additionalDetailSection}
      </Card>
    </div>
  );
};

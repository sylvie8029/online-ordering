import { useQuery } from "@apollo/client";
import React from "react";
import { UserVariables, User as UserData } from "../../lib/graphql/queries/User/__generated__/User";
import { USER } from "../../lib/graphql/queries";
import { Layout, Col, Row } from "antd";
import { useParams } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { Register } from "../../lib/types";
import { ErrorBanner } from "../ErrorBanner";
import { PageSkeleton } from "../PageSkeleton";

const { Content } = Layout;
interface Props {
  register: Register;
}
export const User = ({ register }: Props) => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, { variables: { id: id! } });

  // console.log(`id:`, id);
  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton></PageSkeleton>
      </Content>
    );
  }
  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="Sorry, this user may not exist."></ErrorBanner>
        <PageSkeleton></PageSkeleton>
      </Content>
    );
  }
  const user = data ? data.user : null;
  const registerIsUser = register.id === id;
  const userPropfileElement = user ? <UserProfile user={user} registerIsUser={registerIsUser}></UserProfile> : null;

  return (
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userPropfileElement}</Col>
      </Row>
    </Content>
  );
};

import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { UserVariables, User as UserData } from "../../lib/graphql/queries/User/__generated__/User";
import { USER } from "../../lib/graphql/queries";
import { Layout, Col, Row } from "antd";
import { useParams } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { Register } from "../../lib/types";
import { ErrorBanner } from "../ErrorBanner";
import { PageSkeleton } from "../PageSkeleton";
import { UserListings } from "./UserListings";
import { UserOrderings } from "./UserOrderings";

const { Content } = Layout;
interface Props {
  register: Register;
}

const PAGE_LIMIT = 4;
export const User = ({ register }: Props) => {
  const { id } = useParams();
  const [listingsPage, setListingsPage] = useState(1);
  const [orderingsPage, setOrderingsPage] = useState(1);
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: { id: id!, listingsPage, orderingsPage, limit: PAGE_LIMIT },
  });

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
  const userListings = user ? user.listings : null;
  const userOrderings = user ? user.orderings : null;

  const userProfileElement = user ? <UserProfile user={user} registerIsUser={registerIsUser}></UserProfile> : null;
  const userListingsElement = userListings ? (
    <UserListings userListings={userListings} listingsPage={listingsPage} limit={PAGE_LIMIT} setListingsPage={setListingsPage}></UserListings>
  ) : null;

  const userOrderingsElement = userOrderings ? (
    <UserOrderings userOrderings={userOrderings} orderingsPage={orderingsPage} limit={PAGE_LIMIT} setOrderingsPage={setOrderingsPage}></UserOrderings>
  ) : null;

  return (
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>
          {userListingsElement}
          {userOrderingsElement}
        </Col>
      </Row>
    </Content>
  );
};

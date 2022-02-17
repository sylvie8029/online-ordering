import React from "react";
import { List, Typography } from "antd";
import { ListingCard } from "../../../components/ListingCard";
import { User } from "../../../lib/graphql/queries/User/__generated__/User";

interface Props {
  userOrderings: User["user"]["orderings"];
  orderingsPage: number;
  limit: number;
  setOrderingsPage: (page: number) => void;
}

const { Paragraph, Title, Text } = Typography;

export const UserOrderings = ({ userOrderings, orderingsPage, limit, setOrderingsPage }: Props) => {
  const total = userOrderings ? userOrderings.total : null;
  const result = userOrderings ? userOrderings.result : null;

  const userOrderingsList = userOrderings ? (
    <List
      grid={{ gutter: 8, xs: 1, sm: 2, lg: 4 }}
      dataSource={result ? result : undefined}
      locale={{ emptyText: "No Orderings here" }}
      pagination={{
        position: "top",
        current: orderingsPage,
        total: total ? total : undefined,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setOrderingsPage(page),
      }}
      renderItem={(userOrdering) => {
        const orderingHistory = <div className="user-bookings__booking-history">ordering history here</div>;
        return (
          <List.Item>
            {orderingHistory}
            <ListingCard listing={userOrdering.listing}></ListingCard>
          </List.Item>
        );
      }}
    ></List>
  ) : null;

  const userOrderingsElement = userOrderingsList ? (
    <div className="user-bookings">
      <Title level={4} className="user-bookings__title">
        {" "}
        Orderings
      </Title>
      <Paragraph className="user-bookings__description"> This section is what the user orderings.</Paragraph>
      {userOrderingsList}
    </div>
  ) : null;

  return userOrderingsElement;
};

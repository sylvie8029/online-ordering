import React from "react";
import { List, Typography } from "antd";
import { ListingCard } from "../../../components/ListingCard";
import { User } from "../../../lib/graphql/queries/User/__generated__/User";

interface Props {
  userListings: User["user"]["listings"];
  listingsPage: number;
  limit: number;
  setListingsPage: (page: number) => void;
}

const { Paragraph, Title } = Typography;

export const UserListings = ({ userListings, listingsPage, limit, setListingsPage }: Props) => {
  const { total, result } = userListings;

  const userListingsList = (
    <List
      grid={{ gutter: 8, xs: 1, sm: 2, lg: 4 }}
      dataSource={result}
      locale={{ emptyText: "No Listings here" }}
      pagination={{
        position: "top",
        current: listingsPage,
        total,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setListingsPage(page),
      }}
      renderItem={(userListing) => (
        <List.Item>
          <ListingCard listing={userListing}></ListingCard>
        </List.Item>
      )}
    ></List>
  );
  return (
    <div className="user-listings">
      <Title level={4} className="user-listings__title">
        {" "}
        Listings
      </Title>
      <Paragraph className="user-listings__description"> This section is what the user can offer listings.</Paragraph>
      {userListingsList}
    </div>
  );
};

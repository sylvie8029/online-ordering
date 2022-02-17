import React from "react";
import { Card, Typography } from "antd";
import { ListingType } from "../../lib/graphql/globalTypes";
import { StarOutlined } from "@ant-design/icons";

interface Props {
  listing: {
    id: string;
    dishName: string;
    image: string;
    price: number;
    rating: number;
    type: ListingType;
  };
}
const { Text, Title } = Typography;

export const ListingCard = ({ listing }: Props) => {
  const { dishName, image, price, rating, type } = listing;

  return (
    <Card hoverable cover={<div style={{ backgroundImage: `url(${image})` }}> background cover</div>} className="listing-card__cover-img">
      <div className="listing-card__details">
        <div className="listing-card__description">
          <Title level={4} className="listing-card__price">
            {price}
            <span>/dish</span>
          </Title>
          <Text strong ellipsis className="listing-card__title">
            {dishName}
          </Text>
          <Text strong ellipsis className="listing-address">
            {type}
          </Text>
        </div>
        <div className="listing-card__dimensions listing-card__dimensions--guests">
          <StarOutlined />
          <Text> {rating} Rate here</Text>
        </div>
      </div>
    </Card>
  );
};

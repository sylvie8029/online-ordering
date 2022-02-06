import { useQuery } from "@apollo/client";
import React from "react";
import { UserVariables, User as UserData } from "../../lib/graphql/queries/User/__generated__/User";
import { USER } from "../../lib/graphql/queries";
import { Layout } from "antd";
import { useParams } from "react-router-dom";

interface MatchParams {
  id: string;
}

const { Content } = Layout;
export const User = ({match}:<MatchParams>) => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, { variables: { id :match.params.id} });
};

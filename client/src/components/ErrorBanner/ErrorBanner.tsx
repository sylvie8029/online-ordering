import React from "react";
import { Alert } from "antd";

interface Props {
  message?: string;
  description?: string;
}

export const ErrorBanner = ({
  message = "Something went wrong",
  description = "Something went wrong. Please check your connection and try again later.",
}: Props) => {
  return <Alert banner closable message={message} description={description} type="error" className="error-banner" />;
};

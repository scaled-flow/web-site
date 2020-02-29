import React from "react";

import { RouteComponentProps } from "react-router-dom";
import Header from "../../components/Header/Header";

interface Props extends RouteComponentProps {}

const TrendsPage: React.FC<Props> = ({ ...props }: Props) => {
  return (
    <>
      <Header title="Trends" />
    </>
  );
};

export default TrendsPage;

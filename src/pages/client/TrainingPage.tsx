import React, { useEffect, useState } from "react";

import { RouteComponentProps } from "react-router-dom";

import Header from "../../components/Header/Header";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import ClassList from "../../components/TrainingClasses/ClassList";

import { useHistory } from "react-router-dom";

interface Props extends RouteComponentProps {}

export type ClassType = "LeSS" | "scaled-agile" | undefined;

const TrainingPage: React.FC<Props> = ({ ...props }: Props) => {
  const { location } = useHistory();

  return (
    <>
      <Header
        title={
          location.pathname === "/training/LeSS"
            ? "LeSS Training"
            : "Scaled Agile Training"
        }
      />
      <ContentContainer>
        <ClassList classType={location.pathname} />
      </ContentContainer>
    </>
  );
};

export default TrainingPage;

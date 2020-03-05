import React, { useEffect, useState } from "react";

import { RouteComponentProps } from "react-router-dom";

import ScaledAgileHeader from "../../components/Header/ScaledAgileHeader";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import ClassList from "../../components/TrainingClasses/ClassList";

import { useHistory } from "react-router-dom";

interface Props extends RouteComponentProps {}

export type ClassType = "LeSS" | "scaled-agile" | undefined;

const TrainingPage: React.FC<Props> = ({ ...props }: Props) => {
  const { location } = useHistory();

  return (
    <>
      <ScaledAgileHeader
        title="Scaled Agile 5.0 Certification Training"
        description="Master the enterprise at scale"
        type="SA"
      />
      <ContentContainer>
        <ClassList classType={location.pathname} />
      </ContentContainer>
    </>
  );
};

export default TrainingPage;

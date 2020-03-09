import React from "react";

import { RouteComponentProps } from "react-router-dom";

import TrainingHeader from "../../components/Header/TrainingHeader";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import ClassList from "../../components/TrainingClasses/ClassList";
import Instructors from "../../components/TrainingClasses/Instructors";

import { useHistory } from "react-router-dom";

interface Props extends RouteComponentProps {}

export type ClassType = "LeSS" | "scaled-agile" | undefined;

const TrainingPage: React.FC<Props> = ({ ...props }) => {
  const { location } = useHistory();

  return (
    <>
      {location.pathname === "/training/scaled-agile" ? (
        <TrainingHeader
          title="Scaled Agile 5.0 Certification Training"
          description="Master the enterprise at scale"
          type="SA"
        />
      ) : (
        <TrainingHeader
          title="LeSS Certification Training"
          description="Do more with LeSS"
          type="LeSS"
        />
      )}
      <ContentContainer>
        <ClassList classType={location.pathname} />
        <Instructors /> {/* TODO: see if i need to get this info from API*/}
      </ContentContainer>
    </>
  );
};

export default TrainingPage;

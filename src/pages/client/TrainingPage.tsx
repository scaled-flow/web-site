import React from "react";

import { RouteComponentProps } from "react-router-dom";

import Header from "../../components/Header/Header";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import ClassList from "../../components/TrainingClasses/ClassList";

interface Props extends RouteComponentProps {}

const TrainingPage: React.FC<Props> = ({ ...props }: Props) => {
  return (
    <>
      <Header title="Training" />
      <ContentContainer>
        <ClassList />
      </ContentContainer>
    </>
  );
};

export default TrainingPage;

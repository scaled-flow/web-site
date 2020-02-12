import React from "react";

import { RouteComponentProps } from "react-router-dom";
import Header from "../components/Header/Header";

interface Props extends RouteComponentProps {}

const AssessmentsPage: React.FC<Props> = ({ ...props }: Props) => {
   return (
      <>
         <Header title="Assessments" />
      </>
   );
};

export default AssessmentsPage;

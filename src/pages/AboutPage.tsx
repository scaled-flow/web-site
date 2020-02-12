import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Header from "../components/Header/Header";

interface Props extends RouteComponentProps {}

const AboutPage: React.FC<Props> = ({ ...props }: Props) => {
   return (
      <>
         <Header title="About" />
      </>
   );
};

export default AboutPage;

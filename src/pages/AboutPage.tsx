import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
   someCustomProp: string;
}

const AboutPage: React.FC<Props> = ({ someCustomProp, ...props }: Props) => {
   console.log();
   return <p>{someCustomProp}</p>;
};

export default AboutPage;

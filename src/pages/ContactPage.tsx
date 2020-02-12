import React from "react";

import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const ContactPage: React.FC<Props> = ({ ...props }: Props) => {
   return <p>Contact Page</p>;
};

export default ContactPage;

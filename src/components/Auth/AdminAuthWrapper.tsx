import React from "react";
// import "./bootstrap.css";
import { SignIn } from "aws-amplify-react";
import config from "../../aws-exports";
import { CustomSignIn } from "../Auth/CustomSignIn";
import AdminRoot from "../../AdminRoot";
import { Authenticator } from "aws-amplify-react";

import { RouteComponentProps } from "react-router-dom";

// components
// import Navbar from "../Navigation/Navigation";
// import Footer from "../Footer/Footer";

interface Props extends RouteComponentProps {}

const AdminAuthWrapper: React.FC<Props> = () => {
    return (
        <div>
          <Authenticator hide={[SignIn]} amplifyConfig={config}>
            <CustomSignIn />
             {/* 
            // @ts-ignore */}
            <AdminRoot />
          </Authenticator>
        </div>
      );
}

export default AdminAuthWrapper;
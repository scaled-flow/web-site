import React, { useState, useEffect } from "react";
// import "./bootstrap.css";
import { SignIn } from "aws-amplify-react";
import config from "../../aws-exports";
import { CustomSignIn } from "../Auth/CustomSignIn";
import AdminRoot from "../../AdminRoot";
import { Authenticator } from "aws-amplify-react";

import { RouteComponentProps } from "react-router-dom";

//Cognito auth components
import { Auth } from "aws-amplify"

// components
// import Navbar from "../Navigation/Navigation";
// import Footer from "../Footer/Footer";

interface Props extends RouteComponentProps { }

const AdminAuthWrapper: React.FC<Props> = () => {
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        checkAuth();
    }, []);

    function checkAuth() {

        Auth.currentSession()
            .then(function (data) {
                setIsAuthenticated(true);
                console.log(data)
            })
            .catch(err => console.log(err));

        setIsAuthenticating(false);
    }

    return (
        <div>
            <Authenticator hide={[SignIn]} amplifyConfig={config}>
                <CustomSignIn />
            </Authenticator>
            {/* 
            // @ts-ignore */}
            {isAuthenticated && <AdminRoot handleClick={()=> checkAuth}/>}
        </div>
    );
}

export default AdminAuthWrapper;
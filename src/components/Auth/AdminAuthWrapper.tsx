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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(()=> {
        checkAuth()
    }, [])

    function checkAuth() {
        setTimeout(() => {
            Auth.currentSession()
            .then(function (data) {
                setIsAuthenticated(true);
                console.log(data)
            })
            .catch(err => console.log(err));
        }, 1000)
    }

    switch (isAuthenticated) {
        case false:
            return (
                <>
                    <Authenticator hide={[SignIn]} amplifyConfig={config}>
                        {/* 
                     // @ts-ignore */}
                        <CustomSignIn handleClick={() => checkAuth()} />
                    </Authenticator>
                </>
            )
        case true:
            return (
                <AdminRoot />
            )
    }
}

export default AdminAuthWrapper;
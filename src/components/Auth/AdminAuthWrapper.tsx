import React from "react";
import "./bootstrap.css";
import { SignIn } from "aws-amplify-react";
import config from "../../aws-exports";
import { CustomSignIn } from "../Login";
import AdminRoot from "./AdminRoot";
import { Authenticator } from "aws-amplify-react/dist/Auth";

import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from "react-router-dom";

// components
import Navbar from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import React from "react";
import { SignIn } from "aws-amplify-react";
import { Container, Row, Col } from "react-bootstrap";

interface Props  {}

export class CustomSignIn extends SignIn {
  constructor(props: any) {
    super(props);
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
  }
  
  showComponent(theme: any) {
    //@ts-ignore
    const pushAdmin = this.props.handleClick
    
    return (
      <div className="mx-auto w-full max-w-xs">
        <form 
        style={{
            "position": "absolute",
            "top": "50%",
            "left": "50%",
            "transform": "translate(-50%, -50%)"
        }}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              key="username"
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              key="password"
              name="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              //@ts-ignore
              onClick={() => {super.signIn(); pushAdmin()}}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
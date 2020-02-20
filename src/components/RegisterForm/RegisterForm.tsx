import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface Props {}

interface Input {
   userName: string;
   email: string;
   password: string;
   cPassword: string;
}

const RegisterForm: React.FC<Props> = () => {
   const [input, setInput] = useState<Input>({
      userName: "",
      email: "",
      password: "",
      cPassword: ""
   });

   return (
      <>
         <Form>
            <Form.Group controlId="formUserName">
               <Form.Control
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                     setInput({ ...input, userName: e.target.value })
                  }
                  value={input.userName}
                  type="text"
                  placeholder="user name"
                  aria-label="username"
               />
            </Form.Group>
            <Form.Group controlId="formEmail">
               <Form.Control
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                     setInput({ ...input, email: e.target.value })
                  }
                  value={input.email}
                  type="email"
                  placeholder="awesome@email.com"
                  aria-label="email"
               />
            </Form.Group>
            <Form.Group controlId="formPassword">
               <Form.Control
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                     setInput({ ...input, password: e.target.value })
                  }
                  value={input.password}
                  type="password"
                  placeholder="password"
                  aria-label="password"
               />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
               <Form.Control
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                     setInput({ ...input, cPassword: e.target.value })
                  }
                  value={input.cPassword}
                  type="password"
                  placeholder="confirm password"
                  aria-label="confirm password"
               />
            </Form.Group>
            <Button
               variant="outline-light"
               type="submit"
               block
               onClick={(e: React.MouseEvent) => e.preventDefault()}
            >
               Submit
            </Button>
         </Form>
      </>
   );
};

export default RegisterForm;

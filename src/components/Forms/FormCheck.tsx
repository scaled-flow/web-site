import React from "react";

import { Form } from "react-bootstrap";

interface Props {
  cb: any;
  action: string;
  title: string;
  testValue?: string;
  id: string | undefined;
  isChecked: boolean;
}

const FormCheck: React.FC<Props> = ({ cb, action, title, testValue, id, isChecked }) => {
  // console.log(testValue, isChecked);
  return (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={id}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.checked);
          cb({ type: "switch_active", payload: e.target.checked });
        }}
        checked={isChecked}
      />
      <label className="custom-control-label" htmlFor={id}>
        {title}
      </label>
    </div>
  );
};

export default FormCheck;

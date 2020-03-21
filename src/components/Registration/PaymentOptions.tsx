import React from "react";

import { Transaction } from "../../pages/client/ClassRegistrationPage";

interface Props {
  transaction: Transaction;
}

const PaymentOptions: React.FC<Props> = ({ transaction }) => {
  return (
    <div className="reg-row text-center">
      <h2 className="reg-header">Payment Options</h2>
      <button
        className="submit-btn btn-wide"
        onClick={() => {
          console.log(transaction);
        }}
      >
        Submit Registration
      </button>
    </div>
  );
};

export default PaymentOptions;

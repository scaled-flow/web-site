import React from "react";

import { PayPalButton } from "react-paypal-button-v2";

import { Transaction } from "../../pages/client/ClassRegistrationPage";

interface Props {
  transaction: Transaction;
}

const PaymentOptions: React.FC<Props> = ({ transaction }) => {
  return (
    <div className="reg-row text-center">
      <h2 className="reg-header">Payment Options</h2>
      <PayPalButton
        amount={transaction.totalPrice.toString()}
        shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        // @ts-ignore
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
        }}
        // @ts-ignore
        onError={error => {
          const err = new Error(error);
          if (err.message.includes("status: 422")) {
            alert("please make sure to include at least one attendee");
          }
        }}
      />{" "}
    </div>
  );
};

export default PaymentOptions;

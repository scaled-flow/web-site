import React, { useState, useEffect } from "react";

import { PayPalButton } from "react-paypal-button-v2";
import { useMutation } from "@apollo/client";

import { Transaction } from "../../pages/client/ClassRegistrationPage";
import { Class } from "../../graphQL/types";
import { ADD_TRANSACTION } from "../../graphQL/mutations";

interface Props {
  transaction: Transaction;
  classInfo: Class | undefined;
}

const handleTransaction = async (transaction: Transaction, classInfo: Class | undefined, mutation: any) => {
  console.log(transaction);
  console.log(classInfo);
  console.log(transaction.totalPrice);
  class Attendee {
    constructor(public email: string, public first_name: string, public last_name: string) {}
  }
  let attendees: Attendee[] = [];
  transaction.attendees.forEach(attendee => {
    attendees.push(new Attendee(attendee.email, attendee.fName, attendee.lName));
  });
  console.log(attendees);
  const res = await mutation({
    variables: {
      purchaseAddress1: transaction.purchaser.address_1,
      purchaseAddress2: transaction.purchaser.address_2,
      purchaseCity: transaction.purchaser.city,
      purchaseCompany: transaction.purchaser.company,
      purchaseEmail: transaction.purchaser.email,
      purchaseFName: transaction.purchaser.first_name,
      purchaseLName: transaction.purchaser.last_name,
      purchasePostalCode: transaction.purchaser.postal_code,
      purchaseReigon: transaction.purchaser.state,
      purchaseTotalAmount: transaction.totalPrice,
      attendees: attendees
    }
  });
  console.log(res);
};

const PaymentOptions: React.FC<Props> = ({ transaction, classInfo }) => {
  const [addTransaction] = useMutation(ADD_TRANSACTION);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [transactionAlt, setTransactionAlt] = useState<string[]>([]);

  useEffect(() => {
    if (
      transaction.numOfAttendees === undefined ||
      transaction.purchaser.address_1 === undefined ||
      transaction.purchaser.city === undefined ||
      transaction.purchaser.email === undefined ||
      transaction.purchaser.first_name === undefined ||
      transaction.purchaser.last_name === undefined ||
      transaction.purchaser.postal_code === undefined ||
      transaction.purchaser.state === undefined
    ) {
      return setIsFormFilled(false);
    }
    setIsFormFilled(true);
  }, [transaction]);

  console.log(isFormFilled);
  return (
    <div className="reg-row text-center">
      <h2 className="reg-header">Payment Options</h2>
      {isFormFilled ? (
        <div>
          <button onClick={() => handleTransaction(transaction, classInfo, addTransaction)}>Click</button>
          <PayPalButton
            amount={transaction.totalPrice.toString()}
            shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            // @ts-ignore
            onSuccess={async (details, data) => {
              // OPTIONAL: Call your server to save the transaction
              handleTransaction(transaction, classInfo, addTransaction);
            }}
            // @ts-ignore
            onError={error => {
              const err = new Error(error);
              if (err.message.includes("status: 422")) {
                alert("please make sure to include at least one attendee");
              }
            }}
          />
        </div>
      ) : (
        <p>Please complete the forms</p>
      )}
    </div>
  );
};

export default PaymentOptions;

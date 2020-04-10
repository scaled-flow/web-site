import React, { useState, useEffect } from "react";

import { PayPalButton } from "react-paypal-button-v2";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { History } from "history";

import { Transaction } from "../../pages/client/ClassRegistrationPage";
import { Class } from "../../graphQL/types";
import { ADD_TRANSACTION } from "../../graphQL/mutations";

interface Props {
  transaction: Transaction;
  classInfo: Class | undefined;
}

const handleTransaction = async (transaction: Transaction, classInfo: Class | undefined, history: any) => {
  (async () => {
    const response = await fetch('https://api.testscaledflow.com/v0/transaction', {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(transaction)
    })
    const data = await response.json();
    console.log(data)
  })()
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

  history.push("/complete", { transaction, classInfo });

  // const res = await mutation({
  //   variables: {
  //     purchaseAddress1: transaction.purchaser.address_1,
  //     purchaseAddress2: transaction.purchaser.address_2,
  //     purchaseCity: transaction.purchaser.city,
  //     purchaseCompany: transaction.purchaser.company,
  //     purchaseEmail: transaction.purchaser.email,
  //     purchaseFName: transaction.purchaser.first_name,
  //     purchaseLName: transaction.purchaser.last_name,
  //     purchasePostalCode: transaction.purchaser.postal_code,
  //     purchaseReigon: transaction.purchaser.state,
  //     purchaseTotalAmount: transaction.totalPrice,
  //     attendees: attendees
  //   }
  // });
  // console.log(res);
};

const PaymentOptions: React.FC<Props> = ({ transaction, classInfo }) => {
  const [addTransaction] = useMutation(ADD_TRANSACTION);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [transactionAlt, setTransactionAlt] = useState<string[]>([]);

  const history = useHistory();

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
  transaction.classScheduleId = classInfo?.class_schedule.class_schedule_id
  console.log(isFormFilled);
  return (
    <div className="reg-row text-center">
      <h2 className="reg-header">Payment Options</h2>
      {isFormFilled ? (
        <div>
          <button onClick={() => handleTransaction(transaction, classInfo, history)}>Click</button>
          <PayPalButton
            amount={transaction.totalPrice.toString()}
            shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            // @ts-ignore
            onSuccess={async (details, data) => {
              // OPTIONAL: Call your server to save the transaction
              handleTransaction(transaction, classInfo, history);
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
        <p className="mt-4">
          Please complete <strong>Attendee Registration</strong> and <strong>Purchaser Information</strong> Forms
        </p>
      )}
    </div>
  );
};

export default PaymentOptions;

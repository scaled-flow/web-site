import React, { useState, useEffect, useReducer } from "react";

import { Container } from "react-bootstrap";
import { GetClassData } from "../../graphQL/queries";
import { Class, PurchaserInfo as Purchaser } from "../../graphQL/types";
import { useQuery } from "@apollo/client";

import ContentContainer from "../../components/ContentContainer/ContentContainer";
import RegistrationInfo from "../../components/Registration/RegistrationInfo";
import InstructorInfo from "../../components/Registration/InstructorInfo";
import RegistrationForm, { Attendee } from "../../components/Registration/RegistrationForm";
import PurchaserInfo from "../../components/Registration/PurchaserInfo";
import PaymentOptions from "../../components/Registration/PaymentOptions";
import "../../components/Registration/Registration.css";

interface Props {
  consultantId: number;
  classId: number;
  scheduleId: number;
  isOnline: "in-person" | "online";
}

export interface Transaction {
  attendees: Attendee[];
  numOfAttendees: number;
  pricePerPerson: number;
  totalPrice: number;
  numOfDays: number;
  purchaser: Purchaser;
  classScheduleId?: number;
}

type Action =
  | { type: "attendees"; payload: Attendee[] }
  | { type: "numOfAttendees"; payload: number }
  | { type: "pricePerPerson"; payload: number }
  | { type: "totalPrice"; payload: number }
  | { type: "numOfDays"; payload: number }
  | { type: "purchaser"; payload: Purchaser };

const reducer = (state: Transaction, action: Action) => {
  switch (action.type) {
    case "attendees":
      return { ...state, attendees: action.payload };
    case "numOfAttendees":
      return { ...state, numOfAttendees: action.payload };
    case "pricePerPerson":
      return { ...state, pricePerPerson: action.payload };
    case "numOfDays":
      return { ...state, numOfDays: action.payload };
    case "totalPrice":
      const numOfAttendees = state.numOfAttendees;
      const pricePerPerson = state.pricePerPerson;
      const totalPrice = numOfAttendees * pricePerPerson;
      return { ...state, totalPrice: totalPrice };
    case "purchaser":
      return { ...state, purchaser: action.payload };
    default:
      return { ...state };
  }
};

const ClassRegistrationPage: React.FC<Props> = ({ consultantId, classId, scheduleId, isOnline }) => {
  const [classInfo, setClassInfo] = useState<Class>();
  const { loading, error, data } = useQuery(GetClassData(consultantId, classId, scheduleId));
  const [transaction, dispatch] = useReducer(reducer, { totalPrice: 100 } as Transaction);

  useEffect(() => {
    !error && !loading && setClassInfo(data.consultant_profiles_link_class_profiles_link_class_schedules_by_pk);
  }, [loading, error, data]);

  useEffect(() => {
    const temp = classInfo?.class_schedule.class_number_of_days ? classInfo.class_schedule.class_number_of_days : 0;
    dispatch({ type: "numOfDays", payload: temp });
  }, [classInfo]);

  return (
    <>
      <ContentContainer customColor="#EFF9FF">
        <Container>
          <RegistrationInfo classInfo={classInfo} />
          <InstructorInfo classInfo={classInfo} />
          <RegistrationForm
            classInfo={classInfo}
            isOnline={isOnline}
            cb={dispatch}
            totalPrice={transaction.totalPrice}
          />
          <PurchaserInfo classInfo={classInfo!} cb={dispatch} />
          <PaymentOptions transaction={transaction} classInfo={classInfo} />
        </Container>
      </ContentContainer>
    </>
  );
};

export default ClassRegistrationPage;

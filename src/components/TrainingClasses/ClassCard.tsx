import React, { useState, useEffect } from "react";

import { Class } from "../../graphQL/types";
import { Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./TrainingClasses.css";
import ClassDateIcon from "./ClassDateIcon";

import momemt from "moment";

interface Props {
  classData: Class;
  isOnline: boolean;
  isOnlineText: string;
}

interface DateInfo {
  longStart: string;
  longEnd: string;
  shortMonth: string;
  day?: number | string;
}

const ClassCard: React.FC<Props> = ({ classData, isOnline, isOnlineText }) => {
  const [dateInfo, setDateInfo] = useState<DateInfo>({} as DateInfo);

  useEffect(() => {
    setDateInfo({
      longStart: momemt(classData.class_schedule.class_start_date, "YYYY-MM-DD").format("MMMM Do YYYY"),
      longEnd: momemt(classData.class_schedule.class_end_date, "YYYY-MM-DD").format("MMMM Do YYYY"),
      shortMonth: momemt(classData.class_schedule.class_start_date, "YYYY-MM-DD")
        .format("MMM")
        .toUpperCase(),
      day: momemt(classData.class_schedule.class_start_date, "YYYY-MM-DD").format("DD")
    });
  }, [classData]);

  return (
    <>
      <Row className="align-items-center">
        <Col xs={2}>
          <ClassDateIcon date={{ month: dateInfo.shortMonth, day: dateInfo.day }} />
        </Col>{" "}
        <Col xs={6}>
          <h6>{classData.class_profile.class_title}</h6>
          <p>{`${dateInfo.longStart} - ${dateInfo.longEnd}`}</p>
          <p>
            {!isOnline
              ? `${classData.class_schedule.class_in_person_city}, ${classData.class_schedule.class_in_person_state}`
              : `${momemt(classData.class_schedule.class_start_time, "HH:mm:ss").format("hh:mm A")} CST, USA`}
          </p>
          <p>{isOnlineText}</p>
        </Col>
        <Col xs={2}>
          <Image
            src={classData.class_profile.class_image}
            fluid
            alt={
              classData.class_profile.class_image_alt_text
                ? classData.class_profile.class_image_alt_text
                : "class image"
            }
          />
        </Col>
        <Col xs={2}>
          <Link
            to={`/training/class/${classData.class_profile.class_profile_id}/${
              classData.class_schedule.class_schedule_id
            }/${classData.consultant_profile.consultant_profile_user_id}/${encodeURI(
              classData.class_profile.class_title
            )}/${(classData.class_schedule.class_is_online && "online") ||
              (classData.class_schedule.class_is_in_person && "in-person")}`}
          >
            <Icon icon={faPlusCircle} size="2x" color="#C4C4C4" />
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default ClassCard;

import React from "react";

interface ClassDate {
  month: string;
  day?: number | string;
}

interface Props {
  date: ClassDate;
}

const ClassDateIcon: React.FC<Props> = ({ date }) => {
  return (
    <>
      <div className="date-icon text-center">
        <div className="month">
          <span>{date.month}</span>
        </div>
        <p>{date.day}</p>
      </div>
    </>
  );
};

export default ClassDateIcon;

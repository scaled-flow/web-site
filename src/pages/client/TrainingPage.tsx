import React, { useEffect, useState } from "react";

import { RouteComponentProps, useParams } from "react-router-dom";

import TrainingHeader from "../../components/Header/TrainingHeader";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import ClassList from "../../components/TrainingClasses/ClassList";
import Instructors from "../../components/TrainingClasses/Instructors";
import { GET_UPCOMING_CLASSES_BY_TYPE, GET_CLASS_TYPES, GET_TYPE_BY_ABBR } from "../../graphQL/queries";
import { useQuery } from '@apollo/client'
import { ClassProfile, ClassSchedule, ConsultantProfile } from "../../graphQL/types";


interface Props extends RouteComponentProps {}

const today = new Date()

export interface Class {
  class_profile: ClassProfile;
  class_schedule: ClassSchedule;
  consultant_profile: ConsultantProfile;
}

export interface ClassType {
  class_type_id: number;
  class_type_abbreviation: string;
  class_type_full_name: string;
  class_type_tag_line: string;
}

const TrainingPage: React.FC<Props> = ({ location }) => {
  let { id } = useParams();
  const [classes, setClasses] = useState<Class[]>([])
  const [classType, setClassType] = useState<ClassType>({} as ClassType)
  const [illuminator, setIlluminator] = useState<number>(0)
  const {loading: upcomingLoading, error: upcomingError, data: upcomingData} = useQuery(GET_UPCOMING_CLASSES_BY_TYPE, {variables: {class_type_abbr: id, today: today.toISOString()},});
  const {loading: typeLoading, error: typeError, data: typeData} = useQuery(GET_TYPE_BY_ABBR, {variables: {abbr: id}})

  useEffect(()=>{
    !upcomingLoading && !upcomingError ? setClasses(upcomingData.consultant_profiles_link_class_profiles_link_class_schedules) : console.log("Something went wrong")
  },[upcomingLoading, upcomingError, upcomingData])

  useEffect(()=>{
    !typeLoading && !typeError && setClassType(typeData.class_types[0]) 
  },[typeLoading, typeError, typeData])

  return (
    <>
        <TrainingHeader
          title={`${classType.class_type_full_name} Training`}
          description={classType?.class_type_tag_line}
          type={classType.class_type_abbreviation}
        />
      <ContentContainer>
        <ClassList illuminator={illuminator} classes={classes} classType={location.pathname} />
        <Instructors classType={id || ''} setIlluminator={setIlluminator} instructorIds={classes.reduce((ids, c)=> {
          if(!ids.includes(c.consultant_profile.consultant_profile_user_id)) {
            ids.push(c.consultant_profile.consultant_profile_user_id)
          }
          return ids
        },[] as number[])} /> {/* TODO: see if i need to get this info from API*/}
      </ContentContainer>
    </>
  );
};

export default TrainingPage;

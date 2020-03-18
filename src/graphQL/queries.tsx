import gql from "graphql-tag";

export const GET_IN_PERSON_CLASSES = gql`
  query GetInPersonClasses {
    consultant_profiles_link_class_profiles_link_class_schedules(where: {class_schedule: {class_is_in_person: {_eq: true}}}) {
      class_profile {
        class_desc
        class_title
        class_profile_id
      }
      class_schedule {
        class_schedule_id
        class_end_date
        class_end_time
        class_in_person_city
        class_in_person_state
        class_is_online
        class_start_date
        class_start_time
      }
      consultant_profile {
        consultant_profile_user_id
        profile_photo_url
      }
    }
  }
`;


export const GET_ONLINE_CLASSES = gql`
  query GetOnlineClasses {
    consultant_profiles_link_class_profiles_link_class_schedules(where: {class_schedule: {class_is_in_person: {_eq: false}}}) {
      class_profile {
        class_desc
        class_title
        class_profile_id
      }
      class_schedule {
        class_schedule_id
        class_end_date
        class_end_time
        class_in_person_city
        class_in_person_state
        class_is_online
        class_start_date
        class_start_time
      }
      consultant_profile {
        consultant_profile_user_id
        profile_photo_url
      }
    }
  }
`;

export const GetClassPrice = (classScheduleId: number) => {
  // TODO: use correct ID
  return gql`
    query GetClassPrices {
      consultant_profiles_link_class_profiles_link_class_schedules(where: {class_schedule: {class_schedule_id: {_eq: ${classScheduleId}}}}) {
        class_schedule {
          class_number_of_days
          class_schedule_id
        }
        class_profile {
          class_in_person_standard_price
        }
      }
    }
  `;
};

export const GetClassData = (consultantId: number, classId: number, scheduleId: number) => {
  return gql`
  query GetClassData {
    consultant_profiles_link_class_profiles_link_class_schedules_by_pk(class_profile_id_fk: ${classId}, class_schedule_id_fk: ${scheduleId}, consultant_profile_id_fk: ${consultantId}) {
      class_profile {
        class_desc
        class_early_bird_price_reduction
        class_group_price_reduction_percent
        class_image
        class_in_person_standard_price
        class_online_standard_price
        class_profile_id
        class_title
        class_type {
          class_type_full_name
          class_type_abbreviation
        }
      }
      class_schedule {
        class_end_date
        class_end_time
        class_in_person_address_01
        class_in_person_address_02
        class_in_person_city
        class_in_person_state
        class_in_person_zip
        class_is_in_person
        class_is_online
        class_number_of_days
        class_online_link
        class_schedule_id
        class_start_date
        class_start_time
      }
      consultant_profile {
        email
        first_name
        job_title
        last_name
        phone
        profile_description
        profile_photo_url
      }
    }
  }
  
  `
}
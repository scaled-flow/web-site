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
        class_end_date
        class_end_time
        class_in_person_city
        class_in_person_state
        class_is_online
        class_start_date
        class_start_time
      }
      consultant_profile {
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
        class_end_date
        class_end_time
        class_in_person_city
        class_in_person_state
        class_is_online
        class_start_date
        class_start_time
      }
      consultant_profile {
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

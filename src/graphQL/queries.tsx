import gql from "graphql-tag";

export const GET_IN_PERSON_CLASSES = gql`
  query GetInPersonClasses {
    class_consultant_schedule_view_aggregate(where: { class_is_in_person: { _eq: true } }) {
      nodes {
        class_start_date
        class_end_date
        class_title
        class_in_person_city
        class_in_person_state
        class_is_online
        profile_photo_url
        class_start_time
        class_profile_id_fk
        class_desc
      }
    }
  }
`;
export const GET_ONLINE_CLASSES = gql`
  query GetOnlineClasses {
    class_consultant_schedule_view_aggregate(where: { class_is_in_person: { _eq: false } }) {
      nodes {
        class_start_date
        class_end_date
        class_title
        class_is_online
        profile_photo_url
        class_start_time
        class_profile_id_fk
        class_desc
      }
    }
  }
`;

export const GetClassPrice = (classScheduleId: number) => {
  // TODO: use correct ID
  return gql`
    query GetClassPrices {
      class_consultant_schedule_view_aggregate(where: { class_schedule_id_fk: { _eq: ${classScheduleId} } }) {
        nodes {
          class_in_person_standard_price
          class_number_of_days
        }
      }
    }
  `;
};

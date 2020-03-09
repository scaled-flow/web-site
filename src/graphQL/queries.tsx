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
      }
    }
  }
`;

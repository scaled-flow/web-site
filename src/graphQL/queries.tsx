import gql from "graphql-tag";

export const GET_CLASSES = gql`
  query GetClasses {
    class_consultant_schedule_view_aggregate {
      nodes {
        class_start_date
        class_end_date
        class_title
        class_in_person_city
        class_in_person_state
        class_is_online
        profile_photo_url
      }
    }
  }
`;

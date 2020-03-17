import gql from "graphql-tag";

export const INSERT_MAIN_PAGE_HEADER = gql`
  mutation InsertMainPageHeader(
    $heroHeadlineText: String!
    $heroSubHeadlineText: String!
    $heroButtonText: String!
    $heroButtonPointer: String!
    $active: Boolean!
  ) {
    insert_main_page_header(
      objects: {
        hero_headline_text: $heroHeadlineText
        hero_sub_headline_text: $heroSubHeadlineText
        hero_button_text: $heroButtonText
        hero_button_pointer: $heroButtonPointer
        active: $active
      }
    ) {
      affected_rows
      returning {
        active
        hero_button_pointer
        hero_button_text
        hero_headline_text
        hero_sub_headline_text
      }
    }
  }
`;

export const DELETE_MAIN_PAGE_HEADER = gql`
  mutation DeleteMainPageHeader($id: Int!) {
    delete_main_page_header(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        active
        hero_button_pointer
        hero_button_text
        hero_headline_text
        hero_sub_headline_text
        id
      }
    }
  }
`;

export const UPDATE_ACTIVE_HEADER = gql`
  mutation UpdateActiveHeader($id: Int!) {
    true: update_main_page_header(where: { id: { _eq: $id } }, _set: { active: true }) {
      affected_rows
      returning {
        active
        hero_button_pointer
        hero_button_text
        hero_headline_text
        hero_sub_headline_text
        id
      }
    }
    update_main_page_header(where: { id: { _neq: $id } }, _set: { active: false }) {
      affected_rows
      returning {
        active
        hero_button_pointer
        hero_button_text
        hero_headline_text
        hero_sub_headline_text
        id
      }
    }
  }
`;

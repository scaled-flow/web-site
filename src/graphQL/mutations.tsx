import gql from "graphql-tag";

export const INSERT_HERO_TEXT = gql`
  mutation InsertHeroText($heroText: String!, $active: Boolean!) {
    insert_main_page(objects: { hero_text: $heroText, active: $active }) {
      affected_rows
      returning {
        active
        hero_text
        id
      }
    }
  }
`;

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

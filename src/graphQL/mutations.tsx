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

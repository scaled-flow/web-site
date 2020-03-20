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
    false: update_main_page_header(where: { id: { _neq: $id } }, _set: { active: false }) {
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

export const UPDATE_MAIN_PAGE_HEADER_CONTENT = gql`
  mutation UpdateMainPageHeader(
    $heroButtonPointer: String!
    $heroButtonText: String!
    $heroHeadlineText: String!
    $heroSubHeadlineText: String!
    $id: Int!
  ) {
    update_main_page_header(
      where: { id: { _eq: $id } }
      _set: {
        hero_button_pointer: $heroButtonPointer
        hero_button_text: $heroButtonText
        hero_headline_text: $heroHeadlineText
        hero_sub_headline_text: $heroSubHeadlineText
      }
    ) {
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

export const UPDATE_ACTIVE_CONTENT_ITEMS = gql`
  mutation UpdateActiveContentItems($id: Int!, $active: Boolean!) {
    update_main_page_services(where: { id: { _eq: $id } }, _set: { active: $active }) {
      affected_rows
      returning {
        active
        id
        service_offering_body
        service_offering_font_awesome_icon
        service_offering_header
      }
    }
  }
`;

export const INSERT_MAIN_PAGE_CONTENT = gql`
  mutation InsertMainPageContent($body: String!, $icon: String!, $header: String!) {
    insert_main_page_services(
      objects: {
        service_offering_body: $body
        service_offering_font_awesome_icon: $icon
        service_offering_header: $header
        active: false
      }
    ) {
      affected_rows
      returning {
        active
        id
        service_offering_body
        service_offering_font_awesome_icon
        service_offering_header
      }
    }
  }
`;

export const DELETE_MAIN_PAGE_CONTENT = gql`
  mutation DeleteMainPageContent($id: Int!) {
    delete_main_page_services(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        active
        id
        service_offering_body
        service_offering_font_awesome_icon
        service_offering_header
      }
    }
  }
`;

export const UPDATE_MAIN_PAGE_CONTENT = gql`
  mutation UpdateMainPageContent($id: Int!, $body: String!, $icon: String!, $header: String!) {
    update_main_page_services(
      where: { id: { _eq: $id } }
      _set: {
        service_offering_body: $body
        service_offering_font_awesome_icon: $icon
        service_offering_header: $header
      }
    ) {
      affected_rows
      returning {
        active
        id
        service_offering_body
        service_offering_font_awesome_icon
        service_offering_header
      }
    }
  }
`;

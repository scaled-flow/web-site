import gql from "graphql-tag";

export const GET_IN_PERSON_SAFE_CLASSES = gql`
  query GetInPersonSafeClasses {
    consultant_profiles_link_class_profiles_link_class_schedules(
      where: { class_schedule: { class_is_in_person: { _eq: true } }, class_profile: { class_type_id_fk: { _eq: 1 } } }
    ) {
      class_profile {
        class_desc
        class_title
        class_profile_id
        class_image
      }
      class_schedule {
        class_schedule_id
        class_end_date
        class_end_time
        class_in_person_city
        class_in_person_state
        class_is_online
        class_is_in_person
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

export const GET_ONLINE_SAFE_CLASSES = gql`
  query GetOnlineSafeClasses {
    consultant_profiles_link_class_profiles_link_class_schedules(
      where: { class_schedule: { class_is_online: { _eq: true } }, class_profile: { class_type_id_fk: { _eq: 1 } } }
    ) {
      class_profile {
        class_desc
        class_title
        class_profile_id
        class_image
      }
      class_schedule {
        class_end_date
        class_end_time
        class_in_person_city
        class_in_person_state
        class_is_online
        class_is_in_person
        class_start_date
        class_start_time
        class_schedule_id
      }
      consultant_profile {
        consultant_profile_user_id
        profile_photo_url
      }
    }
  }
`;
export const GET_IN_PERSON_LESS_CLASSES = gql`
  query GetInPersonLessClasses {
    consultant_profiles_link_class_profiles_link_class_schedules(
      where: { class_schedule: { class_is_in_person: { _eq: true } }, class_profile: { class_type_id_fk: { _eq: 2 } } }
    ) {
      class_profile {
        class_desc
        class_title
        class_profile_id
        class_image
      }
      class_schedule {
        class_end_date
        class_end_time
        class_in_person_city
        class_in_person_state
        class_is_online
        class_is_in_person
        class_start_date
        class_start_time
        class_schedule_id
      }
      consultant_profile {
        profile_photo_url
        consultant_profile_user_id
      }
    }
  }
`;

export const GET_ONLINE_LESS_CLASSES = gql`
  query GetOnlineLess {
    consultant_profiles_link_class_profiles_link_class_schedules(
      where: { class_schedule: { class_is_online: { _eq: false } }, class_profile: { class_type_id_fk: { _eq: 2 } } }
    ) {
      class_profile {
        class_desc
        class_title
        class_profile_id
        class_image
      }
      class_schedule {
        class_schedule_id
        class_end_date
        class_end_time
        class_in_person_city
        class_in_person_state
        class_is_online
        class_is_in_person
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
  
  `;
};

export const GET_ALL_HERO_INFO = gql`
  query GetAllHeroInfo {
    main_page_header(order_by: { id: asc }) {
      active
      hero_button_pointer
      hero_button_text
      hero_headline_text
      hero_sub_headline_text
      id
    }
  }
`;

export const GET_CURRENT_HERO_INFO = gql`
  query GetCurrentHeroInfo {
    main_page_header(where: { active: { _eq: true } }) {
      hero_button_text
      hero_button_pointer
      hero_headline_text
      hero_sub_headline_text
      id
    }
  }
`;

export const GET_MAIN_PAGE_INFO = gql`
  query GetMainPageContent {
    main_page_services(where: { active: { _eq: true } }) {
      service_offering_body
      service_offering_font_awesome_icon
      service_offering_header
      id
    }
  }
`;

export const GET_ALL_MAIN_PAGE_INFO = gql`
  query GetAllMainPageInfo {
    main_page_services(order_by: { id: asc }) {
      active
      id
      service_offering_body
      service_offering_font_awesome_icon
      service_offering_header
    }
  }
`;

export const GET_ALL_CONSULTANTS = gql`
  query GetAllConsultants {
    consultant_profiles(order_by: { first_name: asc }) {
      consultant_profile_user_id
      email
      first_name
      job_title
      last_name
      phone
      profile_description
      profile_photo_url
      consultant_profiles_link_class_profiles_link_class_schedules {
        class_profile {
          class_type {
            class_type_abbreviation
            class_type_full_name
          }
          class_type_id_fk
          class_title
          class_profile_id
          class_image
        }
      }
    }
  }
`;

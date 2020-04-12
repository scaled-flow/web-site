export interface ClassProfile {
  class_profile_id?: number;
  class_title: string;
  class_desc?: string;
  class_image?: string;
  class_image_alt_text?: string;
  class_early_bird_price_reduction?: number;
  class_group_price_reduction_percent?: number;
  class_in_person_standard_price?: number;
  class_online_standard_price?: number;
  class_currency_type_fk?: number;
  class_type_id_fk?: number;
  class_type?: {
    class_type_abbreviation?: string;
    class_type_full_name?: string;
  };
}

export interface ConsultantProfile {
  consultant_profile_user_id?: number;
  first_name?: string;
  last_name?: string;
  job_title?: string;
  profile_description?: string;
  profile_photo_url?: string;
  profile_photo_alt_text?: string;
  phone?: string;
  email?: string;
}

export interface ConsultantProfileLinkClassProfile {
  consultant_profile_user_id: number;
  first_name?: string;
  last_name?: string;
  job_title?: string;
  profile_description?: string;
  profile_photo_url?: string;
  profile_photo_alt_text?: string;
  phone?: string;
  email?: string;
  class_profile?: ClassProfile[];
}

export interface ClassSchedule {
  class_schedule_id?: number;
  class_is_in_person?: boolean;
  class_in_person_address_01?: string;
  class_in_person_address_02?: string;
  class_in_person_city?: string;
  class_in_person_state?: string;
  class_in_person_zip?: string;
  class_is_online?: boolean;
  class_online_link?: string;
  class_number_of_days?: number;
  class_start_date: string;
  class_end_date?: string;
  class_start_time: string;
  class_end_time?: string;
}

export interface Currency {
  currency_type_id?: number;
  currency_type_abbreviation?: string;
  currency_type_full_name?: string;
}

export interface Country {
  country_id: number;
  country: string;
}

export interface Class {
  class_profile: ClassProfile;
  class_schedule: ClassSchedule;
  consultant_profile: ConsultantProfile;
}

export interface MainPageHeader {
  hero_button_text: string;
  hero_button_pointer: string;
  hero_headline_text: string;
  hero_sub_headline_text: string;
  id: number;
}

export interface MainPageContent {
  service_offering_body: string;
  service_offering_font_awesome_icon: string;
  service_offering_header: string;
  id: number;
  active: boolean;
}

export interface BlogPost {
  author: string;
  blog_post_id: number;
  content_01: string;
  content_02?: string;
  cta_01?: string;
  cta_02?: string;
  entry_date: Date;
  header: string;
  image_url: string;
  opening: string;
  sub_header_one: string;
  sub_header_two?: string;
}

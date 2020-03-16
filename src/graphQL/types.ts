export interface ClassProfile {
    class_profile_id: number
    class_title: string
    class_desc?: string
    class_image?: string
    class_early_bird_price_reduction?: number
    class_group_price_reduction_percent?: number
    class_in_person_standard_price?: number
    class_online_standard_price?: number
    class_currency_type_fk?: number
    class_type_id_fk?: number
}

export interface ConsultantProfile {
    consultant_profile_user_id?: number
    first_name?: string
    last_name?: string
    job_title?: string
    profile_description?: string
    profile_photo_url?: string
    phone?: string
    email?: string
}

export interface ClassSchedule {
    class_schedule_id?: number
    class_is_in_person?: boolean
    class_in_person_address_01?: string
    class_in_person_address_02?: string
    class_in_person_city?: string
    class_in_person_state?: string
    class_in_person_zip?: string
    class_is_online?: boolean
    class_online_link?: string
    class_number_of_days?: string
    class_start_date: string
    class_end_date?: string
    class_start_time: string
    class_end_time?: string
}

export interface Currency {
    currency_type_id?: number
    currency_type_abbreviation?: string
    currency_type_full_name?: string
}

export interface Country {
    country_id: number
    country: string
}
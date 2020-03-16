import gql from "graphql-tag";

export const UPDATE_CONSULTANT_PROFILES = (
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  description: string,
  photoUrl: string,
  jobTitle: string
) =>
  gql`
    mutation MyMutation {
      update_consultant_profiles(
        where: {
          email: { _eq: ${email} }
          first_name: { _eq: ${firstName} }
          job_title: { _eq: ${jobTitle} }
          last_name: { _eq: ${lastName} }
          phone: { _eq: ${phone} }
          profile_description: { _eq: ${description} }
          profile_photo_url: { _eq: ${photoUrl} }
        }
      )
    }
  `;

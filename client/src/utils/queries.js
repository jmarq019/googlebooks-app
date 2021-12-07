import { gql } from '@apollo/client';

export const GET_ME = gql`{
   {
    User {
      username
      email
      savedBooks{
        title
        description
        image
        link
      }
    }
  }
`;



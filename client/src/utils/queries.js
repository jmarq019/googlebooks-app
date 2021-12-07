import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    password
    savedBooks {
      _id
      bookID
      title
      description
      image
      link
    } 
  } 
}
`;


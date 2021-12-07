import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }`;

export const ADD_USER = gql`
mutation addUser($email: String!, $username: String!, $password String!) {
  addUser(email: $email, username: $username, password: $password) {
    token
    user {
      _id
    username
    email
    password
    }
  }
}`;
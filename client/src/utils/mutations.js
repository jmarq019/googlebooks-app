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
      authors
        } 
      }
    }
  }`;


export const ADD_USER = gql`
mutation addUser($email: String!, $username: String!, $password: String!) {
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

export const ADD_BOOK = gql`
mutation addBook($input: savedBook!) {
    saveBook(input: $input) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            link
            description
            bookId
            image
            title
        }
    }
}`;

export const REMOVE_BOOK =gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            authors
            description
            bookId
            image
            link
            title
        }
    }
}`;
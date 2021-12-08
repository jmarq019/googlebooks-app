const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String 
    password: String
    savedBooks: [Book]
  }

  type Book {
      _id: ID
      bookId: String
      title: String
      description: String
      image: String
      link: String
      authors: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
  }

  type Mutation {
    addUser(username: String!, email: String!, password:String!): User
    login:(email: String!, password:String!)        
    saveBook(input: newBook!): Book
    removeBook(bookID: ID): Book
  }

  input newBook {
  bookId: String
  authors: [String]
  description: String
  image: String
  link: String
  title: String
  }
`;



module.exports = typeDefs;
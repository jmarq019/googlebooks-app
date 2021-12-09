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
      bookId: String
      title: String
      description: String
      image: String
      link: String
      authors: [String]
      user: [User]
  }

  input BookInput {
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
    # findBook(title: String!): [Book]
  }

  type Mutation {
    addUser(username: String!, email: String!, password:String!): Auth
    login(email: String!, password:String!): Auth        
    addBook(input: BookInput): User
    removeBook(bookID: ID!): User
  }

`;



module.exports = typeDefs;
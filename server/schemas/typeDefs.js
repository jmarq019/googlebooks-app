const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String 
    password: String
  }

  type Book {
      _id: ID
      title: String
      description: String
      image: String
      link: String
      savedBooks: [Book]
  }

  type Query {
    users: [User]
    books: [Book]
  }

  type Mutation {
    addUser(username: String!, email: String!, password:String!): User
  }
`;



module.exports = typeDefs;
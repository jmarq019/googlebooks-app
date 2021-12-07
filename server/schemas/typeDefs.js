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
      title: String
      description: String
      image: String
      link: String
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password:String!): User
  }
`;



module.exports = typeDefs;
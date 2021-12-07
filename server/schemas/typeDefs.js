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
      bookID: String
      title: String
      description: String
      image: String
      link: String
      user: [User]
  }

  input newBook {
      bookID: String
      title: String
      description: String
      image: String
      link: String
  }

  type Query {
    me: User
    users: [User]
    searchBook: (title:String):[Book]
  }

  type Mutation {
    addUser(username: String!, email: String!, password:String!): User
    login:(username: String!, password:String!)        
    saveBook(input: newBook!): User
    deleteBook(bookID: ID): User
  }
`;



module.exports = typeDefs;
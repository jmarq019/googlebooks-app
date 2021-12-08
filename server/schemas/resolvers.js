const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {

    Query: {
      users: async () => {
        return User.find().populate('savedBooks');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('savedBooks');
      },
      books: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Book.find(params).sort({ createdAt: -1 });
      },
      book: async (parent, { thoughtId }) => {
        return Book.findOne({ _id: bookId });
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('savedBooks');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
    Mutation: {
        addUser: async (parent, args) => {
            return await User.create({
                username: args.username,
                email: args.email, 
                password: args.password
            })
        
        },
        addBook: async (parent, { bookData }, context) => {
            if (context.user) {
              const book = await Book.create({
                bookData,
                user: context.user,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { books: book._id } }
              );
      
              return book;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const book = await Book.findOneAndDelete({
                _id: boookId,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { books: book._id } }
              );
      
              return book;
            }
            throw new AuthenticationError('You need to be logged in!');
          }

    } 

}



module.exports = resolvers; 
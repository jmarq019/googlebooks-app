const { AuthenticationError } = require("apollo-server-express");
const { Book, User } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {

  Query: {
    users: async () => {
      return User.find().populate('savedBooks');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('savedBooks');
    },
    // books: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Book.find(params).sort({ createdAt: -1 });
    // },
    // book: async (parent, { bookId }) => {
    //   return Book.findOne({ _id: bookId });
    // },
    me: async (parent, {args, context}) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks').execPopulate();
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try{
        console.log(args)
      const myUser = await User.create(args)
      const token = signToken(myUser)
      return {token, myUser}
      } catch (err) {
      console.log(err);
      }
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
          _id: bookId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book._id } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    login: async (parent, { email, password }) => {
      console.log("login")
      //look for the user by the email which has to be unique
      const user = await User.findOne({ email });
      //if there is no user with that email address then i need to return a authentication error
      if (!user) {
        throw new AuthenticationError("No user was found");
      }
      //if the user was found, then we need to excecute the 'isCorrectPassword' instance method and check if the password is correct
      const correctPw = await user.isCorrectPassword(password);
      //if the password is not correct then return authentication error
      if(!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }
      //if email and password are correct, then sign the yser into the app with a jwt
      const token = signToken(user);
      return { token, user };
    },
    

  }, 

};



module.exports = resolvers; 
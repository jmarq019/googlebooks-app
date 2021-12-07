const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {

    Query: {
        users: async () =>{
            return await User.find({}).populate("savedBooks");
        },
        me: async (parent, args, context) =>{
             
            const myUser = await User.findOne( 
                { 
                context: _id
                })
            const myNewuser = await myUser.populate("savedBooks").execPopulate();
            return myUser;
            
        },
        searchBook: async (parent, {args, context}) =>{



            if (context.savedBooks) {
                const book = await Book.findOne({
                    title:context.SavedBooks.title
                }
                ).populate("savedBooks");
                return book;
            }
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
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
              const newBook = await Book.create({
                bookData,
                user: context.user,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: savedBooks[ newBook ] }
              );
      
              return book;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeBook: async (parent, { thoughtId }, context) => {
            if (context.user) {
              const book = await Book.findOneAndDelete({
                _id: boookId,
                thoughtAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { books: book._id } }
              );
      
              return book;
            }
            throw new AuthenticationError('You need to be logged in!');
          },

    } 

};



module.exports = resolvers; 
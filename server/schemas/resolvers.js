const { AuthenticationError } = require("apollo-server-express");
const { Book, User } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {

    Query: {


        books: async () => {
            return await Book.find({});
        },
        users: async () =>{
            return await User.find({}).populate("savedBooks");
        }

    }

};



module.exports = resolvers; 
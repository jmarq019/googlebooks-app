const { AuthenticationError } = require("apollo-server-express");
const { User } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {

    Query: {
        users: async () =>{
            return await User.find({}).populate("savedBooks");
        },
        
        singleUser: async (parent, { userId }) => {
            return await User.findOne({ _id: userId });
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            return await User.create({
                username: args.username,
                email: args.email, 
                password: args.password
            })
        }
    } 

};



module.exports = resolvers; 
const { AuthenticationError } = require("apollo-server-express");
const { User } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {

    Query: {
        users: async () =>{
            return await User.find({}).populate("savedBooks");
        },
        me: async (parent, args, context) =>{
             
            const myUser = await User.findOne( 
                { 
                context: user._id
                })
            const myNewuser = await myUser.populate("savedBooks").execPopulate();
            return myUser;
            
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
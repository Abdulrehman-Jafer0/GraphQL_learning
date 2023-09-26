import { USER } from "../modals/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET);
};
export const resolvers = {
  Query: {
    validate: async (parent, args) => {
      const { token } = args;
      try {
        const { user_id } = jwt.verify(token, process.env.SECRET);
        return user_id;
      } catch (error) {
        console.log("JSON verify error", error);
      }
    },
  },

  Mutation: {
    signIn: async (parent, args) => {
      const user = await USER.findOne({ username: args.username });
      if (!user) return "User don't exist";
      const isPasswordCorrect = await bcrypt.compare(
        args.password,
        user.password
      );
      if (!isPasswordCorrect) return "Password incorrect";
      return generateToken({ user_id: user._id });
    },
    createUser: async (parent, args) => {
      const { username, password, confirmPassword } = args;
      if (password !== confirmPassword) {
        return "Password does not match";
      } else {
        const encryptedPassword = await bcrypt.hash(password, 16);
        const newUser = await USER.create({
          username,
          password: encryptedPassword,
        });
        const token = generateToken({ user_id: newUser._id });
        return token;
      }
    },
  },
};

import { ApolloServer } from "apollo-server";
import { config } from "dotenv";
import mongoose from "mongoose";
import { resolvers } from "./schema/resolvers.js";
import { typeDefs } from "./schema/typeDefs.js";

config();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { ...req };
  },
});
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    server
      .listen(3002)
      .then(({ url }) => {
        console.log(`LIVE AT: ${url}`);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log("MongoConnect Error", err));

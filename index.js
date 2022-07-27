const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDef");
const resolvers = require("./graphql/resolver");

const PORT = 4000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: PORT });
  })
  .then(res => {
    console.log(`Server is running at ${res.url}`);
  })
  .catch(err => {
    console.log(err);
  });

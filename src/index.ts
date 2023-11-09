import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";

const app = express();

const port = Number(process.env.PORT) || 8000;

app.use(express.json());

async function init() {
  const server = new ApolloServer({
    typeDefs: `
      type Query {
          hello:String
      }`,
    resolvers: {
      Query: {
        hello: () => {
          return "Hello to graphql";
        },
      },
    },
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to server" });
  });

  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

init();

import "./env";
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "../generated/prisma-client";
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
//서버에 전달되는 모든 요청은 authenticateJwt함수를 통과함.

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

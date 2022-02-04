import express, { Application } from "express";
// import { listings } from "./listings";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";
import cookieParser from "cookie-parser";

/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(cookieParser(process.env.SECRET));

  // console.log(`db:`, db);
  // const app = express();
  const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ db, req, res }) });

  server.applyMiddleware({ app, path: "/api" });
  app.listen(process.env.PORT);
  console.log(`[app] : http://localhost:${process.env.PORT}`);

  app.get("/listings", (_req, res) => res.send(listings));
  // app.post("/delete-listing", (req, res) => {
  //   const id: string = req.body.id;
  //   for (let i = 0; i < listings.length; i++) {
  //     if (listings[i].id === id) {
  //       return res.send(listings.splice(i, 1));
  //     }
  //   }
  //   return res.send("failed to deleted listing");
  const listings = await db.listings.find({}).toArray();
  // console.log(listings);
};
mount(express());

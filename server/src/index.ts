import express, { Application } from "express";
// import { listings } from "./listings";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const port = 9000;
const mount = async (app: Application) => {
  const db = await connectDatabase();

  console.log(`db:`, db); // const app = express();
  const server = new ApolloServer({ typeDefs, resolvers, context: () => db });

  server.applyMiddleware({ app, path: "/api" });
  app.listen(port);
  console.log(`[app] : http://localhost:${port}`);

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

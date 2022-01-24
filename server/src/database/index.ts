import { MongoClient } from "mongodb";
import { Database } from "../lib/types";
const user = "sylvie";
const userPassword = "w46y461231";
const cluster = "cluster0.iws8o";

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);
  const db = client.db("main_data");
  return { listings: db.collection("test_listings"), users: db.collection("users"), purchasings: db.collection("purchasing") };
};

process.env.variables;

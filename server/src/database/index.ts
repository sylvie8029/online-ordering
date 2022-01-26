import { MongoClient } from "mongodb";
import { Database, User, Listing, Ordering } from "../lib/types";

const user = "sylvie";
const userPassword = "w46y461231";
const cluster = "cluster0.iws8o";

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);
  const db = client.db("main_data");
  return { listings: db.collection<Listing>("listings"), users: db.collection<User>("users"), ordering: db.collection<Ordering>("ordering") };
};

process.env.variables;

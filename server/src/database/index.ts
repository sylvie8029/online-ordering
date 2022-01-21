import { MongoClient } from "mongodb";

const user = "sylvie";
const userPassword = "w46y461231";
const cluster = "cluster0.iws8o";

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
export const connectDatabase = async () => {
  const client = await MongoClient.connect(url);
  const db = client.db("main_data");
  return { listings: db.collection("test_listings") };
};

process.env.variables;

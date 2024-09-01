const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, Collection } = require("mongodb");
const bodyparser = require("body-parser");

dotenv.config();

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dNAme = "SecurKey";
const app = express();
const port = 3000;
app.use(bodyparser.json);

client.connect();

// get all passwords from users?
app.get("/", async (req, res) => {
  const db = client.db(dNAme);
  const collection = db.collection("documents");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// post all passwords to db/
app.post("/", async (req, res) => {
  const db = client.db(dNAme);
  const Collection = db.collection("documents");
  const findResult = await Collection.find({}).toArray();
  res.json(req.body);
});

// delete passwords from db/
app.delete("/", async (req, res) => {
  const db = client.db(dNAme);
  const Collection = db.collection("documents");
  const finalResult = await Collection.find({}).toArray();
  res.json(finalResult);
});

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});

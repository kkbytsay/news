import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dbconfig from "./dbconfig.js";

const { Client } = pg;
const client = new Client(dbconfig);
const app = express();
const PORT = 5000;

await client.connect();
app.use(bodyParser.json());

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

app.get("/articles", async (req, res) => {
  const result = await client.query(`SELECT * from news.articles`);
  res.json(result.rows);
});

app.get("/article/:id", async (req, res) => {
  const result = await client.query(
    `SELECT * from news.articles where id = ${req.params.id}`
  );
  res.json(result.rows);
});

app.get("/channels", async (req, res) => {
  const result = await client.query(`SELECT * from news.channels`);
  res.json(result.rows);
});

app.get("/channel/:id", async (req, res) => {
  const result = await client.query(
    `SELECT * from news.channels where id = ${req.params.id}`
  );
  res.json(result.rows);
});

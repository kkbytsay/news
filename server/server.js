import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dbconfig from "./dbconfig.js";
import cors from "cors";
import fetch from "node-fetch";
import { uid } from "uid";

const API_KEY = "9aafd5b663e34f2e9da1282bce109f37";
const { Client } = pg;
const client = new Client(dbconfig);
const app = express();
const PORT = 5000;
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
await client.connect();
app.use(bodyParser.json());

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

const channels = await client.query("SELECT * from news.channels");
const channelsArray = channels.rows.map((item) => {
  return item;
});

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

app.get("/channel/:uuid", async (req, res) => {
  const result = await client.query(
    `SELECT * from news.channels where id = ${req.params.uuid}`
  );
  res.json(result.rows);
});

async function channelsIncludeCheck(channelName) {
  let channelId = null;

  channelsArray.forEach((item) => {
    if (item.name == channelName) {
      channelId = item.id;
    }
  });

  if (channelId === null) {
    channelId = await createChannel(channelName);
  }

  return channelId;
}

async function createChannel(channelName) {
  const channel = {
    id: uid(32),
    name: channelName,
  };

  channelsArray.push(channel);
  const text = "INSERT INTO news.channels(id, name) VALUES($1, $2) RETURNING *";

  const res = await client.query(text, [channel.id, channel.name]);

  return channel.id;
}

async function setArticle(data) {
  const id = await channelsIncludeCheck(data.source.name);

  const text =
    "INSERT INTO news.articles(title, content, channel_id, author, create_date, image_url, id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const values = [
    `${data.title}`,
    `${data.content}`,
    `${id}`,
    `${data.author}`,
    `${data.publishedAt}`,
    `${data.urlToImage}`,
    `${uid(32)}`,
  ];
  const res = await client.query(text, values);
  return res;
}

app.get("/recall", async (req, res) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=politic&apiKey=${API_KEY}`
  );
  const data = await response.json();
  data.articles.map((item) => setArticle(item));
  res.json(data);
});

app.get("/recall/:query", async (req, res) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${req.params.query}&apiKey=${API_KEY}`
  );
  const data = await response.json();
  data.articles.map((item) => setArticle(item));
  res.json(data);
});

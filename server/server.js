import express from "express";
import bodyParser from "body-parser";
import dbconfig from "./config/dbconfig.js";
import cors from "cors";
import fetch from "node-fetch";
import { uid } from "uid";
import { faker } from "@faker-js/faker";
import pkg from "pg";
const { Client } = pkg;
const API_KEY = "9aafd5b663e34f2e9da1282bce109f37";

const app = express();
const PORT = 5000;
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
const main = async () => {
  const client = new Client(dbconfig);
  await client.connect();

  app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
  });

  const getChannels = async () => {
    try {
      const { rows } = await client.query("SELECT * FROM news.channels");
      return rows;
    } catch (error) {
      console.error("Error fetching channels:", error);
      throw error;
    }
  };

  const channelsArray = await getChannels();

  const channelsIncludeCheck = async (channelName) => {
    try {
      const channel = channelsArray.find((item) => item.name === channelName);
      if (channel) {
        return channel.id;
      }
      return await createChannel(channelName);
    } catch (error) {
      console.error("Error checking channel existence:", error);
      throw error;
    }
  };

  const createChannel = async (channelName) => {
    try {
      const channel = { id: uid(32), name: channelName };
      channelsArray.push(channel);
      const { rows } = await client.query(
        "INSERT INTO news.channels(id, name) VALUES($1, $2) RETURNING *",
        [channel.id, channel.name]
      );
      return rows[0].id;
    } catch (error) {
      console.error("Error creating channel:", error);
      throw error;
    }
  };

  const setArticle = async (data) => {
    try {
      const channelId = await channelsIncludeCheck(data.source.name);
      const text = faker.lorem.paragraphs(15);
      const { rows } = await client.query(
        "INSERT INTO news.articles(title, content, channel_id, author, create_date, image_url, id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          data.title,
          text,
          channelId,
          data.author,
          data.publishedAt,
          data.urlToImage,
          uid(32),
        ]
      );
      return rows[0];
    } catch (error) {
      console.error("Error setting article:", error);
      throw error;
    }
  };

  const getPosts = async (req, res) => {
    try {
      const { rows } = await client.query("SELECT * FROM news.articles");
      res.json({ count: rows.length, items: rows });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Error fetching posts" });
    }
  };

  const getPostsByChannel = async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await client.query(
        "SELECT * FROM news.articles WHERE channel_id = $1",
        [id]
      );
      res.json({ items: rows, count: rows.length });
    } catch (error) {
      console.error("Error fetching posts by channel:", error);
      res.status(500).json({ error: "Error fetching posts by channel" });
    }
  };

  const getPostsWithPagination = async (req, res) => {
    try {
      const { page, pageSize } = req.params;
      const { rows } = await client.query("SELECT * FROM news.articles");
      const pageItems = paginationResults(page, pageSize, rows);
      res.json({ count: rows.length, items: pageItems });
    } catch (error) {
      console.error("Error fetching posts with pagination:", error);
      res.status(500).json({ error: "Error fetching posts with pagination" });
    }
  };

  const getChannel = async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await client.query(
        "SELECT * FROM news.channels WHERE id = $1",
        [id]
      );
      if (rows.length === 0) {
        res.status(404).json({ error: "Channel not found" });
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      console.error("Error fetching channel:", error);
      res.status(500).json({ error: "Error fetching channel" });
    }
  };

  const getChannelCount = async (req, res) => {
    try {
      const { id } = req.params;
      const { rows } = await client.query(
        "SELECT COUNT(*) FROM news.articles WHERE channel_id = $1",
        [id]
      );
      res.json({ count: rows[0].count });
    } catch (error) {
      console.error("Error fetching channel count:", error);
      res.status(500).json({ error: "Error fetching channel count" });
    }
  };

  const paginationResults = (page, pageSize, data) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return data.slice(startIndex, endIndex);
  };

  const recallArticles = async (req, res) => {
    try {
      const query = req.params.query || "politic";
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      await Promise.all(data.articles.map((item) => setArticle(item)));
      res.json(data);
    } catch (error) {
      console.error("Error recalling articles:", error);
      res.status(500).json({ error: "Error recalling articles" });
    }
  };

  const getChannelsWithArticles = async (req, res) => {
    try {
      const query = `
      SELECT
        c.id AS channel_id,
        c.name AS channel_name,
        json_agg(
          json_build_object(
            'id', a.id,
            'title', a.title,
            'content', a.content,
            'author', a.author,
            'create_date', a.create_date,
            'image_url', a.image_url
          )
        ) AS articles
      FROM news.channels c
      LEFT JOIN news.articles a ON c.id = a.channel_id
      GROUP BY c.id, c.name
    `;

      const { rows } = await client.query(query);

      const result = rows.map((row) => ({
        channel: {
          id: row.channel_id,
          name: row.channel_name,
        },
        articles: row.articles,
      }));

      res.json(result);
    } catch (error) {
      console.error("Error fetching channels with articles:", error);
      res.status(500).json({ error: "Error fetching channels with articles" });
    }
  };

  const getPost = async (id) => {
    try {
      const { rows } = await client.query(
        "SELECT * FROM news.articles WHERE id = $1",
        [id]
      );

      if (rows.length === 0) {
        throw new Error("Article not found");
      }

      return rows[0];
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  };

  const getPostsByChannelWithPagination = async (req, res) => {
    try {
      const { id } = req.params;
      const { page, pageSize } = req.params;

      const { rows } = await client.query(
        "SELECT * FROM news.articles WHERE channel_id = $1",
        [id]
      );

      const pageItems = paginationResults(Number(page), Number(pageSize), rows);

      res.json({ count: rows.length, items: pageItems });
    } catch (error) {
      console.error("Error fetching posts by channel with pagination:", error);
      res
        .status(500)
        .json({ error: "Error fetching posts by channel with pagination" });
    }
  };

  const getArticlesCount = async (req, res) => {
    try {
      const { rows } = await client.query("SELECT COUNT(*) FROM news.articles");
      res.json({ count: parseInt(rows[0].count) });
    } catch (error) {
      console.error("Error fetching articles count:", error);
      res.status(500).json({ error: "Error fetching articles count" });
    }
  };

  app.get("/articles", getPosts);
  app.get("/articles/count", getArticlesCount);
  app.get("/article/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const article = await getPost(id);
      res.json(article);
    } catch (error) {
      if (error.message === "Article not found") {
        res.status(404).json({ error: error.message });
      } else {
        console.error("Error fetching article:", error);
        res.status(500).json({ error: "Error fetching article" });
      }
    }
  });
  app.get("/articles/channel/:id", getPostsByChannel);
  app.get("/articles/params/:page&:pageSize", getPostsWithPagination);
  app.get("/channels", async (req, res) => {
    try {
      const channels = await getChannels();
      res.json(channels);
    } catch (error) {
      console.error("Error fetching channels:", error);
      res.status(500).json({ error: "Error fetching channels" });
    }
  });

  app.get(
    "/articles/channel/:id/params/:page&:pageSize",
    getPostsByChannelWithPagination
  );
  app.get("/channel/:id", getChannel);
  app.get("/channel/:id/count", getChannelCount);
  app.get("/recall", recallArticles);
  app.get("/recall/:query", recallArticles);
  app.get("/channels/explore", getChannelsWithArticles);
};

main().catch((err) => {
  console.error("Error in main function:", err);
});

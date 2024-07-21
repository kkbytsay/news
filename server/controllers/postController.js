import * as postService from "../services/postService.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsWithPagination = async (req, res) => {
  try {
    const posts = await postService.getPostsWithPagination(req);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsByChannel = async (req, res) => {
  try {
    const posts = await postService.getPostsByChannel(req);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsByCahnnelWithPagination = async (req, res) => {
  try {
    const posts = await postService.getPostsByCahnnelWithPagination(req);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsCount = async (req, res) => {
  try {
    const posts = await postService.getPostsCount();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await postService.getPost(req);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

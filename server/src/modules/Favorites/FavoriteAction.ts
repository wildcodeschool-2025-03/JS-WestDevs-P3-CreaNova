import type { RequestHandler } from "express";
import favoriteRepository from "./FavoriteRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const result = await favoriteRepository.readAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const favoriteArtwork: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const result = await favoriteRepository.readByUserId(userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  favoriteArtwork,
};

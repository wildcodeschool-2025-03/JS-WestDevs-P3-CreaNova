import type { RequestHandler } from "express";
import FavoriteRepository from "./favoriteRepository";


const browse: RequestHandler = async (req, res, next) => {
  try {
    const result = await FavoriteRepository.readAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const favoriteArtwork: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const result = await FavoriteRepository.readByUserId(userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const addFavorite: RequestHandler = async (req, res, next) => {
  try {
    const { userId, artworkId } = req.body;
    await FavoriteRepository.create(userId, artworkId);
    res.status(201).json("Favorite added");
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  favoriteArtwork,
  addFavorite,
};

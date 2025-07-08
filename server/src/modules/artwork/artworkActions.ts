import type { RequestHandler } from "express";
import artworkRepository from "./artworkRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const result = await artworkRepository.readAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const readArtworkCategory: RequestHandler = async (req, res, next) => {
  try {
    const result = await artworkRepository.readArtworkCategory();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const readUserAccount: RequestHandler = async (req, res, next) => {
  try {
    const user_account_id = Number(req.params.id);
    const result = await artworkRepository.readUserAccount(user_account_id);

    if (result == null) {
      res.sendStatus(404).json("There is a mistake 😳");
    } else {
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

const browseCarouselArtworks: RequestHandler = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const result = await artworkRepository.readCarouselArtwork(categoryName);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const newArtwork = {
      id: Number(req.params.id),
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
    };
    const result = await artworkRepository.update(newArtwork);
    if (result === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browseCarouselArtworks,
  browse,
  readArtworkCategory,
  readUserAccount,
  edit,
};

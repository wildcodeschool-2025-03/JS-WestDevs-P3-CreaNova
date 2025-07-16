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

const readArtworkById: RequestHandler = async (req, res, next) => {
  try {
    const artworkId = Number(req.params.id);
    const result = await artworkRepository.readArtworkById(artworkId);

    if (!result) {
      res.status(404).json("Artwork not found");
    } else {
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

const readArtworkWithArtistById: RequestHandler = async (req, res, next) => {
  try {
    const artworkId = Number(req.params.id);
    const result = await artworkRepository.readArtworkWithArtistById(artworkId);

    if (!result) {
      res.status(404).json("Artwork not found");
    } else {
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

const readArtworkCategory: RequestHandler = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const result = await artworkRepository.readArtworkCategory(categoryName);
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

const readArtworkUserById: RequestHandler = async (req, res, next) => {
  try {
    const artwork_id = Number(req.params.artworkId);
    const user_account_id = Number(req.params.userId);
    const result = await artworkRepository.readArtworkUserById(
      user_account_id,
      artwork_id,
    );
    if (!result) {
      res.status(404).json("There is a problem on your reader by id");
    } else {
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};
const createArtwork: RequestHandler = async (req, res, next) => {
  try {
    const createArtwork = await artworkRepository.createArtwork(req.body);
    if (createArtwork) {
      res.status(200).json("The work is added 🎊");
    } else {
      res.status(404).json("Artwork not created 🤨");
    }
  } catch (err) {
    next(err);
  }
};
const deleteArtwork: RequestHandler = async (req, res, next) => {
  try {
    const artworkId = Number(req.params.id);
    if (!artworkId || artworkId <= 0) {
      res.status(404).json("Cannot be null");
    }
    const deleteArtwork = await artworkRepository.delete(artworkId);
    if (deleteArtwork === 0) {
      res.status(404).json("Artwork not found");
      return;
    }
    res.status(200).json("Artwork deleted");
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
      res.status(200).json(newArtwork);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browseCarouselArtworks,
  browse,
  readArtworkById,
  readArtworkWithArtistById,
  readArtworkCategory,
  readUserAccount,
  edit,
  readArtworkUserById,
  createArtwork,
  deleteArtwork,
};

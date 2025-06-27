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

export default { browse, readArtworkCategory, readUserAccount };

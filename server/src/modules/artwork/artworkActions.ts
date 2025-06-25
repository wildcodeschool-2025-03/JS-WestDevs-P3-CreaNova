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

const browseValidated: RequestHandler = async (req, res, next) => {
  try {
    const result = await artworkRepository.readValidated();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const readUserAccount: RequestHandler = async (req, res, next) => {
  try {
    const user_account_id = Number(req.params.id);
    const result = await artworkRepository.readUserAccount();

    if (result == null) {
      res.sendStatus(404).json("There is a mistake 😳");
    } else {
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, browseValidated, readUserAccount };

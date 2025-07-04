import type { RequestHandler } from "express";
import collectionRepository from "./collectionRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const result = await collectionRepository.readAll();
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
};

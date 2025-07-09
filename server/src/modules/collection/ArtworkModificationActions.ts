import type { RequestHandler } from "express";
import ArtworkModificationRepository from "./ArtworkModificationRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const result = await ArtworkModificationRepository.readAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
};

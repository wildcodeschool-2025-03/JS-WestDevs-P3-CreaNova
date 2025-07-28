import type { RequestHandler } from "express";
import newRepository from "./newRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const news = await newRepository.readAll();
    res.json(news);
  } catch (err) {
    next(err);
  }
};

export default { browse };

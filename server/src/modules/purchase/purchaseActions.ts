import type { RequestHandler } from "express";
import purchaseRepository from "./purchaseRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const result = await purchaseRepository.readAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
const purchaseArtworks: RequestHandler = async (req, res, next) => {
  try {
    const result = await purchaseRepository.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export default { browse, purchaseArtworks };

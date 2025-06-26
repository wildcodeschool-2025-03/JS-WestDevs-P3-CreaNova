import type { RequestHandler } from "express";
import artworkRepository from "./artworkRepository";

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

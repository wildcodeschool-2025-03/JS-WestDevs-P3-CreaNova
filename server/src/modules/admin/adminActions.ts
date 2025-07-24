import type { RequestHandler } from "express";
import adminRepository from "./adminRepository";

const browseArtworks: RequestHandler = async (req, res, next) => {
  try {
    const artworks = await adminRepository.readAllArtworks();
    res.json(artworks);
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
    const deleteArtwork = await adminRepository.deleteArtwork(artworkId);
    if (deleteArtwork === 0) {
      res.status(404).json("Artwork not found");
      return;
    }
    res.status(200).json("Artwork deleted");
  } catch (err) {
    next(err);
  }
};

export default { browseArtworks, deleteArtwork };

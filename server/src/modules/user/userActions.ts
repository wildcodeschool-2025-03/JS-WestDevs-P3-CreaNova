import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const result = await userRepository.readAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
const browseArtists: RequestHandler = async (req, res, next) => {
  try {
    const result = await userRepository.readArtists();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
const browseArtistArtworks: RequestHandler = async (req, res, next) => {
  try {
    const artistId = Number(req.params.id);
    const result = await userRepository.readArtistArtworks(artistId);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res) => {
  try {
    const user = await userRepository.create(req.body);
    if (user) {
      res.status(201).json("Your account has been created !");
    } else {
      res.status(404).json("Something went wrong");
    }
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};

const editUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    if (Number.isNaN(userId)) {
      res.status(400).json("Invalid user ID");
      return;
    }

    const affectedRows = await userRepository.updateId(userId, req.body);

    if (affectedRows === 0) {
      res.status(404).json("User not found");
      return;
    }
    res.status(200).json("User updated successfully");
  } catch (err) {
    next(err);
  }
};

export default { add, browse, browseArtists, browseArtistArtworks, editUser };

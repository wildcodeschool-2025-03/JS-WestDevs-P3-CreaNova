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

export default { add, browse, browseArtists };

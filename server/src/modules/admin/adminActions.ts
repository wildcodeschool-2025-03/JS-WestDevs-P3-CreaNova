import type { RequestHandler } from "express";
import adminRepository from "./adminRepository";

const browseUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await adminRepository.readAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};
const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    if (!userId || userId <= 0) {
      res.status(404).json("Cannot be null");
    }
    const deleteUser = await adminRepository.deleteUser(userId);
    if (deleteUser === 0) {
      res.status(404).json("User not found");
      return;
    }
    res.status(200).json("User deleted");
  } catch (err) {
    next(err);
  }
};

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

const browseNews: RequestHandler = async (req, res, next) => {
  try {
    const news = await adminRepository.readAllNews();
    res.json(news);
  } catch (err) {
    next(err);
  }
};

const editNews: RequestHandler = async (req, res, next) => {
  try {
    const updatedNew = {
      id: Number(req.params.id),
      title: req.body.title,
      image: req.body.image,
      text: req.body.text,
      created_by: 8,
    };
    const result = await adminRepository.updateNew(updatedNew);
    if (result === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(updatedNew);
    }
  } catch (err) {
    next(err);
  }
};
const browseEvents: RequestHandler = async (req, res, next) => {
  try {
    const events = await adminRepository.readAllEvents();
    res.json(events);
  } catch (err) {
    next(err);
  }
};
const editEvent: RequestHandler = async (req, res, next) => {
  try {
    const updatedEvent = {
      id: Number(req.params.id),
      title: req.body.title,
      image: req.body.image,
      text: req.body.text,
      date: req.body.date,
      created_by: 8,
    };
    const result = await adminRepository.updateEvent(updatedEvent);
    if (result === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(updatedEvent);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browseUsers,
  deleteUser,
  browseArtworks,
  deleteArtwork,
  browseNews,
  editNews,
  browseEvents,
  editEvent,
};

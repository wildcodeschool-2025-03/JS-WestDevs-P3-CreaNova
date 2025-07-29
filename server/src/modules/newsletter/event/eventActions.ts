import type { RequestHandler } from "express";
import eventRepository from "./eventRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventRepository.readAll();
    res.json(events);
  } catch (err) {
    next(err);
  }
};
export default { browse };

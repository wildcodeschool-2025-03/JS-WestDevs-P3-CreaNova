import argon2 from "argon2";
import type { RequestHandler } from "express";

const hashedPassword: RequestHandler = async (req, res, next) => {
  const hash = await argon2.hash(req.body.password);

  req.body.password = hash;
  next();
};

export default { hashedPassword };

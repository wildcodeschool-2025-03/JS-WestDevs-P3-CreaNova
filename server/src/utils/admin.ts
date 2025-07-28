import type { RequestHandler } from "express";

const adminAuth: RequestHandler = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }
  res.status(403).json("Admin access required");
  return;
};

export default { adminAuth };

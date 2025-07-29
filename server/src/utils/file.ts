import crypto from "node:crypto";
import path from "node:path";
import type { RequestHandler } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "public/");
  },
  filename(req, file, callback) {
    const base = path.basename(file.originalname).toLowerCase();
    const ext = path.extname(file.originalname).toLowerCase();
    const id = crypto.randomUUID();
    callback(null, `${base}_${id}${ext}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 },
});

const imageUpload = upload.single("image");

const appImage: RequestHandler = (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.filename}`;
    }
    next();
  } catch (err) {
    next(err);
  }
};
export default { imageUpload, appImage };

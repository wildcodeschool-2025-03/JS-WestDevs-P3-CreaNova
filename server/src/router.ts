import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";
import auth from "./utils/auth";
import validation from "./utils/validation";
import artworkActions from "./modules/artwork/artworkActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */
router.post(
  "/api/user",
  validation.userValidation,
  auth.hashedPassword,
  userActions.add,
);
router.get("/api/user", userActions.browse);
router.get("/api/artist", userActions.browseArtists);
router.get("/api/artist/:id", userActions.browseArtistArtworks);

/* ************************************************************************* */
router.get(
  "/api/carousel/:categoryName",
  artworkActions.browseCarouselArtworks,
);

export default router;

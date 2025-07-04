import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import artworkActions from "./modules/artwork/artworkActions";
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";
import auth from "./utils/auth";
import validation from "./utils/validation";

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

router.post("/api/login", auth.login);
router.post("/api/logout", auth.logout);
router.get("/api/refresh-token", auth.refreshToken);
router.get("/api/user", userActions.browse);
router.get("/api/artist", userActions.browseArtists);

/* ************************************************************************* */
router.get("/api/artwork", artworkActions.browse);
router.get("/api/artwork/artwork-category", artworkActions.readArtworkCategory);
router.get("/api/artwork/:id", artworkActions.readUserAccount);

router.get("/api/artist/:id", userActions.browseArtistArtworks);

router.get("/api/user/:id", userActions.getUserById);
router.put("/api/user/:id", userActions.editUser);

/* ************************************************************************* */
router.get(
  "/api/carousel/:categoryName",
  artworkActions.browseCarouselArtworks,
);

export default router;

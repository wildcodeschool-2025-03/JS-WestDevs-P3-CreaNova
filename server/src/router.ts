import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import artworkActions from "./modules/artwork/artworkActions";
import itemActions from "./modules/item/itemActions";
import purchaseActions from "./modules/purchase/purchaseActions";
import userActions from "./modules/user/userActions";
import auth from "./utils/auth";
import validation from "./utils/validation";
import FavoriteAction from "./modules/Favorites/FavoriteAction";

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
router.get("/api/logout", auth.logout);
router.get("/api/refresh-token", auth.refreshToken);
router.get("/api/user", userActions.browse);
router.get("/api/artist", userActions.browseArtists);

/* ************************************************************************* */
router.get("/api/artwork", artworkActions.browse);
router.get("/api/artwork/artwork-category", artworkActions.readArtworkCategory);
<<<<<<< HEAD
<<<<<<< HEAD
router.get("/api/artwork/:id", artworkActions.readUserAccount);
router.get("/api/user/:userId/favorite", FavoriteAction.favoriteArtwork);
=======
=======
router.get(
  "/api/artwork/category/:categoryName",
  artworkActions.readArtworkCategory,
);
>>>>>>> 8a1fa9f8308cfeef2e352c8a171d89df18d19311
router.get("/api/artwork/:id", artworkActions.readArtworkById);
>>>>>>> dcc01915000f79272372ed96b181cbd8fddbbaa2
router.put("/api/artwork/:id", artworkActions.edit);
router.get("/api/artist/:id/artworks", artworkActions.readUserAccount);
router.get(
  "/api/artist/:userId/artworks/:artworkId",
  artworkActions.readArtworkUserById,
);
router.delete("/api/artworks/:id", artworkActions.deleteArtwork);
router.post("/api/artworks", artworkActions.createArtwork);

router.get("/api/artist/:id", userActions.browseArtistArtworks);

router.get("/api/user/:id", userActions.getUserById);
router.put("/api/user/:id", userActions.editUser);

/* ************************************************************************* */
router.get(
  "/api/carousel/:categoryName",
  artworkActions.browseCarouselArtworks,
);

/* ************************************************************************* */
router.get("/api/purchase", purchaseActions.browse);
router.post("/api/purchase", purchaseActions.purchaseArtworks);
export default router;

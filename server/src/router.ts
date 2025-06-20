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
export default router;

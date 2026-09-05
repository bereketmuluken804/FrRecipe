import { Router } from "express";
import {
	createRecipe,
	getAllRecipes,
	getRecipe,
	deleteRecipe,
	updateRecipe,
	getMyRecipes,
	getFavorites,
} from "./recipe.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import optionalAuth from "../../middleware/optionalAuth.js";
import {
	toggleFavorite,
	toggleLike,
} from "../engagement/engagement.controller.js";

const recipeRouter = Router();
recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/mine", authMiddleware, getMyRecipes);
recipeRouter.get("/favorites", authMiddleware, getFavorites);
recipeRouter.get("/:id", optionalAuth, getRecipe);
recipeRouter.use(authMiddleware);
recipeRouter.post("/", createRecipe);
recipeRouter.delete("/:id", deleteRecipe);
recipeRouter.patch("/:id", updateRecipe);
recipeRouter.post("/:id/like", toggleLike);
recipeRouter.post("/:id/favorite", toggleFavorite);
export default recipeRouter;

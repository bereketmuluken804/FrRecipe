import { Router } from "express";
import { createRecipe, getAllRecipes, getRecipe, deleteRecipe, updateRecipe } from "./recipe.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import optionalAuth from "../../middleware/optionalAuth.js";

const recipeRouter = Router();
recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:id", optionalAuth, getRecipe)
recipeRouter.use(authMiddleware);
recipeRouter.post("/", createRecipe);
recipeRouter.delete("/:id", deleteRecipe )
recipeRouter.patch("/:id", updateRecipe)

export default recipeRouter
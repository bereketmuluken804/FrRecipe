import Recipe from "../../models/Recipe.js";


export async function getAllRecipes(req, res) {
	const recipes = await Recipe.find({ isPublic: true });
	res.status(200).json({
		recipes,
	});
}

export async function getMyRecipes(req, res) {	
	const recipes = await Recipe.find({userId: req.user.id});
	res.status(200).json({
		recipes
	})
}

export async function getRecipe(req, res) {
	const recipe = await Recipe.findById(req.params.id);
	if (!recipe) {
		return res.status(404).json({
			message: "recipe not found",
		});
	}
	if (!recipe.isPublic) {
		if (!req?.user || req.user.id.toString() !== recipe.userId.toString()) {
			return res.status(404).json({
				message: "Recipe not found",
			});
		}
	}

	res.status(200).json({
		recipe,
	});
}
export async function getFavorites(req, res) {
	res.status(200).json({
		recipes: req.user.favoriteRecipes
	})
}
export async function createRecipe(req, res) {
	if (!req.body?.title) {
		return res.status(400).json({
			message: "Bad request: title required",
		});
	}
	const user = req.user;
	const {
		title,
		description,
		category,
		ingredients,
		instructions,
		image,
		isPublic,
	} = req.body;
	if (!(title && description && category && ingredients && instructions)) {
		return res.status(400).json({
			message: "Bad request: pass all neccessary inputs",
		});
	}
	const recipe = Recipe({
		title,
		description,
		category,
		ingredients,
		instructions,
		image,
		isPublic,
		userId: user.id,
	});

	const newRecipe = await recipe.save();
	res.status(201).json({
		recipe: newRecipe
	});
}
 

export async function updateRecipe(req, res){
	
	const recipe = await Recipe.findById(req.params.id);
	if (!recipe) {
		return res.status(404).json({
			message: "Recipe not found",
		});
	}
	if(recipe.userId.toString() !== req.user.id.toString()){
		return res.status(403).json({
			message: "Forbidded: access denied to edit recipe",
		});
	}
	const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})
	res.status(200).json({
		recipe: updated
	})
}


export async function deleteRecipe(req, res) {
	const recipe = await Recipe.findById(req.params.id);
	if (!recipe) {
		return res.status(404).json({
			message: "Recipe not found",
		});
	}
	if(recipe.userId.toString() !== req.user.id.toString()){
		return res.status(403).json({
			message: "Forbidded: access denied to delete recipe",
		});
	}
	await Recipe.findByIdAndDelete(recipe.id);
	res.status(204).end()
}

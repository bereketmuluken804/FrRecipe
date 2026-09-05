import Recipe from "../../models/Recipe.js";

export async function toggleLike(req, res) {
	const recipe = await Recipe.findById(req.params.id);
	if (!recipe || !recipe.isPublic) {
		return res.status(404).json({
			message: "Recipe not found",
		});
	}


	const user = req.user;
	let likeCount = recipe.likeCount;
	let likedRecipes = user.likedRecipes;
	const liked = likedRecipes.some(id => id.toString() === recipe.id.toString())

	if (liked) {
		likeCount = likeCount - 1 > 0 ? likeCount - 1 : 0;
		likedRecipes = likedRecipes.filter(id => id.toString() !== req.params.id.toString());
	} else {
		likeCount++;
		likedRecipes.push(recipe.id);
	}

	user.likedRecipes = likedRecipes;
  recipe.likeCount = likeCount;
	await user.save();
	await recipe.save();

  res.status(200).json({
    likedRecipes: user.likedRecipes,
    likeCount: recipe.likeCount
  })
}

export async function toggleFavorite(req, res) {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
		return res.status(404).json({
			message: "Recipe not found",
		});
	}

  const user = req.user;
  let favoriteRecipes = user.favoriteRecipes;
  const favorited = favoriteRecipes.some(id=> id.toString() === recipe.id.toString());
  if(favorited){
    favoriteRecipes = favoriteRecipes.filter(id => id.toString() !== recipe.id.toString());
  }else{
   favoriteRecipes.push(recipe.id);
  }

  user.favoriteRecipes = favoriteRecipes;
  await user.save();

  res.status(200).json({
    favoriteRecipes: user.favoriteRecipes
  })
}

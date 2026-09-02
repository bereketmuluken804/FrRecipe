const BASE_URL = "http://localhost:3001"

export async function getAllRecipes() {
  const response = await fetch(`${BASE_URL}/recipes`);
  if(!response.ok) throw new Error("Failed to load recipes")
  const recipes = await response.json();
  return recipes;
}

export async function getRecipe(id) {
  const response = await fetch(`${BASE_URL}/recipes/${id}`)
  if(!response.ok) throw new Error("Failed to load recipe")
  const recipe = await response.json();
  return recipe;
}

export async function createRecipe(recipeData) {
   const response = await fetch(`${BASE_URL}/recipes`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(recipeData)
   })
   if(!response.ok){ throw new Error("Failed to create recipe")}
   const newRecipe = await response.json();
   return newRecipe
}

export async function updateRecipe(id, recipeData) {
  const response = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(recipeData)
   })
    if(!response.ok){ throw new Error("Failed to create recipe")}
   const updatedRecipe = await response.json();
   return updatedRecipe;
}

export async function deleteRecipe(id) {
  const response = await fetch(`${BASE_URL}/recipes/${id}`, {method: "DELETE"})
    if(!response.ok){ throw new Error("Failed to delete recipe")}
}


export async function toggleLike(recipeId, userId, likedRecipes) {
  const recipe = await getRecipe(recipeId);
  let val = 1;
  if(likedRecipes.includes(recipeId)){
    val = -1;
    likedRecipes = likedRecipes.filter(id=> id !== recipeId)
  }
  else{
    likedRecipes = likedRecipes.concat(recipeId)
  }
  const recipeRes = await fetch(`${BASE_URL}/recipes/${recipeId}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"likeCount": recipe.likeCount + val})
  })

  const userRes = await fetch(`${BASE_URL}/users/${userId}`,{
    method: "PATCH",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify( {"likedRecipes": likedRecipes})
  })
  if(!userRes.ok || !recipeRes.ok){
    throw new Error("Failed to like")
  }
  const updatedRecipe = await recipeRes.json();
  const updatedUser = await userRes.json()
  return {likeCount: updatedRecipe.likeCount, likedRecipes: updatedUser.likedRecipes};
}

export async function toogleFavorite(userId, recipeId, favoriteRecipes) {
  let updateList;
  if(favoriteRecipes.includes(recipeId)){
    updateList = favoriteRecipes.filter(id=> id !== recipeId)
  }
  else{
    updateList = favoriteRecipes.concat(recipeId)
  }
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify( {"favoriteRecipes": updateList})
  })
  if(!response.ok){
    throw new Error("Failed to Favorite")
  }
  const user = await response.json();
  return {favoriteRecipes: user.favoriteRecipes}

}


export function filterRecipes(recipes, category, keyword) {
  let result = recipes;

  if(category !== "All"){
    result = result.filter(recipe=>recipe.category === category)
  }
  if(keyword.trim() !== ""){
    result = result.filter(recipe=> 
      recipe.title.toLowerCase().includes(keyword.toLowerCase())
    )
  }
  
  return result
}
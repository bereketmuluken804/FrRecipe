import { useState, useEffect, useMemo } from "react";
import { getAllRecipes, toggleLike, toogleFavorite } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { filterRecipes } from "../utils/filters";
import { useAuth } from "../context/AuthContext";
import "./PublicRecipesPage.css";

function PublicRecipesPage() {
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(null);
	const [keyword, setKeyword] = useState("");
	const [category, setCategory] = useState("All");
	const { user, login } = useAuth();
	useEffect(() => {
		async function loadRecipes() {
			try {
				const response = await getAllRecipes();
				setRecipes(
					response.filter((recipe) => recipe.isPublic === true),
				);
			} catch (err) {
				setError("Failed to load recipes");
			}
		}
		loadRecipes();
	}, []);

	const showRecipes = useMemo(
		() => filterRecipes(recipes, category, keyword),
		[recipes, category, keyword],
	);

	async function onLike(recipeId) {
		const response = await toggleLike(recipeId, user.id, user.likedRecipes);
		login({ ...user, likedRecipes: response.likedRecipes });

		setRecipes((prev) =>
			prev.map((recipe) =>
				recipe.id === recipeId
					? { ...recipe, likeCount: response.likeCount }
					: recipe,
			),
		);
	}
	const allCategories = recipes.reduce((acc, recipe)=>{
		if(!acc.categories.includes(recipe.category)){
			acc.categories = acc.categories.concat(recipe.category)
		}
		return acc;
	},{categories: []}).categories;
	async function onDelete(id) {
		const recipe = myRecipes.find((recipe) => recipe.id === id);
		if (
			window.confirm(`Are you sure you want to delete ${recipe.title}?`)
		) {
			await deleteRecipe(id);
			setRecipes(myRecipes.filter((recipe) => recipe.id !== id));
		}
	}
	async function handleFavorite(userId, recipeId, favoriteRecipes) {
		try {
			const response = await toogleFavorite(
				userId,
				recipeId,
				favoriteRecipes,
			);
			login({ ...user, favoriteRecipes: response.favoriteRecipes });
		} catch (error) {
			console.log(error.message);
		}
	}
	return (
		<div className="public-page">
			<h1>Explore Recipes</h1>
			<div className="filters-row">
				<SearchBar
					recipes={recipes}
					onSearch={(e) => setKeyword(e.target.value)}
					keyword={keyword}
				/>

				<select
					name="category"
					className="category-select"
					onChange={(e) => setCategory(e.target.value)}
					value={category}
				>
					<option value="All">All</option>
					{allCategories.map((cat, index)=> {return <option key={index} value={cat}>{cat}</option>})}
					
				</select>
			</div>

			
			<div className="empty-state">
				{error && <p>{error}</p>}
				{!error && showRecipes.length === 0 && (
					<p>Loading...</p>
				)}
			</div>
			<div className="recipe-cont">
				<ul className="recipe-cont">
					{showRecipes.map((recipe) => {
						return (
							<RecipeCard
								key={recipe.id}
								recipe={recipe}
								onLike={onLike}
								handleFavorite={handleFavorite}
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default PublicRecipesPage;

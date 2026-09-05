import {
	getAllRecipes,
	createRecipe,
	updateRecipe,
	deleteRecipe,
	toogleFavorite,
	getMyRecipes,
} from "../services/recipeService";
import { toggleLike } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./MykitchenPage.css";
import { useNavigate } from "react-router-dom";

function MykitchenPage() {
	const [recipes, setRecipes] = useState([]);
	const [myRecipes, setMyRecipes] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [activeTab, setActiveTab] = useState("mine");
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const { user, login } = useAuth();
	useEffect(() => {
		async function loadMyRecipes() {
			try {
				const all = await getMyRecipes();
				const mine = all.filter((recipe) => recipe.userId === user.id);
				const fav = all.filter((recipe) =>
					user.favoriteRecipes.includes(recipe.id),
				);
				setRecipes(all);
				setMyRecipes(mine);
				setFavorites(fav);
			} catch (err) {
				setError("Failed to load Recipes");
			}
		}
		loadMyRecipes();
	}, []);

	async function onLike(recipeId) {
		const response = await toggleLike(recipeId, user.id, user.likedRecipes);
		login({ ...user, likedRecipes: response.likedRecipes });

		setMyRecipes((prev) =>
			prev.map((recipe) =>
				recipe.id === recipeId
					? { ...recipe, likeCount: response.likeCount }
					: recipe,
			),
		);

		setFavorites((prev) =>
			prev.map((recipe) =>
				recipe.id === recipeId
					? { ...recipe, likeCount: response.likeCount }
					: recipe,
			),
		);
	}

	async function onDelete(id) {
		const recipe = myRecipes.find((recipe) => recipe.id === id);
		if (
			window.confirm(`Are you sure you want to delete ${recipe.title}?`)
		) {
			await deleteRecipe(id);
			setMyRecipes(myRecipes.filter((recipe) => recipe.id !== id));
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
			setFavorites(
				recipes.filter((recipe) =>
					response.favoriteRecipes.includes(recipe.id),
				),
			);
		} catch (error) {
			console.log(error.message);
		}
	}

	const toShow = activeTab === "mine" ? myRecipes : favorites;
	return (
		<div className="kitchen-page">
			<h1>Kitchen</h1>
			<div className="tabs">
				<button
					className={activeTab === "mine" ? "active-tab" : ""}
					onClick={() => setActiveTab("mine")}
				>
					My Recipes
				</button>
				<button
					className={activeTab !== "mine" ? "active-tab" : ""}
					onClick={() => setActiveTab("favorites")}
				>
					Favorites
				</button>
				<button
					id="new-recipe"
					onClick={() => navigate("/my-kitchen/new")}
				>
					New Recipe +
				</button>
			</div>

			<div className="empty-state">
				{toShow.length === 0 && activeTab === "mine" && !error && (
					<p>Create your first recipe.</p>
				)}
				{toShow.length === 0 && activeTab === "favorites" && !error && (
					<p>Favorited recipes will appear here.</p>
				)}

				{error && <p>{error}</p>}
			</div>
			<ul className="recipe-cont">
				{toShow.map((recipe) => {
					return (
						<RecipeCard
							key={recipe.id}
							recipe={recipe}
							onLike={onLike}
							onDelete={onDelete}
							handleFavorite={handleFavorite}
						/>
					);
				})}
			</ul>
		</div>
	);
}

export default MykitchenPage;

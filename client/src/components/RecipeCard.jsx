import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./RecipeCard.css";

function RecipeCard({ recipe, onLike, onEdit, onDelete, handleFavorite }) {
	const { id, title, description, category, image, likeCount } = recipe;
	const navigate = useNavigate();
	const { user } = useAuth();
	let likeTxt = "Like";
	let favTxt = "Favorite";
	if (user) {
		likeTxt = user.likedRecipes.includes(recipe.id) ? "Liked" : "Like";
		favTxt = user.favoriteRecipes.includes(recipe.id)
			? "Favorited"
			: "Favorite";
	}
	return (
		<>
			<div className="recipe-card">
				<img
					src={
						image ||
						`https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg`
					}
					alt=""
					onClick={() => navigate(`/recipes/${id}`)}
				/>
				<h3 onClick={() => navigate(`/recipes/${id}`)}>{title}</h3>
				<h4>
					<span className="recipe-category">{category}</span>
				</h4>
				<p>{description}</p>
				{likeCount} likes{" "}
				<div className="recipe-card-actions">
					{user && (
						<>
							<button
								className={likeTxt === "Liked" ? "liked" : ""}
								onClick={() => onLike(id)}
							>
								{likeTxt}
							</button>
							<button
								className={
									favTxt === "Favorited" ? "favorited" : ""
								}
								onClick={() =>
									handleFavorite(
										user.id,
										recipe.id,
										user.favoriteRecipes,
									)
								}
							>
								{favTxt}
							</button>
						</>
					)}
					{user && user.id === recipe.userId && (
						<>
							<button onClick={() => navigate(`/my-kitchen/edit/${recipe.id}`)}>
								Edit
							</button>
							<button
								className="delete-btn"
								onClick={() => onDelete(recipe.id)}
							>
								Delete
							</button>
						</>
					)}{" "}
				</div>
			</div>
		</>
	);
}

export default RecipeCard;

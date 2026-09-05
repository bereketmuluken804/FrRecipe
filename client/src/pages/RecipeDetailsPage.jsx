import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRecipe } from "../services/recipeService";
import "./RecipeDetailsPage.css";
function RecipeDetailsPage() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState();
	const [error, setError] = useState(null);
	useEffect(() => {
		async function loadRecipe(id) {
			try {
				const response = await getRecipe(id);
				setRecipe(response);
			} catch (error) {
				setError("Couldn't found recipe");
			}
		}
		loadRecipe(id);
	}, [id]);
	if (!recipe) {
		return <>{(error && <p>{error}</p>) || <p style={{display: "block", textAlign: "center"}}>loading ...</p>}</>;
	}
	return (
		<div className="recipe-detail">
			<img
				src={
					recipe.image ||
					`https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg`
				}
				alt=""
			/>
			<h2>{recipe.title}</h2>
			<p className="meta">
				By User {recipe.userId} · {recipe.likeCount} likes
			</p>
			<h3>
				<span className="recipe-category">{recipe.category}</span>
			</h3>
			<p className="description">{recipe.description}</p>

			<p className="ingredients-title">Ingredients:</p>
			<ul>
				{recipe.ingredients.map((ing, i) => {
					return <li key={i}>{ing}</li>;
				})}
			</ul>
			<p className="instruction-title">Instructions:</p>
			<ul>
				{recipe.instructions.map((inst, i) => (
					<li key={i}>
						<span className="row-num">{i + 1}: </span>
						{inst}
					</li>
				))}
			</ul>
		</div>
	);
}

export default RecipeDetailsPage;

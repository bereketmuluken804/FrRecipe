import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
	getRecipe,
	createRecipe,
	updateRecipe,
} from "../services/recipeService";
import { useAuth } from "../context/AuthContext";
import "./RecipeFormPage.css";

function RecipeFormPage() {
	const { id } = useParams();
	const { user } = useAuth();
	const [loading, setLoading] = useState(!!id);
	const [editingRecipe, setEditingRecipe] = useState(null);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		ingredients: [""],
		instructions: [""],
		image: "",
		isPublic: false,
	});

	useEffect(() => {
		async function loadRecipe() {
			if (id) {
				const recipe = await getRecipe(id);
				setEditingRecipe(recipe);
				setFormData({
					title: recipe.title,
					description: recipe.description,
					category: recipe.category,
					ingredients: recipe.ingredients,
					instructions: recipe.instructions,
					image: recipe.image,
					isPublic: recipe.isPublic,
				});
				setLoading(false);
			}
		}
		loadRecipe();
	}, [id]);

	async function handleSubmit(e) {
		try {
			e.preventDefault();

			if (!id) {
				const recipeData = {
					...formData,
					userId: user.id,
					likeCount: 0,
				};
				await createRecipe(recipeData);
			} else {
				const recipeData = {
					...formData,
				};
				await updateRecipe(id, recipeData);
			}
			clearForm();
			navigate("/my-kitchen");
		} catch (err) {
			console.error(err.message);
		}
	}
  function resetForm() {
    setFormData({
					title: editingRecipe.title,
					description: editingRecipe.description,
					category: editingRecipe.category,
					ingredients: editingRecipe.ingredients,
					instructions: editingRecipe.instructions,
					image: editingRecipe.image,
					isPublic: editingRecipe.isPublic,
				});
  }
	function clearForm() {
		setFormData({
			title: "",
			description: "",
			category: "",
			ingredients: [""],
			instructions: [""],
			image: "",
			isPublic: false,
		});
	}

	function onChange(e) {
		const name = e.target.name;
		const value =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setFormData({ ...formData, [name]: value });
	}
	function removeFromList(index, label) {
		const newArr = formData[label].filter((item, i) => index !== i);
		setFormData({
			...formData,
			[label]: newArr,
		});
	}
	function updateList(index, value, label) {
		const array = formData[label].map((item, i) =>
			i === index ? value : item,
		);
		setFormData({ ...formData, [label]: array });
	}

	function addToList(label) {
		setFormData({
			...formData,
			[label]: formData[label].concat(""),
		});
	}

	if (loading) {
		return <p>Loading...</p>;
	}
	if (editingRecipe && user.id !== editingRecipe.userId) {
		return <p>You can't edit this recipe</p>;
	}
	return (
		<div className="recipe-form-page">
			<Link to="/my-kitchen" className="back-link">
				← Back to My Kitchen
			</Link>
			{!!id ? <h1>Edit Recipe</h1> : <h1>Add Recipe</h1>}
			<form onSubmit={handleSubmit} className="recipe-form">
				<div className="form-top">
					<div
						className="image-preview"
						style={{
							backgroundImage: formData.image
								? `url(${formData.image})`
								: "none",
						}}
					>
						{!formData.image && "No image yet"}
					</div>
					<div className="form-top-fields">
						
						<label>
							<h3 >Title</h3>
							<input
								required
								type="text"
								value={formData.title}
								onChange={onChange}
								name="title"
							/>
						</label>
						<label>
						<h3 >Category</h3>
							<input
								required
								type="text"
								value={formData.category}
								onChange={onChange}
								name="category"
							/>
						</label>
						<label>
							<h3>Image URL</h3>

							<input
								type="text"
								value={formData.image}
								onChange={onChange}
								name="image"
							/>
						</label>
					</div>
				</div>

				<div className="form-section">
					<h3 className="form-section-title">Description</h3>
					<input
						required
						type="text"
						value={formData.description}
						onChange={onChange}
						name="description"
					/>
				</div>

				<div className="form-section">
					<h3 className="form-section-title">Ingredients</h3>

					{formData.ingredients.map((ingredient, index) => (
						<div key={index} className="list-row">
							<span>{index + 1} </span>
							<input
								type="text"
								value={ingredient}
								onChange={(e) =>
									updateList(
										index,
										e.target.value,
										"ingredients",
									)
								}
							/>
							{index !== 0 && (
								<button
									type="button"
									onClick={() =>
										removeFromList(index, "ingredients")
									}
								>
									Remove
								</button>
							)}
						</div>
					))}
					<button
						onClick={() => addToList("ingredients")}
						type="button"
					>
						Add ingredient
					</button>
				</div>
				<div className="form-section">
					<h3 className="form-section-title">Instructions</h3>
					{formData.instructions.map((instr, index) => (
						<div key={index} className="list-row">
							<span>{index + 1}</span>
							<input
								type="text"
								value={instr}
								onChange={(e) =>
									updateList(
										index,
										e.target.value,
										"instructions",
									)
								}
							/>
							{index !== 0 && (
								<button
									onClick={() =>
										removeFromList(index, "instructions")
									}
									type="button"
								>
									Remove
								</button>
							)}
						</div>
					))}
					<button
						onClick={() => addToList("instructions")}
						type="button"
					>
						Add Instruction
					</button>
				</div>

				<div className="checkbox-row">
					<input
						type="checkbox"
						checked={formData.isPublic}
						onChange={onChange}
						name="isPublic"
						id="isPublic"
					/>
					<label htmlFor="isPublic">Make this recipe public</label>
				</div>

				<div className="form-actions">
					<button className="btn-primary" type="submit">
						{id ? `Edit Recipe` : `Create Recipe`}
					</button>
					{id && (<>
						<button
							type="button"
							onClick={() => {
								clearForm();
								navigate("/my-kitchen");
							}}
						>
							Cancel Edit
						</button>
            <button type="button" onClick={resetForm}> 
              Reset
            </button>
            </>
					)}
					{!id && <button
						type="button"
						className="btn-secondary"
						type="button"
						onClick={clearForm}
					>
						Clear
					</button>}
				</div>
			</form>
		</div>
	);
}

export default RecipeFormPage;

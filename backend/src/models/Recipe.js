import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
	{
		title: {
			required: true,
			type: String,
		},
		description: {
			required: true,
			type: String,
		},
		category: {
			required: true,
			type: String,
		},
		image: {
			required: true,
			type: String,
		},
		ingredients: {
			required: true,
			type: [String],
		},
		instructions: {
			required: true,
			type: [String],
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		likeCount: {
			type: Number,
			default: 0,
		},
		isPublic: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Recipe", recipeSchema);

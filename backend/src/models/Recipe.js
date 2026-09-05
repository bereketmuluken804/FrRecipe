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

recipeSchema.set('toJSON', {
		transform: (doc, ret) => {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
		return ret
	}
})

export default mongoose.model("Recipe", recipeSchema);

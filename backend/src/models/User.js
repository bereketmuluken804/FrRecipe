import mongoose from "mongoose";
import { type } from "os";
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			unique: true,
			type: String,
			required: true,
		},
		passwordHash: {
			type: String,
		},
		favoriteRecipes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Recipe",
			},
		],
		likedRecipes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Recipe",
			},
		],
		isVerified: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
		},
		verificationExpires: {
			type: Date,
		},
		lastVerificationSentAt: {
			type: Date,
		},
		authProvider: {
			type: String,
			enum: ["local", "google"],
			default: "local",
		},
	},
	{ timestamps: true },
);

userSchema.set("toJSON", {
	transform: (docs, ret) => {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
		delete ret.passwordHash;
		return ret;
	},
});

export default mongoose.model("User", userSchema);

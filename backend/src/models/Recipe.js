import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  ingredients: {
    type: [String],
  },
  instructions: {
    type: [String],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("Recipe", recipeSchema)
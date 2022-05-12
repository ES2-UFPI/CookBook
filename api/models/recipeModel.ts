import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Recipe must have a name"],
      trim: true,
    },

    ingredients: [
      {
        name: {
          type: String,
          required: [true, "Recipe must have ingredients"],
          trim: true,
          maxlength: 80,
        },
        amount: String,
      },
    ],

    prepMethod: {
      type: String,
      required: [true, "Recipe must have a prep Method"],
    },

    cookTime: {
      type: Number,
      required: [true, "Recipe must have cook time"],
    },

    authorId: {
      type: String,
      required: [true, "Recipe must have a Author"],
    },

    imgURL: {
      type: String,
      required: [true, "Recipe must have image url"],
    },

    comments: [
      {
        author: String,
        authorId: String,
        message: {
          type: String,
          maxlength: 255,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],

    ratings: [
      {
        authorId: String,
        stars: {
          type: Number,
          min: [1, "Rating must be above 1.0"],
          max: [5, "Rating must be below 5.0"],
          default: 0,
        },
        updatedAt: { type: Date, default: Date.now() },
      },
    ],

    tags: [String],

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

recipeSchema.virtual("averageRating").get(function () {
  return Number(
    (
      this.ratings?.reduce?.((acc, it) => {
        return it.stars + acc;
      }, 0) / this.ratings?.length
    ).toFixed(2) || 0
  );
});

const Recipe = model("recipe", recipeSchema);

export default Recipe;

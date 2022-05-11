import Recipe from "../models/recipeModel";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/CatchAsync";
import AppError from "../utils/appError";
import { compareTwoStrings } from "string-similarity";

const getBestMatchFromArray = (array: string[], string: string) => {
  let bestMatch = {
    string: "",
    score: 0,
  };
  array.forEach((item) => {
    const score = compareTwoStrings(string, item);
    if (score > bestMatch.score) {
      bestMatch = {
        string: item,
        score,
      };
    }
  });
  return bestMatch;
};

const getAllRecipes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const tags = req.query.tags || "";
    const ingredients = req.query.ingredients || "";
    const op =
      !tags && !ingredients ? "$all" : !!tags || !!ingredients ? "$or" : "$and";
    const recipe = await Recipe.find({
      [op]: [
        { tags: { $all: tags.toString().toUpperCase().split(",") } },
        {
          ingredients: {
            $elemMatch: {
              name: ingredients
                .toString()
                .split(",")
                .map((it) => (/^bar$/i.test(it) ? it : new RegExp(it, "i"))),
            },
          },
        },
      ],
    })
      .select("-__v")
      .select("-prepMethod")
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      status: "success",
      results: recipe.length,
      data: recipe.map((r) => {
        return {
          ...r._doc,
          match: Number(
            r.ingredients?.filter((it) => {
              if (it.name.split(" ").length > 1) {
                const res = it.name.split(" ").filter((yt) => {
                  if (yt.length < 2) return false;

                  const bestMatch = getBestMatchFromArray(
                    ingredients
                      .toString()
                      .split(",")
                      .map((xt) => xt.toLowerCase()),
                    yt.toLowerCase()
                  );
                  return bestMatch.score > 0.5;
                });

                if (res.length > 0) return true;
              }
              const res = getBestMatchFromArray(
                ingredients
                  .toString()
                  .split(",")
                  .map((xt) => xt.toLowerCase()),
                it.name.toLowerCase()
              );
              return res.score > 0.5;
            }).length / r.ingredients.length
          ).toFixed(2),
        };
      }),
    });
  }
);
// "name" : {$regex : String(name), name: /^bar$/i }
const getRecipesByName = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const name = req.params.name;

    const recipes = await Recipe.find({
      name: (/^bar$/i.test(name) ? name : new RegExp(name, "i"))
    })
      .select("-__v")
      .select("-prepMethod")
      .skip((page - 1) * limit)
      .limit(limit);

    if (!recipes) {
      return next(new AppError("Can't find recipe with that id", 404));
    }

    return res.status(200).json({
      status: "success",
      data: recipes,
    });
  }
);

const getRecipe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const recipe = await Recipe.findById(req.params.id).select("-__v");

    if (!recipe) {
      return next(new AppError("Can't find recipe with that id", 404));
    }

    return res.status(200).json({
      status: "success",
      data: recipe,
    });
  }
);

interface createRecipeProps extends Request {
  user: {
    _id: String;
  };
}

const createRecipe = catchAsync(
  async (req: createRecipeProps, res: Response, next: NextFunction) => {
    const recipe = await Recipe.create({
      name: req.body.name,
      ingredients: req.body.ingredients,
      prepMethod: req.body.prepMethod,
      cookTime: req.body.cookTime,
      authorId: req?.user._id,
      imgURL: req.body.imgURL,
      comments: req.body.comments,
      ratings: req.body.ratings,
      tags: req.body.tags.map((tag: String) => tag.toUpperCase()),
      createdAt: req.body.createdAt,
    });

    return res.status(201).json({
      stauts: "success",
      data: recipe,
    });
  }
);

const updateRecipe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recipe) {
      return next(new AppError("Can't find recipe with that id", 404));
    }

    return res.status(200).json({
      status: "success",
      data: recipe,
    });
  }
);

const deleteRecipe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return next(new AppError("Can't find recipe with that id", 404));
    }

    return res.status(204).json({
      status: "success",
    });
  }
);

const updateRating = catchAsync(
  async (req: createRecipeProps, res: Response, next: NextFunction) => {
    let recipe = await Recipe.findOne({
      _id: req.params.id,
      ratings: { $elemMatch: { authorId: req.user._id } },
    });

    if (recipe) {
      recipe = await Recipe.findOneAndUpdate(
        {
          _id: req.params.id,
          ratings: { $elemMatch: { authorId: req.user._id } },
        },
        {
          $set: { "ratings.$.stars": req.body.stars },
        },
        {
          upsert: true,
        }
      );
    } else {
      recipe = await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            ratings: { authorId: req.user._id, stars: req.body.stars },
          },
        },
        { upsert: true }
      );
    }

    if (!recipe) {
      return next(new AppError("Can't find recipe with that id", 404));
    }

    return res.status(200).json({
      status: "success",
      data: recipe,
    });
  }
);

export {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  updateRating,
  getRecipesByName,
};

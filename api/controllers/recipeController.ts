import Recipe from '../models/recipeModel';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/CatchAsync';
import AppError from '../utils/appError';

const getAllRecipes = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
  const recipe = await Recipe.find().select('-__v')

  return res.status(200).json({
    status: 'success',
    results: recipe.length,
    data: recipe
  })
})

const getRecipe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const recipe = await Recipe.findById(req.params.id).select('-__v');

  if(!Recipe){
    return next(new AppError("Can't find recipe with that id", 404))
  }

  return res.status(200).json({
    status: 'success',
    data: recipe
  });
})

interface createRecipeProps extends Request {
  user: {
    _id: String
  }
}

const createRecipe = catchAsync(async (req: createRecipeProps, res: Response, next: NextFunction) => {
  const recipe = await Recipe.create({ 
    name: req.body.name, 
    ingredients: req.body.ingredients, 
    prepMethod: req.body.prepMethod, 
    cookTime: req.body.cookTime,
    authorId: req?.user._id,
    imgURL: req.body.imgURL,
    comments: req.body.comments,
    ratings: req.body.ratings,
    createdAt: req.body.createdAt
  });
  
  return res.status(201).json({
    stauts: 'success',
    data: recipe
  })
})

const updateRecipe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if(!recipe){
    return next(new AppError("Can't find recipe with that id", 404))
  }

  return res.status(200).json({
    status: 'success',
    data: recipe,
  });
})

const deleteRecipe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);

  if(!recipe){
    return next(new AppError("Can't find recipe with that id", 404))
  }

  return res.status(204).json({
    status: 'success',
  });
})

const updateRating = catchAsync(async (req: createRecipeProps, res: Response, next: NextFunction) => {
  const recipe = await Recipe.findOneAndUpdate(
  { 
    _id: req.params.id,  
    ratings: { $elemMatch: { authorId: req.user._id }} 
  }, 
  {
    $set: { 'ratings.$.stars': req.body.stars }
  }, 
  {
    'new': true, 'safe': true, 'upsert': true
  });

  if(!recipe){
    return next(new AppError("Can't find recipe with that id", 404))
  }

  return res.status(200).json({
    status: 'success',
    data: recipe,
  });
})

export {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  updateRating
}
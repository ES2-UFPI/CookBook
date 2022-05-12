import { Router } from 'express';
import * as recipeController from '../controllers/recipeController';
import * as authController from '../controllers/authController';

const routes = Router();

// Recipes
routes
  .route('/recipe')
  .get(recipeController.getAllRecipes)
  .post(authController.protect, recipeController.createRecipe)

routes
  .route('/recipe/:id')
  .get(recipeController.getRecipe)
  .patch(authController.protect, recipeController.updateRecipe)
  .delete(authController.protect, recipeController.deleteRecipe)

routes
  .route('/recipe/ratings/:id')
  .patch(authController.protect, recipeController.updateRating)

routes
  .route('/recipeByName/:name')
  .get(recipeController.getRecipesByName)

routes
  .route('/recipeByUser/:id')
  .get(recipeController.getRecipesByUser)

routes
  .route('/ratingByUser/:id')
  .get(authController.protect, recipeController.getUserRating)
  
routes
.route('/addRecipeComment/:id')
.post(authController.protect, recipeController.postUserComments)

routes
  .route('/getTopRecipes')
  .get(recipeController.getTopRecipes)

export default routes;
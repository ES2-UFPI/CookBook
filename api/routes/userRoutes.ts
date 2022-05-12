import { Router } from 'express';
import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';

const routes = Router();

// Users
routes
  .route('/user')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser)

routes
  .route('/user/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

routes
  .route('/login')
  .post(userController.login)

routes
  .route('/getUserByName/:name')
  .get(userController.getUsersByName)

export default routes;
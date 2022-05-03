
import express from 'express'

import { Router, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from '../routes/userRoutes';
import recipeRoutes from '../routes/recipeRoutes';

const app = express();

app.use(cors());
app.use(express.json())

app.use(userRoutes)
app.use(recipeRoutes)

export default app
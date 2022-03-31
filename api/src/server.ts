
import express from 'express'

import { Router, Request, Response } from 'express';
import cors from 'cors';

const app = express();

const route = Router()

app.use(cors());
app.use(express.json())

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server ON' })
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')


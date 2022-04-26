import app from './src/app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose.connect(db).then(() => console.log('MongoDB connection successful!'));

const port = process.env.PORT || 5555;

const server = app.listen(port, () => {
  console.log(`Server Running on port localhost: ${port}`);
});

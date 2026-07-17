import express from 'express';
import db from './config/database.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

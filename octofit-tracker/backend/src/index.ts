import express from 'express';
import { connectToDatabase } from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
import { apiUrl } from './config/codespaces.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running',
    apiUrl,
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API available at ${apiUrl}`);
  });
}

startServer();

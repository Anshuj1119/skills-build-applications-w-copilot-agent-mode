import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (req, res) => {
  const leaderboard = await LeaderboardEntry.find()
    .populate('user', 'name email')
    .populate('team', 'name');
  res.json({ leaderboard });
});

export default router;

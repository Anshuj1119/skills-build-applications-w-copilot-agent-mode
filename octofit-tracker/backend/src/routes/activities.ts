import { Router } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user', 'name email');
  res.json({ activities });
});

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ activity });
});

export default router;

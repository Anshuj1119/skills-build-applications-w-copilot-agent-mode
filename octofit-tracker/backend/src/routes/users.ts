import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.find().populate('team', 'name description');
  res.json({ users });
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ user });
});

export default router;

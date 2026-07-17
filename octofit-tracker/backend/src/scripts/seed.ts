import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teamA = await Team.create({
      name: 'Apex Athletes',
      description: 'Competitive fitness team focused on endurance and strength training',
    });

    const teamB = await Team.create({
      name: 'Velocity Crew',
      description: 'Team for high-energy cardio workouts and community challenges',
    });

    const alice = await User.create({
      name: 'Alice Chen',
      email: 'alice.chen@example.com',
      role: 'captain',
      team: teamA._id,
    });

    const marc = await User.create({
      name: 'Marc Yates',
      email: 'marc.yates@example.com',
      role: 'member',
      team: teamA._id,
    });

    const nina = await User.create({
      name: 'Nina Patel',
      email: 'nina.patel@example.com',
      role: 'member',
      team: teamB._id,
    });

    teamA.members = [alice._id, marc._id];
    teamB.members = [nina._id];
    await teamA.save();
    await teamB.save();

    const activities = await Activity.create([
      {
        user: alice._id,
        type: 'Cycling',
        durationMinutes: 45,
        caloriesBurned: 520,
        date: new Date('2026-07-10T08:00:00.000Z'),
      },
      {
        user: marc._id,
        type: 'Strength Training',
        durationMinutes: 60,
        caloriesBurned: 620,
        date: new Date('2026-07-11T17:30:00.000Z'),
      },
      {
        user: nina._id,
        type: 'HIIT',
        durationMinutes: 30,
        caloriesBurned: 380,
        date: new Date('2026-07-12T06:45:00.000Z'),
      },
    ]);

    const workouts = await Workout.create([
      {
        title: 'Morning Energy Boost',
        description: 'A fast-paced full-body workout to kick off the day.',
        difficulty: 'Intermediate',
        durationMinutes: 30,
        focusArea: 'Full Body',
      },
      {
        title: 'Strength & Stability',
        description: 'A solid strength workout for core and lower body power.',
        difficulty: 'Advanced',
        durationMinutes: 55,
        focusArea: 'Strength',
      },
      {
        title: 'Recovery Stretch',
        description: 'A calming routine to improve flexibility and aid recovery.',
        difficulty: 'Beginner',
        durationMinutes: 20,
        focusArea: 'Flexibility',
      },
    ]);

    await LeaderboardEntry.create([
      {
        user: alice._id,
        team: teamA._id,
        score: 980,
        rank: 1,
      },
      {
        user: marc._id,
        team: teamA._id,
        score: 880,
        rank: 2,
      },
      {
        user: nina._id,
        team: teamB._id,
        score: 760,
        rank: 3,
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log(`Created ${await User.countDocuments()} users`);
    console.log(`Created ${await Team.countDocuments()} teams`);
    console.log(`Created ${await Activity.countDocuments()} activities`);
    console.log(`Created ${await Workout.countDocuments()} workouts`);
    console.log(`Created ${await LeaderboardEntry.countDocuments()} leaderboard entries`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

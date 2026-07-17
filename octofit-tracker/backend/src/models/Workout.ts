import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  durationMinutes: { type: Number, required: true },
  focusArea: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;

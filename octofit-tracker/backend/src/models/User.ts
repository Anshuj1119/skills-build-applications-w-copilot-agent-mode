import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  joinedAt: { type: Date, default: () => new Date() },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
});

const User = mongoose.model('User', userSchema);
export default User;

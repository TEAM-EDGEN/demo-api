import { Schema, model, plugin } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const leaderboardSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  score: { type: Number, required: true },
});

leaderboardSchema,plugin(toJSON);

export const LeaderboardModel = model('Leaderboard', leaderboardSchema);

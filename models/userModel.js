import mongoose from 'mongoose';

// Create table in db
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
    },
  },
  {
    // Date
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    phone: { type: String, required: true, unique: true },
    gender: { type: String },
    height: { type: Number },
    age: { type: Number },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);

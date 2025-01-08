// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required: true},
  familyStatus: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  heightFeet: { type: Number, required: true },
  heightInch: { type: Number, required: true },
  gender: { type: String, required: true },
  cookingExperience: { type: String, required: true },
  dietPreference: { type: [String], default: [] },
  cuisineLikings: { type: [String], default: [] },
  medicalConditions: { type: [String], default: [] },
  otherMedicalCondition: { type: String, default: '' },
  allergies: { type: [String], default: [] },
  otherAllergy: { type: String, default: '' },
  password: { type: String, required: true },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

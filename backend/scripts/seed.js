import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import { makeHash } from '../services/token.service.js';

await connectDB();

await User.deleteMany({});

const admin = await User.create({
    name: 'Provoxi Admin',
    email: 'amitadhikarieditor@gmail.com',
    passwordHash: await makeHash('Admin@12345'),
    role: 'admin',
    isEmailVerified: true
});

console.log(`Seeded admin: ${admin.email}`);

await mongoose.disconnect();

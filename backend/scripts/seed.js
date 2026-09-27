import mongoose from 'mongoose';
import {connectDB} from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import {makeHash} from '../services/token.service.js';

await connectDB();
await Promise.all([User.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({})]);
    const admin=await User.create({name:'Provoxi Admin',email:'amitadhikarieditor@gmail.com',
        passwordHash:await makeHash('Admin@12345'),
        role:'admin',isEmailVerified:true});
        const cats=await Category.insertMany([{name:'Tech',slug:'tech'},
            {name:'Lifestyle',slug:'lifestyle'},
            {name:'Home',slug:'home'}]);
            const data=[['Wireless Headphones','wireless-headphones',0,1899,45],
            ['Minimal Backpack','minimal-backpack',1,2499,30],
            ['Desk Lamp','desk-lamp',2,1299,50],
            ['Mechanical Keyboard','mechanical-keyboard',0,3999,20],
            ['Smart Bottle','smart-bottle',1,1599,40],
            ['Travel Organizer','travel-organizer',1,999,75]];
            await Product.insertMany(data.map(([name,slug,c,price,stock])=>({name,slug,category:cats[c]._id,description:`Premium ${name} designed for everyday use.`,images:[`https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80`],
                price,stock,tags:[name.toLowerCase()],
                featured:Math.random()>.5})));
                console.log(`Seeded admin ${admin.email}`);await mongoose.disconnect();

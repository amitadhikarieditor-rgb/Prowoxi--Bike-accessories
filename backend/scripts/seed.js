import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { makeHash } from '../services/token.service.js';

await connectDB();

await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({})
]);

const admin = await User.create({
    name: 'Provoxi Admin',
    email: 'amitadhikarieditor@gmail.com',
    passwordHash: await makeHash('Admin@12345'),
    role: 'admin',
    isEmailVerified: true
});

const cats = await Category.insertMany([
    { name: 'Helmets', slug: 'helmets' },
    { name: 'Lighting', slug: 'lighting' },
    { name: 'Mobile Holders', slug: 'mobile-holders' },
    { name: 'Protection', slug: 'protection' },
    { name: 'Luggage', slug: 'luggage' },
    { name: 'Riding Gear', slug: 'riding-gear' },
    { name: 'Bike Covers', slug: 'bike-covers' },
    { name: 'Performance', slug: 'performance' }
]);

const data = [

    [
        'Provoxi Full Face Helmet',
        'provoxi-full-face-helmet',
        0,
        2499,
        25,
        ['Royal Enfield Classic 350', 'Royal Enfield Hunter 350', 'Bajaj Pulsar 150']
    ],

    [
        'LED Headlight',
        'led-headlight',
        1,
        1899,
        30,
        ['Royal Enfield Classic 350', 'Royal Enfield Hunter 350', 'Honda CB350']
    ],

    [
        'Universal Mobile Holder',
        'universal-mobile-holder',
        2,
        799,
        50,
        ['Royal Enfield Classic 350', 'Royal Enfield Hunter 350', 'Bajaj Pulsar 150', 'Honda CB350']
    ],

    [
        'Crash Guard',
        'crash-guard',
        3,
        2299,
        20,
        ['Royal Enfield Classic 350', 'Royal Enfield Hunter 350']
    ],

    [
        'Saddle Stay Bag',
        'saddle-stay-bag',
        4,
        1599,
        35,
        ['Royal Enfield Classic 350', 'Royal Enfield Hunter 350', 'Honda CB350']
    ],

    [
        'Premium Riding Gloves',
        'premium-riding-gloves',
        5,
        999,
        45,
        ['Royal Enfield Classic 350', 'Royal Enfield Hunter 350', 'Bajaj Pulsar 150']
    ],

    [
        'Waterproof Bike Cover',
        'waterproof-bike-cover',
        6,
        699,
        60,
        ['Royal Enfield Classic 350', 'Royal Enfield Hunter 350', 'Bajaj Pulsar 150', 'Honda CB350']
    ],

    [
        'Performance Air Filter',
        'performance-air-filter',
        7,
        1299,
        25,
        ['Royal Enfield Classic 350', 'Bajaj Pulsar 150']
    ]

];

await Product.insertMany(
    data.map(([name, slug, c, price, stock, compatibleBikes]) => ({
        name,
        slug,
        category: cats[c]._id,
        description: `Premium ${name} designed for motorcycle enthusiasts.`,
        images: [
            'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80'
        ],
        price,
        stock,
        tags: [
            name.toLowerCase(),
            'bike accessories',
            'motorcycle'
        ],
        compatibleBikes,
        featured: Math.random() > 0.5
    }))
);

console.log(`Seeded admin ${admin.email}`);

await mongoose.disconnect();
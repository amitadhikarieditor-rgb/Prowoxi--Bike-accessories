import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { makeHash } from '../services/token.service.js';

await connectDB();

await Promise.all([
    Category.deleteMany({}),
    Product.deleteMany({}),
    User.deleteMany({})
]);

const admin = await User.create({
    name: 'Provoxi Admin',
    email: 'amitadhikarieditor@gmail.com',
    passwordHash: await makeHash('Admin@12345'),
    role: 'admin',
    isEmailVerified: true
});

const cats = await Category.insertMany([
    {
        name: 'Crash Guard',
        slug: 'crash-guard'
    },
    {
        name: 'Radiator Guard',
        slug: 'radiator-guard'
    },
    {
        name: 'Foot Rest',
        slug: 'foot-rest'
    }
]);

const data = [

    [
        'Provoxi Crash Guard',
        'provoxi-crash-guard',
        'royal-enfield',
        0,
        2299,
        20
    ],

    [
        'Heavy Duty Crash Guard',
        'heavy-duty-crash-guard',
        'royal-enfield',
        0,
        2499,
        15
    ],

    [
        'Black Steel Crash Guard',
        'black-steel-crash-guard',
        'honda',
        0,
        1999,
        25
    ],

    [
        'Provoxi Radiator Guard',
        'provoxi-radiator-guard',
        'royal-enfield',
        1,
        1899,
        30
    ],

    [
        'Stainless Steel Radiator Guard',
        'stainless-steel-radiator-guard',
        'honda',
        1,
        1599,
        25
    ],

    [
        'Black Mesh Radiator Guard',
        'black-mesh-radiator-guard',
        'bajaj',
        1,
        1799,
        20
    ],

    [
        'Provoxi Foot Rest',
        'provoxi-foot-rest',
        'royal-enfield',
        2,
        999,
        40
    ],

    [
        'Aluminium Foot Rest',
        'aluminium-foot-rest',
        'bajaj',
        2,
        1299,
        35
    ]

];

await Product.insertMany(
    data.map(
        ([
            name,
            slug,
            bike,
            categoryIndex,
            price,
            stock
        ]) => ({
            name,
            slug,
            bike,

            category:
                cats[categoryIndex]._id,

            description:
                `Premium ${name} designed for motorcycle enthusiasts.`,

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

            featured:
                Math.random() > 0.5
        })
    )
);

console.log(`Seeded admin ${admin.email}`);

await mongoose.disconnect();

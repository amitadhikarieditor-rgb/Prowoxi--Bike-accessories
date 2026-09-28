import mongoose from 'mongoose';

const variant = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        sku: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            min: 0
        },

        stock: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    {
        _id: true
    }
);

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        description: {
            type: String,
            required: true
        },

        bike: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
            index: true
        },

        images: [String],

        price: {
            type: Number,
            required: true,
            min: 0
        },

        compareAtPrice: {
            type: Number,
            min: 0
        },

        stock: {
            type: Number,
            min: 0,
            default: 0,
            index: true
        },

        tags: [String],

        variants: [variant],

        ratingAverage: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },

        ratingCount: {
            type: Number,
            default: 0
        },

        featured: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

schema.index({
    name: 'text',
    description: 'text',
    tags: 'text'
});

export default mongoose.model('Product', schema);
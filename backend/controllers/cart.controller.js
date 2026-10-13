import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { AppError } from '../utils/appError.js';

async function get(req) {
    return Cart.findOneAndUpdate(
        {
            user: req.user._id
        },
        {
            user: req.user._id,
            $setOnInsert: {
                items: []
            }
        },
        {
            new: true,
            upsert: true
        }
    ).populate(
        'items.product',
        'name price images stock variants'
    );
}

export async function view(req, res) {
    res.json({
        success: true,
        data: await get(req)
    });
}

export async function add(req, res) {
    const {
        productId,
        quantity = 1,
        variantId
    } = req.body;

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
        throw new AppError(
            'Product unavailable',
            404
        );
    }

    const cart = await get(req);

    const item = cart.items.find(
        item =>
            item.product._id.toString() === productId &&
            String(item.variantId || '') === String(variantId || '')
    );

    const newQty =
        (item?.quantity || 0) + Number(quantity);

    const stock = variantId
        ? product.variants.id(variantId)?.stock
        : product.stock;

    if (newQty > stock) {
        throw new AppError(
            'Insufficient stock',
            409,
            'OUT_OF_STOCK'
        );
    }

    if (item) {
        item.quantity = newQty;
    } else {
        cart.items.push({
            product: productId,
            quantity: Number(quantity),
            variantId
        });
    }

    await cart.save();

    res.json({
        success: true,
        data: await get(req)
    });
}

export async function update(req, res) {
    const cart = await get(req);

    const item =
        cart.items.id?.(req.params.itemId) ||
        cart.items.find(
            item =>
                item.product._id.toString() === req.params.itemId
        );

    if (!item) {
        throw new AppError(
            'Cart item not found',
            404
        );
    }

    item.quantity = Number(req.body.quantity);

    if (item.quantity < 1) {
        throw new AppError(
            'Quantity must be at least 1',
            400
        );
    }

    await cart.save();

    res.json({
        success: true,
        data: await get(req)
    });
}

export async function remove(req, res) {
    const cart = await get(req);

    cart.items = cart.items.filter(
        item =>
            item.product._id.toString() !== req.params.productId
    );

    await cart.save();

    res.json({
        success: true,
        data: await get(req)
    });
}
import mongoose from 'mongoose';

import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Address from '../models/Address.js';
import Coupon from '../models/Coupon.js';

import { AppError } from '../utils/appError.js';
import { createPaymentOrder } from '../services/payment.service.js';
import {
    orderPaid,
    orderStatusChanged
} from '../services/notification.service.js';

const valid = {
    PENDING_PAYMENT: ['PAID', 'CANCELLED'],
    PAID: ['PROCESSING', 'CANCELLED'],
    PROCESSING: ['PACKED', 'CANCELLED'],
    PACKED: ['SHIPPED'],
    SHIPPED: ['OUT_FOR_DELIVERY'],
    OUT_FOR_DELIVERY: ['DELIVERED'],
    DELIVERED: [],
    CANCELLED: []
};

export async function create(req, res) {
    const session = await mongoose.startSession();

    try {
        let result;

        await session.withTransaction(async () => {
            const cart = await Cart.findOne({
                user: req.user._id
            })
                .populate('items.product')
                .session(session);

            if (!cart?.items.length) {
                throw new AppError('Cart is empty', 400);
            }

            const address = await Address.findOne({
                _id: req.body.addressId,
                user: req.user._id
            }).session(session);

            if (!address) {
                throw new AppError('Address not found', 404);
            }

            let subtotal = 0;
            const items = [];

            for (const i of cart.items) {
                const p = await Product
                    .findById(i.product._id)
                    .session(session);

                if (!p || p.stock < i.quantity) {
                    throw new AppError(
                        `Insufficient stock for ${p?.name || 'item'}`,
                        409
                    );
                }

                const line = p.price * i.quantity;

                subtotal += line;

                items.push({
                    product: p._id,
                    name: p.name,
                    image: p.images?.[0],
                    quantity: i.quantity,
                    unitPrice: p.price,
                    lineTotal: line
                });
            }

            let discount = 0;

            if (req.body.couponCode) {
                const c = await Coupon.findOne({
                    code: req.body.couponCode.toUpperCase(),
                    isActive: true,
                    expiresAt: {
                        $gt: new Date()
                    }
                }).session(session);

                if (!c || subtotal < c.minOrder) {
                    throw new AppError('Invalid coupon', 400);
                }

                discount =
                    c.type === 'percentage'
                        ? Math.min(
                            subtotal * c.value / 100,
                            c.maxDiscount || Infinity
                        )
                        : Math.min(c.value, subtotal);
            }

            const tax =
                Math.round((subtotal - discount) * 0.18 * 100) / 100;

            const shipping =
                subtotal - discount >= 2000
                    ? 0
                    : 99;

            const total = Math.max(
                0,
                subtotal - discount + tax + shipping
            );

            const [o] = await Order.create(
                [
                    {
                        orderNumber: `PVX-${Date.now()}`,
                        user: req.user._id,
                        items,
                        addressSnapshot: address.toObject(),
                        subtotal,
                        discount,
                        tax,
                        shipping,
                        total,
                        couponCode: req.body.couponCode,
                        paymentStatus: 'PENDING',
                        orderStatus: 'PENDING_PAYMENT',
                        history: [
                            {
                                status: 'PENDING_PAYMENT',
                                note: 'Order created'
                            }
                        ]
                    }
                ],
                { session }
            );

            for (const i of cart.items) {
                await Product.findByIdAndUpdate(
                    i.product._id,
                    {
                        $inc: {
                            stock: -i.quantity
                        }
                    },
                    { session }
                );
            }

            cart.items = [];

            await cart.save({ session });

            result = o;
        });

        const payment = await createPaymentOrder({
            amount: result.total,
            receipt: result.orderNumber
        });

        result.payment.provider = 'razorpay';
        result.payment.providerOrderId = payment.id;

        await result.save();

        res.status(201).json({
            success: true,
            data: {
                order: result,
                payment: {
                    keyId: process.env.RAZORPAY_KEY_ID,
                    orderId: payment.id,
                    amount: payment.amount,
                    currency: payment.currency
                }
            }
        });
    } finally {
        session.endSession();
    }
}

export async function list(req, res) {
    const filter =
        req.user.role === 'admin'
            ? {}
            : {
                user: req.user._id
            };

    res.json({
        success: true,
        data: await Order
            .find(filter)
            .sort('-createdAt')
            .limit(100)
    });
}

export async function getOne(req, res) {
    const filter =
        req.user.role === 'admin'
            ? {
                _id: req.params.id
            }
            : {
                _id: req.params.id,
                user: req.user._id
            };

    const o = await Order
        .findOne(filter)
        .populate('user', 'name email');

    if (!o) {
        throw new AppError('Order not found', 404);
    }

    res.json({
        success: true,
        data: o
    });
}

export async function updateStatus(req, res) {
    const o = await Order.findById(req.params.id);

    if (!o) {
        throw new AppError('Order not found', 404);
    }

    if (!valid[o.orderStatus]?.includes(req.body.status)) {
        throw new AppError(
            `Cannot move ${o.orderStatus} to ${req.body.status}`,
            400
        );
    }

    o.orderStatus = req.body.status;

    o.history.push({
        status: o.orderStatus,
        note: req.body.note
    });

    await o.save();
    await orderStatusChanged(o);

    res.json({
        success: true,
        data: o
    });
}

export async function verifyPayment(req, res) {
    const {
        orderId,
        paymentId
    } = req.body;

    const o = await Order.findById(orderId);

    if (!o) {
        throw new AppError('Order not found', 404);
    }

    o.payment.providerPaymentId = paymentId;
    o.paymentStatus = 'PAID';
    o.orderStatus = 'PAID';

    o.history.push({
        status: 'PAID',
        note: 'Payment verified'
    });

    await o.save();
    await orderPaid(o);

    res.json({
        success: true,
        data: o
    });
}
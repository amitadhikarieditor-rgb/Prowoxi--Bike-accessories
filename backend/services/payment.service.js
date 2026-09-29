import crypto from 'crypto';
import Razorpay from 'razorpay';
import { env } from '../config/env.js';

let razorpay = null;

if (env.razorpayKeyId && env.razorpayKeySecret) {
    razorpay = new Razorpay({
        key_id: env.razorpayKeyId,
        key_secret: env.razorpayKeySecret
    });
}

export function paymentsEnabled() {
    return !!razorpay;
}

export async function createPaymentOrder({
    amount,
    currency = 'INR',
    receipt
}) {
    if (!razorpay) {
        throw new Error('Razorpay is not configured');
    }

    return razorpay.orders.create({
        amount: Math.round(amount * 100),
        currency,
        receipt
    });
}

export function verifyPaymentSignature({
    orderId,
    paymentId,
    signature
}) {
    const expected = crypto
        .createHmac('sha256', env.razorpayKeySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(signature)
    );
}

export function verifyWebhook(rawBody, signature) {
    if (!env.razorpayWebhookSecret) {
        return false;
    }

    const expected = crypto
        .createHmac('sha256', env.razorpayWebhookSecret)
        .update(rawBody)
        .digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(signature)
    );
}
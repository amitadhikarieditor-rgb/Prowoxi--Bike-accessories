import Notification from '../models/Notification.js';
import { sendEmail } from './email.service.js';
import User from '../models/User.js';

export async function notify({
    userId,
    type,
    title,
    message,
    link,
    emailSubject,
    emailHtml
}) {
    const n = await Notification.create({
        user: userId,
        type,
        title,
        message,
        link
    });

    if (emailSubject) {
        const u = await User.findById(userId).select('email');

        if (u) {
            await sendEmail({
                to: u.email,
                subject: emailSubject,
                html: emailHtml || `<p>${message}</p>`
            });
        }
    }

    return n;
}

export const orderPaid = (order) =>
    notify({
        userId: order.user,
        type: 'ORDER_PAID',
        title: 'Payment received',
        message: `Order ${order.orderNumber} has been paid.`,
        link: `/orders/${order._id}`,
        emailSubject: `Provoxi order ${order.orderNumber}`,
        emailHtml: `
            <h2>Payment received</h2>
            <p>Your order ${order.orderNumber} is confirmed.</p>
        `
    });

export const orderStatusChanged = (order) =>
    notify({
        userId: order.user,
        type: 'ORDER_STATUS',
        title: `Order ${order.orderStatus}`,
        message: `Order ${order.orderNumber} is now ${order.orderStatus}.`,
        link: `/orders/${order._id}`,
        emailSubject: `Order ${order.orderNumber} update`,
        emailHtml: `
            <p>Your order is now <strong>${order.orderStatus}</strong>.</p>
        `
    });
import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter = null;

if (env.smtpHost && env.smtpUser && env.smtpPassword) {
    transporter = nodemailer.createTransport({
        host: env.smtpHost,
        port: env.smtpPort,
        secure: env.smtpPort === 465,
        auth: {
            user: env.smtpUser,
            pass: env.smtpPassword
        }
    });
}

export async function sendEmail({ to, subject, html }) {
    if (!transporter) {
        console.log(`[email disabled] ${to} | ${subject}`);
        return;
    }

    await transporter.sendMail({
        from: env.mailFrom || env.smtpUser,
        to,
        subject,
        html
    });
}


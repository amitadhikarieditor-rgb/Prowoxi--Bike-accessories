import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import { signAccess, signRefresh } from '../utils/jwt.js';
import { env } from '../config/env.js';

export function randomToken() {
    return crypto.randomBytes(32).toString('hex');
}

export function hashToken(token) {
    return crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
}

export async function issueAuth(user) {
    const refresh = signRefresh(user);

    user.refreshTokenHash = hashToken(refresh);
    await user.save();

    return {
        access: signAccess(user),
        refresh
    };
}

export function setAuthCookies(res, { access, refresh }) {
    res.cookie('accessToken', access, {
        httpOnly: true,
        sameSite: 'lax',
        secure: env.nodeEnv === 'production',
        maxAge: env.accessMinutes * 60 * 1000
    });

    res.cookie('refreshToken', refresh, {
        httpOnly: true,
        sameSite: 'lax',
        secure: env.nodeEnv === 'production',
        maxAge: env.refreshDays * 86400000
    });
}

export function clearAuthCookies(res) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
}

export const compareHash = (plain, hash) =>
    bcrypt.compare(plain, hash);

export const makeHash = (password) =>
    bcrypt.hash(password, 12);
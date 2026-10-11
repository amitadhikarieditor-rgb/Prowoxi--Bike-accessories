
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

const cookieOptions = {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
    path: '/'
};

export function setAuthCookies(res, { access, refresh }) {
    res.cookie('accessToken', access, {
        ...cookieOptions,
        maxAge: env.accessMinutes * 60 * 1000
    });

    res.cookie('refreshToken', refresh, {
        ...cookieOptions,
        maxAge: env.refreshDays * 86400000
    });
}

export function clearAuthCookies(res) {
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
}

export const compareHash = (plain, hash) =>
    bcrypt.compare(plain, hash);

export const makeHash = (password) =>
    bcrypt.hash(password, 12);
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signAccess = (user) =>
    jwt.sign(
        {
            sub: user._id.toString(),
            role: user.role
        },
        env.accessSecret,
        {
            expiresIn: `${env.accessMinutes}m`
        }
    );

export const signRefresh = (user) =>
    jwt.sign(
        {
            sub: user._id.toString(),
            type: 'refresh'
        },
        env.refreshSecret,
        {
            expiresIn: `${env.refreshDays}d`
        }
    );

export const verifyAccess = (token) =>
    jwt.verify(token, env.accessSecret);

export const verifyRefresh = (token) =>
    jwt.verify(token, env.refreshSecret);
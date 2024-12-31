import type { CookieOptions } from 'express';

const cookieConfig: CookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
};

export default cookieConfig;

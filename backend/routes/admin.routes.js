import {Router} from 'express';import * as c from '../controllers/admin.controller.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {requireAuth,requireRole} from '../middleware/auth.js';

const r=Router();r.use(requireAuth,requireRole('admin'));

r.get('/dashboard', asyncHandler(c.dashboard));

r.get('/users',asyncHandler(c.users));

r.patch('/users/:id/status',asyncHandler(c.setUserStatus));

r.get('/reviews',asyncHandler(c.reviews));

r.patch('/reviews/:id',asyncHandler(c.moderateReview));

r.get('/coupons',asyncHandler(c.coupons));

r.post('/coupons',asyncHandler(c.createCoupon));

r.delete(
    '/coupons/:id',
    requireAuth,
    requireRole('admin'),
    asyncHandler(c.deleteCoupon)
);

export default r;

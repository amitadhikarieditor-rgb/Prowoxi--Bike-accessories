import {Router} from 'express';

import * as c from '../controllers/order.controller.js';

import {asyncHandler} from '../utils/asyncHandler.js';

import {requireAuth,requireRole} from '../middleware/auth.js';

const r=Router();r.use(requireAuth);

r.get('/',asyncHandler(c.list));

r.get('/:id',asyncHandler(c.getOne));

r.post('/',asyncHandler(c.create));

r.post('/payment/verify',asyncHandler(c.verifyPayment));

r.patch('/:id/status',requireRole('admin'),asyncHandler(c.updateStatus));

export default r;

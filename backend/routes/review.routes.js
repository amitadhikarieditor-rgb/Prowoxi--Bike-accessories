import {Router} from 'express';

import * as c from '../controllers/review.controller.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {requireAuth} from '../middleware/auth.js';

const r=Router();r.get('/product/:productId',asyncHandler(c.list))

r.post('/product/:productId',requireAuth,asyncHandler(c.create));

r.patch('/:id',requireAuth,asyncHandler(c.update));

r.delete('/:id',requireAuth,asyncHandler(c.remove));

export default r;

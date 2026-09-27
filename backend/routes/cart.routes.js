import {Router} from 'express';
import * as c from '../controllers/cart.controller.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const r=Router();r.get('/',asyncHandler(c.view));

r.post('/items',asyncHandler(c.add));

r.patch('/items/:itemId',asyncHandler(c.update));

r.delete('/items/:productId',asyncHandler(c.remove));

export default r;

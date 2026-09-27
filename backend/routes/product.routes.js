import {Router} from 'express';
import * as c from '../controllers/product.controller.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {requireAuth,requireRole} from '../middleware/auth.js';
import {validate} from '../middleware/validate.js';
import {productSchema} from '../validators/product.js';

const r=Router();

r.get('/',requireAuth,asyncHandler(c.list));

r.get('/categories',asyncHandler(c.categories));

r.get('/:id',asyncHandler(c.getOne));

r.post('/',requireAuth,requireRole('admin'),validate(productSchema),asyncHandler(c.adminCreate));

r.patch('/:id',requireAuth,requireRole('admin'),asyncHandler(c.adminUpdate));

r.delete('/:id',requireAuth,requireRole('admin'),asyncHandler(c.adminDelete));export default r;

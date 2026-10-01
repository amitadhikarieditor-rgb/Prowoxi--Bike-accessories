import {Router} from 'express';
import * as c from '../controllers/wishlist.controller.js';
import {asyncHandler} from '../utils/asyncHandler.js';


const r=Router();

r.get('/',asyncHandler(c.view));

r.post('/:productId/toggle',asyncHandler(c.toggle));

export default r;

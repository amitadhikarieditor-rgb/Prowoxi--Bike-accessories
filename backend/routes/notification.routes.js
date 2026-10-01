import {Router} from 'express';
import * as c from '../controllers/notification.controller.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const r=Router();

r.use(asyncHandler(async(req,res,next)=>next()));

r.get('/',asyncHandler(c.list));r.patch('/:id/read',asyncHandler(c.read));

export default r;

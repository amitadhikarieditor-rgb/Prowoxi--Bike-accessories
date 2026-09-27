import {Router} from 'express';
import * as c from '../controllers/address.controller.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const r=Router();r.get('/',asyncHandler(c.list));

r.post('/',asyncHandler(c.create));

r.delete('/:id',asyncHandler(c.remove));

export default r;

import {Router} from 'express';
 import * as c from '../controllers/auth.controller.js'; 
 import {asyncHandler} from '../utils/asyncHandler.js'; 
 import {validate} from '../middleware/validate.js'; 
 import {loginSchema,registerSchema} from '../validators/auth.js';
  import {requireAuth} from '../middleware/auth.js'; 
  
  const r=Router();
  
  r.post('/register',validate(registerSchema),asyncHandler(c.register));
  
  r.post('/login',validate(loginSchema),asyncHandler(c.login));
  
  r.post('/refresh',asyncHandler(c.refresh));
  
  r.post('/logout',requireAuth,asyncHandler(c.logout));
  
  r.get('/me',requireAuth,asyncHandler(c.me));
  
  r.post('/forgot-password',asyncHandler(c.requestReset));
  
  r.post('/reset-password',asyncHandler(c.resetPassword));
  
  export default r;

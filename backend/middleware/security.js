import helmet from 'helmet';
 import cors from 'cors';
  import rateLimit from 'express-rate-limit'; 
  import mongoSanitize from 'express-mongo-sanitize'; 
  import {env} from '../config/env.js';
  
export const securityMiddleware=[helmet(),
  cors({origin:env.clientUrl,credentials:true}),
  mongoSanitize()];


export const apiLimiter=rateLimit({
  windowMs:15*60*1000,max:300,
  standardHeaders:true,
  legacyHeaders:false});

export const authLimiter=rateLimit({
  windowMs:15*60*1000,
  max:30,standardHeaders:true,
  legacyHeaders:false});

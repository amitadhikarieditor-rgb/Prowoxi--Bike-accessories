import {verifyAccess} from '../utils/jwt.js'; 
import User from '../models/User.js'; 
import {AppError} from '../utils/appError.js';

export async function requireAuth(req,res,next){
    try{const token=req.cookies.accessToken||req.headers.authorization?.replace('Bearer ','');
        if(!token)throw new AppError('Authentication required',401,'AUTH_REQUIRED');
        const p=verifyAccess(token);const user=await User.findById(p.sub);
        if(!user||!user.isActive)
            throw new AppError('Invalid or inactive account',401,'AUTH_INVALID');
        req.user=user;next();
    }catch(e){
        next(e instanceof AppError?e:new AppError('Invalid or expired access token',401,'AUTH_INVALID'));
    }
}
export const requireRole=(...roles)=>(req,res,next)=>roles.includes(req.user?.role)?next():next(new AppError('Forbidden',403,'FORBIDDEN'));

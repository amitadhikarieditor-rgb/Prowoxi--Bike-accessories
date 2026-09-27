import {AppError} from '../utils/appError.js';
export const validate=schema=> (req,res,next)=>{
    const r=schema.safeParse({body:req.body,query:req.query,params:req.params});
    if(!r.success)
        return next(new AppError(r.error.issues.map(x=>x.message).join(', '),400,'VALIDATION_ERROR'));

    req.body=r.data.body??req.body;req.query=r.data.query??req.query;
    req.params=r.data.params??req.params;
    
    next();};

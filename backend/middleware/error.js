export function notFound(req,res){res.status(404).json({success:false,message:`Route not found: ${req.method} ${req.originalUrl}`,errorCode:'NOT_FOUND'});}
export function errorHandler(err,req,res,next){
    const status=err.statusCode||500; 
    if(process.env.NODE_ENV!=='production') 
        console.error(err); 
    res.status(status).json({success:false,
        message:err.message||'Internal server error',
        errorCode:err.code||'SERVER_ERROR',
        ...(process.env.NODE_ENV==='production'?{}:{stack:err.stack})});
    }

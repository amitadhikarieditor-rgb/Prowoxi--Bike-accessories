export const ok=(res,data=null,message="OK",status=200,extra={})=>res.status(status).json({success:true,message,data,...extra});

import mongoose from 'mongoose';
 const s=new mongoose.Schema({user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',index:true},
    type:String,title:String,
    message:String,link:String,
    isRead:{
        type:Boolean,default:false
    }
},
        {timestamps:true}); 
        
        export default mongoose.model('Notification',s);

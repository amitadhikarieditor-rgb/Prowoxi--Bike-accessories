import mongoose from 'mongoose';

const s=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:'User',index:true},
        label:String,
        fullName:String,
        line1:String,
        line2:String,
        city:String,
        state:String,
        postalCode:String,

        country:{type:String,default:'India'},
        
        phone:String,isDefault:{
            type:Boolean,default:false}},
            
            {timestamps:true}); 
            
            export default mongoose.model('Address',s);

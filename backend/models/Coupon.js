import mongoose from 'mongoose';
 const s=new mongoose.Schema({
    code:
    {type:String,
    unique:true,
    uppercase:true,trim:true},
    type:{type:String,enum:['percentage','fixed'],
        required:true},
        value:{type:Number,
            min:0,
            required:true},
            minOrder:{type:Number,default:0},
            maxDiscount:Number,
            expiresAt:Date,
            usageLimit:Number,
            usedCount:{type:Number,default:0},
            isActive:{type:Boolean,default:true}},
            {timestamps:true});
 export default mongoose.model('Coupon',s);

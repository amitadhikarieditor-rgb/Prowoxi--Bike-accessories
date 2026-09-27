import mongoose from 'mongoose';

const item=new mongoose.Schema({product:{
    type:mongoose.Schema.Types.ObjectId,
    
    ref:'Product'
},
    name:String,
    image:String,sku:String,
    variantId:mongoose.Schema.Types.ObjectId,
    quantity:Number,
    unitPrice:Number,
    lineTotal:Number},
    {_id:false});

const history=new mongoose.Schema({
    tatus:String,note:String,
    at:{type:Date,default:Date.now}},
    {_id:false});
const s=new mongoose.Schema({
    orderNumber:{type:String,unique:true,index:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',index:true},
    items:[item],addressSnapshot:Object,subtotal:Number,
    discount:Number,
    tax:Number,
    shipping:Number,
    total:Number,
    couponCode:String,paymentStatus:{

        type:String,enum:['PENDING','PAID','FAILED','REFUND_PENDING','REFUNDED'],
        default:'PENDING'},orderStatus:{type:String,enum:['PENDING_PAYMENT','PAID','PROCESSING','PACKED','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED'],
            default:'PENDING_PAYMENT',
            index:true},
            payment:{provider:String,
                providerOrderId:String,
                providerPaymentId:String},
                history:[history]},
                {timestamps:true}); 
                
                export default mongoose.model('Order',s);

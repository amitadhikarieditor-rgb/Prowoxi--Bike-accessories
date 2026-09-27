import mongoose from 'mongoose'; 

const s=new mongoose.Schema({
    product:
    {type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        index:true
    },
        user:
        {type:mongoose.Schema.Types.ObjectId,
            ref:'User'},
            rating:{
                type:Number,min:1,max:5,required:true
            },
            title:
            String,body:String,images:[String],
            verifiedPurchase:{
                type:Boolean,default:false
            },
            isPublished:{
                type:Boolean,default:true
            }
        },
            {timestamps:true});
             s.index({product:1,user:1},
                {unique:true}); 
                
                export default mongoose.model('Review',s);

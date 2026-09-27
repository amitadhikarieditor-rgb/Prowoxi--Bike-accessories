import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    name:{type:String,required:true,
        trim:true,maxlength:80},
        
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
            passwordHash:{
                type:String,required:true,

                select:false
            
            },
            role:{
                    type:String,enum:['user','admin'],
                    default:'user'
                },
                    isActive:{
                        type:Boolean,default:true
                    },
                        isEmailVerified:{
                            type:Boolean,
                            default:false
                        },
                            refreshTokenHash:{
                                type:String,select:false
                            },
                            emailVerifyTokenHash:{
                                type:String,select:false
                            },
                            emailVerifyExpires:Date,
                            resetTokenHash:{
                                type:String,
                                select:false
                            },
                                resetExpires:Date},
                                {timestamps:true});

userSchema.index({email:1},{unique:true}); 

export default mongoose.model('User',userSchema);

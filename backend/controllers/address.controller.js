import Address from '../models/Address.js'; 
export async function list(req,res){
    res.json({success:true,data:await Address.find({user:req.user._id}).sort('-isDefault -createdAt')});}
    
    export async function create(req,res){
        if(req.body.isDefault)
        await Address.updateMany({user:req.user._id},
    {$set:{isDefault:false}});
    res.status(201).json({success:true,data:await Address.create({...req.body,user:req.user._id})});} 
    
    export async function remove(req,res){

        await Address.deleteOne({_id:req.params.id,user:req.user._id});
        
        res.json({success:true,message:'Address removed'});}

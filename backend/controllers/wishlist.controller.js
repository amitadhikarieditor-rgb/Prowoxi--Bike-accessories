import Wishlist from '../models/Wishlist.js'; 

import Product from '../models/Product.js'; 

export async function view(req,res){

    const w=await Wishlist.findOne({
        user:req.user._id
    }).populate('products');
    res.json({success:true,data:w||{user:req.user._id,products:[]}});} 
    
    export async function toggle(req,res){
        const p=await Product.findById(req.params.productId);
        if(!p)throw new Error('Product not found');

        let w=await Wishlist.findOne({user:req.user._id});
        if(!w)w=await Wishlist.create({user:req.user._id,products:[]});

        const id=req.params.productId;

        const has=w.products.some(x=>x.toString()===id);
        w.products=has?w.products.filter(x=>x.toString()!==id):[...w.products,p._id];
        
        await w.save();res.json({success:true,data:w});}

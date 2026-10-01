import Review from '../models/Review.js'; 
import Order from '../models/Order.js'; 
import Product from '../models/Product.js';
 import {AppError} from '../utils/appError.js';

async function recalc(productId){
    const a=await Review.aggregate([{$match:{product:productId,isPublished:true}},
        {$group:{_id:null,
            avg:{$avg:'$rating'},
        count:{$sum:1}}}]);
        await Product.findByIdAndUpdate(productId,
            {ratingAverage:a[0]?.avg||0,ratingCount:a[0]?.count||0});}



export async function list(req, res) {

    const reviews = await Review.find({
        product: req.params.productId,
        isPublished: true
    })
        .populate('user', 'name')
        .sort('-createdAt');

    const data = reviews.map(review => ({
        ...review.toObject(),

        isOwner:
            req.user &&
            review.user &&
            review.user._id.toString() === req.user._id.toString()
    }));

    res.json({
        success: true,
        data
    });
}


export async function create(req, res) {

    const exists = await Review.exists({
        product: req.params.productId,
        user: req.user._id
    });

    if (exists) {
        throw new AppError(
            'You already reviewed this product',
            409
        );
    }

    const purchased = await Order.exists({
        user: req.user._id,
        'items.product': req.params.productId,
        paymentStatus: 'PAID'
    });

    const r = await Review.create({
        product: req.params.productId,
        user: req.user._id,
        ...req.body,
        verifiedPurchase: !!purchased
    });

    await recalc(r.product);

    const populatedReview = await Review
        .findById(r._id)
        .populate('user', 'name');

    res.status(201).json({
        success: true,
        data: {
            ...populatedReview.toObject(),
            isOwner: true
        }
    });
}


        
export async function update(req,res){
    const r=await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id},
        req.body,{new:true,runValidators:true});
        if(!r)throw new AppError('Review not found',404);
        await recalc(r.product);res.json({success:true,data:r});}


export async function remove(req,res){
    const r=await Review.findOneAndDelete({_id:req.params.id,user:req.user._id});
    if(!r)throw new AppError('Review not found',404);
    await recalc(r.product);
    res.json({success:true,message:'Review deleted'});}

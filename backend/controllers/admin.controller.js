import User from '../models/User.js'; 
import Product from '../models/Product.js';
 import Order from '../models/Order.js'; 
 import Review from '../models/Review.js'; 
 import Coupon from '../models/Coupon.js'; 
 import { AppError } from '../utils/appError.js';
 export async function dashboard(req,res){
    const [users,products,orders,revenue]=await Promise.all([User.countDocuments(),
        Product.countDocuments({isActive:true}),
        Order.countDocuments(),Order.aggregate([{$match:{paymentStatus:'PAID'}},
            {$group:{_id:null,total:{$sum:'$total'}}}])]);
            res.json({success:true,data:{users,products,orders,revenue:revenue[0]?.total||0}});}
             export async function users(req,res){res.json({success:true,data:await User.find().select('-passwordHash -refreshTokenHash -resetTokenHash -emailVerifyTokenHash').sort('-createdAt').limit(200)});} 
             
             export async function setUserStatus(req,res){const u=await User.findByIdAndUpdate(req.params.id,{isActive:req.body.isActive},{new:true}).select('name email role isActive');
             res.json({success:true,data:u});} export async function reviews(req,res){res.json({success:true,data:await Review.find().populate('user','name email').populate('product','name').sort('-createdAt').limit(200)});} 
             
             export async function moderateReview(req,res){const r=await Review.findByIdAndUpdate(req.params.id,{isPublished:req.body.isPublished},{new:true});res.json({success:true,data:r});}
             
             export async function coupons(req,res){res.json({success:true,data:await Coupon.find().sort('-createdAt')});}
             
             export async function createCoupon(req,res){res.status(201).json({success:true,data:await Coupon.create({...req.body,code:req.body.code.toUpperCase()})});}
export async function deleteCoupon(req, res) {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
        return res.status(404).json({
            success: false,
            message: 'Coupon not found'
        });
    }

    res.json({
        success: true,
        message: 'Coupon deleted successfully'
    });
};

export async function orders(req, res) {
    const data = await Order
        .find()
        .populate('user', 'name email')
        .sort('-createdAt')
        .limit(200);

    res.json({
        success: true,
        data
    });
}

export async function updateOrderStatus(req, res) {
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new AppError(
            'Order not found',
            404
        );
    }

    const valid = {
        PENDING_PAYMENT: ['PAID', 'CANCELLED'],
        PAID: ['PROCESSING', 'CANCELLED'],
        PROCESSING: ['PACKED'],
        PACKED: ['SHIPPED'],
        SHIPPED: ['OUT_FOR_DELIVERY'],
        OUT_FOR_DELIVERY: ['DELIVERED'],
        DELIVERED: [],
        CANCELLED: []
    };

    if (!valid[order.orderStatus]?.includes(req.body.status)) {
        throw new AppError(
            `Cannot move ${order.orderStatus} to ${req.body.status}`,
            400
        );
    }

    order.orderStatus = req.body.status;

    order.history.push({
        status: req.body.status,
        note: `Order status changed to ${req.body.status}`
    });

    await order.save();

    res.json({
        success: true,
        data: order
    });
}

export async function deleteOrder(req, res) {
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new AppError('Order not found', 404);
    }

    if (
    order.orderStatus !== 'DELIVERED' &&
    order.orderStatus !== 'CANCELLED'
) {
    throw new AppError(
        'Only delivered or cancelled orders can be deleted',
        400
    );
}

    await order.deleteOne();

    res.json({
        success: true,
        message: 'Order deleted successfully'
    });
}
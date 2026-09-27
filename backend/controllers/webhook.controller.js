import {verifyWebhook} from '../services/payment.service.js'; 
import Order from '../models/Order.js';
 import {orderPaid} from '../services/notification.service.js';
  export async function razorpayWebhook(req,res){const sig=req.headers['x-razorpay-signature'];
    if(!verifyWebhook(req.rawBody,sig))
        return res.status(400).send('invalid signature');
    const e=req.body?.event;if(e==='payment.captured'){
        
        const p=req.body.payload.payment.entity;const o=await Order.findOne({'payment.providerOrderId':p.order_id});
        
        if(o&&o.paymentStatus!=='PAID'){o.paymentStatus='PAID';
            o.orderStatus='PAID';o.payment.providerPaymentId=p.id;
            
            o.history.push({status:'PAID',note:'Razorpay webhook'});
        
        await o.save();await orderPaid(o);}}res.json({received:true});}

import { verifyWebhook } from "../services/payment.service.js";
import Order from "../models/Order.js";
import { orderPaid } from "../services/notification.service.js";
export async function razorpayWebhook(req, res) {
  const sig = req.headers["x-razorpay-signature"];
  if (!verifyWebhook(req.rawBody, sig))
    return res.status(400).send("invalid signature");
  const e = req.body?.event;
  if (e === "payment.captured") {
    const payment = req.body.payload.payment.entity;
    const order = await Order.findOne({ "payment.providerOrderId": payment.order_id });

    if (order && order.paymentStatus !== "PAID") {
      order.paymentStatus = "PAID";
      order.orderStatus = "PAID";
      order.payment.providerPaymentId = payment.id;

      order.history.push({ status: "PAID", note: "Razorpay webhook" });

      await order.save();
      await orderPaid(order);
    }
  }
  res.json({ received: true });
}

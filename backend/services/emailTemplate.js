export function paymentSuccessEmail(order) {
    const item = order.items?.[0];
    const address = order.addressSnapshot || {};

    const orderDate = new Date(order.createdAt).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful - PROWOXI</title>
</head>

<body style="
    margin:0;
    padding:0;
    background:#f3f4f6;
    font-family:Arial,Helvetica,sans-serif;
    color:#111827;
">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:30px 10px;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" style="
    max-width:650px;
    width:100%;
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
">


    <tr>
        <td style="
            background:#15191d;
            padding:35px 40px;
            color:#ffffff;
        ">

            <div style="
                font-size:34px;
                font-weight:800;
                letter-spacing:8px;
            ">
                PROWOXI
            </div>

            <div style="
                margin-top:8px;
                font-size:11px;
                letter-spacing:4px;
                color:#cbd5e1;
            ">
                RIDE WITH CONFIDENCE
            </div>

            <div style="
                margin-top:25px;
                font-size:11px;
                letter-spacing:2px;
                color:#cbd5e1;
            ">
                BIKE ACCESSORIES &nbsp; | &nbsp; RIDING GEAR &nbsp; | &nbsp; LIFESTYLE
            </div>

        </td>
    </tr>



    <tr>
        <td style="padding:40px;">

            <div style="
                color:#15803d;
                font-size:14px;
                font-weight:bold;
                letter-spacing:1px;
                margin-bottom:12px;
            ">
                ✓ &nbsp; PAYMENT SUCCESSFUL
            </div>

            <h1 style="
                margin:0;
                font-size:32px;
                color:#111827;
                line-height:1.2;
            ">
                Your Order is Confirmed! 🎉
            </h1>

            <p style="
                margin:25px 0 0;
                font-size:16px;
                line-height:1.7;
                color:#374151;
            ">
                Hey ${address.fullName || 'there'},
            </p>

            <p style="
                margin:12px 0 0;
                font-size:15px;
                line-height:1.7;
                color:#4b5563;
            ">
                Thank you for choosing prowoxi. We're excited to let you know
                that your order has been placed successfully and your payment
                has been received.
            </p>

            <p style="
                margin:12px 0 30px;
                font-size:15px;
                line-height:1.7;
                color:#6b7280;
            ">
                We'll get started on your order right away and keep you updated
                at every step.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="
                background:#f7f8fa;
                border-radius:14px;
                padding:20px;
            ">

                <tr>

                    <td width="55%" valign="top" style="padding:5px 20px 5px 5px;">

                        <h2 style="
                            margin:0 0 20px;
                            font-size:20px;
                            color:#111827;
                        ">
                            Order Details
                        </h2>

                        <p style="margin:10px 0;color:#6b7280;">
                            <strong style="color:#111827;">Order ID:</strong>
                            &nbsp; #${order.orderNumber}
                        </p>

                        <p style="margin:10px 0;color:#6b7280;">
                            <strong style="color:#111827;">Order Date:</strong>
                            &nbsp; ${orderDate}
                        </p>

                        <p style="margin:10px 0;color:#6b7280;">
                            <strong style="color:#111827;">Payment:</strong>
                            &nbsp;
                            <span style="
                                background:#dcfce7;
                                color:#15803d;
                                padding:5px 10px;
                                border-radius:20px;
                                font-weight:bold;
                            ">
                                ✓ Paid
                            </span>
                        </p>

                        <p style="margin:10px 0;color:#6b7280;">
                            <strong style="color:#111827;">Status:</strong>
                            &nbsp; Confirmed
                        </p>

                    </td>


                    <td width="45%" valign="top" style="
                        padding:5px 5px 5px 25px;
                        border-left:1px solid #d1d5db;
                    ">

                        <h2 style="
                            margin:0 0 20px;
                            font-size:18px;
                            color:#111827;
                        ">
                            📍 Delivery Address
                        </h2>

                        <p style="
                            margin:6px 0;
                            font-weight:bold;
                            color:#374151;
                        ">
                            ${address.fullName || ''}
                        </p>

                        <p style="
                            margin:6px 0;
                            color:#6b7280;
                            line-height:1.5;
                        ">
                            ${address.addressLine1 || address.address || ''}<br>
                            ${address.addressLine2 ? address.addressLine2 + '<br>' : ''}
                            ${address.city || ''}, ${address.state || ''}<br>
                            ${address.pincode || address.postalCode || ''}<br>
                            ${address.country || 'India'}
                        </p>

                    </td>

                </tr>

            </table>

            <h2 style="
                margin:35px 0 15px;
                font-size:20px;
                color:#111827;
            ">
                Items in Your Order
            </h2>

            <table width="100%" cellpadding="0" cellspacing="0" style="
                border:1px solid #e5e7eb;
                border-radius:14px;
                overflow:hidden;
            ">

                <tr>

                    <td width="110" style="padding:15px;">

                        ${
                            item?.image
                                ? `
                                <img
                                    src="${item.image}"
                                    width="90"
                                    height="90"
                                    style="
                                        display:block;
                                        width:90px;
                                        height:90px;
                                        object-fit:cover;
                                        border-radius:10px;
                                        background:#f3f4f6;
                                    "
                                />
                                `
                                : ''
                        }

                    </td>

                    <td style="padding:15px;">

                        <p style="
                            margin:0 0 8px;
                            font-size:16px;
                            font-weight:bold;
                            color:#111827;
                        ">
                            ${item?.name || 'Product'}
                        </p>

                        <p style="
                            margin:0 0 8px;
                            font-size:14px;
                            color:#6b7280;
                        ">
                            Qty: ${item?.quantity || 1}
                        </p>

                    </td>

                    <td align="right" style="
                        padding:15px;
                        font-size:16px;
                        font-weight:bold;
                        color:#111827;
                    ">
                        ₹${item?.lineTotal || order.total}
                    </td>

                </tr>

            </table>

            <div style="
                margin-top:20px;
                background:#f7f8fa;
                border-radius:14px;
                padding:20px;
            ">

                <h2 style="
                    margin:0 0 20px;
                    font-size:20px;
                    color:#111827;
                ">
                    Order Summary
                </h2>

                <table width="100%" cellpadding="0" cellspacing="0">

                    <tr>
                        <td style="padding:7px 0;color:#6b7280;">
                            Subtotal
                        </td>

                        <td align="right" style="padding:7px 0;color:#374151;">
                            ₹${order.subtotal}
                        </td>
                    </tr>

                    ${
                        order.discount
                            ? `
                    <tr>
                        <td style="padding:7px 0;color:#6b7280;">
                            Discount
                        </td>

                        <td align="right" style="padding:7px 0;color:#15803d;">
                            -₹${order.discount}
                        </td>
                    </tr>
                    `
                            : ''
                    }

                    <tr>
                        <td style="padding:7px 0;color:#6b7280;">
                            Shipping
                        </td>

                        <td align="right" style="padding:7px 0;color:#374151;">
                            ${
                                order.shipping === 0
                                    ? 'Free'
                                    : `₹${order.shipping}`
                            }
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2" style="
                            border-top:1px solid #d1d5db;
                            padding-top:15px;
                        "></td>
                    </tr>

                    <tr>
                        <td style="
                            font-size:17px;
                            font-weight:bold;
                            color:#111827;
                        ">
                            Total Paid
                        </td>

                        <td align="right" style="
                            font-size:18px;
                            font-weight:bold;
                            color:#111827;
                        ">
                            ₹${order.total}
                        </td>
                    </tr>

                </table>

            </div>

            <h2 style="
                margin:35px 0 20px;
                font-size:20px;
                color:#111827;
            ">
                What Happens Next?
            </h2>

            <table width="100%" cellpadding="0" cellspacing="0">

                <tr>

                    <td width="25%" valign="top" style="padding-right:12px;">

                        <div style="font-size:25px;">📦</div>

                        <p style="
                            margin:10px 0 5px;
                            font-weight:bold;
                            color:#111827;
                        ">
                            1. Order Processing
                        </p>

                        <p style="
                            margin:0;
                            font-size:13px;
                            line-height:1.5;
                            color:#6b7280;
                        ">
                            We'll prepare your order for shipping.
                        </p>

                    </td>

                    <td width="25%" valign="top" style="padding:0 12px;">

                        <div style="font-size:25px;">🚚</div>

                        <p style="
                            margin:10px 0 5px;
                            font-weight:bold;
                            color:#111827;
                        ">
                            2. Shipping
                        </p>

                        <p style="
                            margin:0;
                            font-size:13px;
                            line-height:1.5;
                            color:#6b7280;
                        ">
                            You'll receive tracking details once shipped.
                        </p>

                    </td>

                    <td width="25%" valign="top" style="padding:0 12px;">

                        <div style="font-size:25px;">✉️</div>

                        <p style="
                            margin:10px 0 5px;
                            font-weight:bold;
                            color:#111827;
                        ">
                            3. Order Updates
                        </p>

                        <p style="
                            margin:0;
                            font-size:13px;
                            line-height:1.5;
                            color:#6b7280;
                        ">
                            We'll keep you updated by email.
                        </p>

                    </td>

                    <td width="25%" valign="top" style="padding-left:12px;">

                        <div style="font-size:25px;">🛡️</div>

                        <p style="
                            margin:10px 0 5px;
                            font-weight:bold;
                            color:#111827;
                        ">
                            4. Support
                        </p>

                        <p style="
                            margin:0;
                            font-size:13px;
                            line-height:1.5;
                            color:#6b7280;
                        ">
                            Need help? Contact our support team.
                        </p>

                    </td>

                </tr>

            </table>

            <div style="
                text-align:center;
                margin:35px 0;
            ">

                <a
                    href="${clientUrl}/orders/${order._id}"
                    style="
                        display:inline-block;
                        background:#111827;
                        color:#ffffff;
                        text-decoration:none;
                        padding:15px 35px;
                        border-radius:8px;
                        font-weight:bold;
                        font-size:15px;
                    "
                >
                    Track Your Order &nbsp; →
                </a>

            </div>
            <div style="
                border-top:1px solid #e5e7eb;
                padding-top:25px;
                margin-top:20px;
            ">

                <p style="
                    margin:0;
                    font-size:16px;
                    font-weight:bold;
                    color:#111827;
                ">
                    Thanks for choosing Prowoxi!
                </p>

                <p style="
                    margin:6px 0 0;
                    color:#6b7280;
                    font-size:14px;
                ">
                    Ride Safe. Ride Better.
                </p>

                <p style="
                    margin:25px 0 0;
                    text-align:right;
                    font-size:22px;
                    font-weight:bold;
                    letter-spacing:4px;
                    color:#111827;
                ">
                    PROWOXI
                </p>

            </div>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}
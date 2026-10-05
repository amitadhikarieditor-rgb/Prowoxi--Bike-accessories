export function paymentSuccessEmail(order) {
    const items = Array.isArray(order.items) ? order.items : [];
    const address = order.addressSnapshot || {};

    const orderDate = new Date(order.createdAt).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const clientUrl =
        process.env.CLIENT_URL || 'http://localhost:5173';

    const formatPrice = (value) =>
        Number(value || 0).toLocaleString('en-IN');

    const itemRows = items
        .map(
            (item) => `
                <tr>
                    <td style="
                        padding:18px 0;
                        border-bottom:1px solid #e5e7eb;
                    ">
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>

                                <td width="82" valign="top">
                                    ${
                                        item?.image
                                            ? `
                                                <img
                                                    src="${item.image}"
                                                    width="68"
                                                    height="68"
                                                    alt="${item?.name || 'Product'}"
                                                    style="
                                                        display:block;
                                                        width:68px;
                                                        height:68px;
                                                        object-fit:cover;
                                                        border-radius:10px;
                                                        background:#f3f4f6;
                                                    "
                                                />
                                            `
                                            : `
                                                <div style="
                                                    width:68px;
                                                    height:68px;
                                                    background:#f3f4f6;
                                                    border-radius:10px;
                                                    text-align:center;
                                                    line-height:68px;
                                                    color:#9ca3af;
                                                    font-size:12px;
                                                ">
                                                    PROWOXI
                                                </div>
                                            `
                                    }
                                </td>

                                <td valign="top" style="padding-left:14px;">

                                    <p style="
                                        margin:0 0 6px;
                                        font-size:15px;
                                        font-weight:700;
                                        color:#111827;
                                    ">
                                        ${item?.name || 'Product'}
                                    </p>

                                    <p style="
                                        margin:0 0 6px;
                                        font-size:13px;
                                        color:#6b7280;
                                    ">
                                        Quantity: ${item?.quantity || 1}
                                    </p>

                                    ${
                                        item?.price
                                            ? `
                                                <p style="
                                                    margin:0;
                                                    font-size:13px;
                                                    color:#6b7280;
                                                ">
                                                    ₹${formatPrice(item.price)} each
                                                </p>
                                            `
                                            : ''
                                    }

                                </td>

                                <td
                                    width="100"
                                    valign="top"
                                    align="right"
                                    style="
                                        padding-left:10px;
                                        font-size:15px;
                                        font-weight:700;
                                        color:#111827;
                                    "
                                >
                                    ₹${formatPrice(
                                        item?.lineTotal ||
                                            (item?.price || 0) *
                                                (item?.quantity || 1)
                                    )}
                                </td>

                            </tr>
                        </table>
                    </td>
                </tr>
            `
        )
        .join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Order Confirmed - PROWOXI</title>
</head>

<body style="
    margin:0;
    padding:0;
    background:#f4f5f7;
    font-family:Arial,Helvetica,sans-serif;
    color:#111827;
">

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#f4f5f7;
        padding:32px 12px;
    "
>
<tr>
<td align="center">

<table
    width="640"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        width:100%;
        max-width:640px;
        background:#ffffff;
        border-radius:16px;
        overflow:hidden;
    "
>


<tr>
<td style="
    background:#111418;
    padding:32px 36px;
">

    <div style="
        font-size:28px;
        font-weight:800;
        letter-spacing:7px;
        color:#ffffff;
    ">
        PROWOXI
    </div>

    <div style="
        margin-top:8px;
        font-size:10px;
        letter-spacing:3px;
        color:#aeb6c2;
    ">
        RIDE WITH CONFIDENCE
    </div>

</td>
</tr>

<tr>
<td style="
    padding:38px 36px 35px;
">

    <div style="
        display:inline-block;
        background:#ecfdf3;
        color:#15803d;
        padding:7px 12px;
        border-radius:20px;
        font-size:11px;
        font-weight:700;
        letter-spacing:1px;
        margin-bottom:16px;
    ">
        ✓ PAYMENT SUCCESSFUL
    </div>

    <h1 style="
        margin:0;
        font-size:30px;
        line-height:1.25;
        color:#111827;
    ">
        Your order is confirmed.
    </h1>

    <p style="
        margin:18px 0 0;
        font-size:15px;
        line-height:1.7;
        color:#4b5563;
    ">
        Hi ${address.fullName || 'there'},
    </p>

    <p style="
        margin:8px 0 0;
        font-size:15px;
        line-height:1.7;
        color:#6b7280;
    ">
        Thank you for shopping with PROWOXI. Your payment has been
        successfully received and your order is now confirmed.
    </p>

    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="
            margin-top:28px;
            background:#f8fafc;
            border:1px solid #e5e7eb;
            border-radius:12px;
        "
    >
        <tr>

            <td
                width="50%"
                style="
                    padding:18px;
                    border-right:1px solid #e5e7eb;
                "
            >
                <p style="
                    margin:0 0 5px;
                    font-size:11px;
                    color:#9ca3af;
                    text-transform:uppercase;
                    letter-spacing:1px;
                ">
                    Order Number
                </p>

                <p style="
                    margin:0;
                    font-size:14px;
                    font-weight:700;
                    color:#111827;
                ">
                    #${order.orderNumber}
                </p>
            </td>

            <td
                width="50%"
                style="padding:18px;"
            >
                <p style="
                    margin:0 0 5px;
                    font-size:11px;
                    color:#9ca3af;
                    text-transform:uppercase;
                    letter-spacing:1px;
                ">
                    Order Date
                </p>

                <p style="
                    margin:0;
                    font-size:14px;
                    font-weight:700;
                    color:#111827;
                ">
                    ${orderDate}
                </p>
            </td>

        </tr>
    </table>


    <h2 style="
        margin:32px 0 14px;
        font-size:18px;
        color:#111827;
    ">
        Delivery Details
    </h2>

    <div style="
        border:1px solid #e5e7eb;
        border-radius:12px;
        padding:18px;
    ">

        <p style="
            margin:0 0 7px;
            font-size:14px;
            font-weight:700;
            color:#111827;
        ">
            ${address.fullName || ''}
        </p>

        <p style="
            margin:0;
            font-size:13px;
            line-height:1.7;
            color:#6b7280;
        ">
            ${address.addressLine1 || address.address || ''}<br>
            ${
                address.addressLine2
                    ? `${address.addressLine2}<br>`
                    : ''
            }
            ${address.city || ''}, ${address.state || ''}<br>
            ${address.pincode || address.postalCode || ''}<br>
            ${address.country || 'India'}
        </p>

    </div>



    <h2 style="
        margin:32px 0 8px;
        font-size:18px;
        color:#111827;
    ">
        Order Items
    </h2>

    <p style="
        margin:0 0 4px;
        font-size:13px;
        color:#6b7280;
    ">
        ${items.length} ${
            items.length === 1 ? 'item' : 'items'
        } in this order
    </p>

    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="margin-top:8px;"
    >

        ${itemRows}

    </table>

    <div style="
        margin-top:8px;
        background:#f8fafc;
        border:1px solid #e5e7eb;
        border-radius:12px;
        padding:20px;
    ">

        <h2 style="
            margin:0 0 16px;
            font-size:18px;
            color:#111827;
        ">
            Order Summary
        </h2>

        <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
        >

            <tr>
                <td style="
                    padding:6px 0;
                    font-size:14px;
                    color:#6b7280;
                ">
                    Subtotal
                </td>

                <td
                    align="right"
                    style="
                        padding:6px 0;
                        font-size:14px;
                        color:#374151;
                    "
                >
                    ₹${formatPrice(order.subtotal)}
                </td>
            </tr>

            ${
                order.discount
                    ? `
                        <tr>
                            <td style="
                                padding:6px 0;
                                font-size:14px;
                                color:#6b7280;
                            ">
                                Discount
                            </td>

                            <td
                                align="right"
                                style="
                                    padding:6px 0;
                                    font-size:14px;
                                    color:#15803d;
                                    font-weight:600;
                                "
                            >
                                -₹${formatPrice(order.discount)}
                            </td>
                        </tr>
                    `
                    : ''
            }

            <tr>
                <td style="
                    padding:6px 0;
                    font-size:14px;
                    color:#6b7280;
                ">
                    Shipping
                </td>

                <td
                    align="right"
                    style="
                        padding:6px 0;
                        font-size:14px;
                        color:#374151;
                    "
                >
                    ${
                        Number(order.shipping || 0) === 0
                            ? 'Free'
                            : `₹${formatPrice(order.shipping)}`
                    }
                </td>
            </tr>

            <tr>
                <td
                    colspan="2"
                    style="
                        padding-top:14px;
                        border-top:1px solid #d1d5db;
                    "
                ></td>
            </tr>

            <tr>
                <td style="
                    font-size:16px;
                    font-weight:700;
                    color:#111827;
                ">
                    Total Paid
                </td>

                <td
                    align="right"
                    style="
                        font-size:18px;
                        font-weight:800;
                        color:#111827;
                    "
                >
                    ₹${formatPrice(order.total)}
                </td>
            </tr>

        </table>

    </div>


    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="margin-top:18px;"
    >
        <tr>

            <td
                width="50%"
                style="
                    background:#ecfdf3;
                    border-radius:10px;
                    padding:14px;
                "
            >
                <p style="
                    margin:0 0 4px;
                    font-size:11px;
                    color:#15803d;
                    text-transform:uppercase;
                    letter-spacing:1px;
                    font-weight:700;
                ">
                    Payment
                </p>

                <p style="
                    margin:0;
                    font-size:14px;
                    color:#166534;
                    font-weight:700;
                ">
                    ✓ Paid
                </p>
            </td>

            <td width="12"></td>

            <td
                width="50%"
                style="
                    background:#f3f4f6;
                    border-radius:10px;
                    padding:14px;
                "
            >
                <p style="
                    margin:0 0 4px;
                    font-size:11px;
                    color:#6b7280;
                    text-transform:uppercase;
                    letter-spacing:1px;
                    font-weight:700;
                ">
                    Order Status
                </p>

                <p style="
                    margin:0;
                    font-size:14px;
                    color:#111827;
                    font-weight:700;
                ">
                    Confirmed
                </p>
            </td>

        </tr>
    </table>


    <div style="
        text-align:center;
        margin:32px 0 8px;
    ">

        <a
            href="${clientUrl}/orders/${order._id}"
            style="
                display:inline-block;
                background:#111827;
                color:#ffffff;
                text-decoration:none;
                padding:14px 28px;
                border-radius:8px;
                font-size:14px;
                font-weight:700;
            "
        >
            View Order
            &nbsp; →
        </a>

    </div>


    <!-- FOOTER MESSAGE -->

    <div style="
        margin-top:32px;
        padding-top:24px;
        border-top:1px solid #e5e7eb;
    ">

        <p style="
            margin:0;
            font-size:14px;
            line-height:1.6;
            color:#374151;
        ">
            We'll keep you updated as your order moves through
            processing and delivery.
        </p>

        <p style="
            margin:14px 0 0;
            font-size:13px;
            line-height:1.6;
            color:#9ca3af;
        ">
            If you have any questions regarding your order, please
            contact our support team.
        </p>

    </div>

</td>
</tr>


<!-- FOOTER -->

<tr>
<td style="
    background:#111418;
    padding:25px 36px;
    text-align:center;
">

    <div style="
        font-size:20px;
        font-weight:800;
        letter-spacing:5px;
        color:#ffffff;
    ">
        PROWOXI
    </div>

    <p style="
        margin:8px 0 0;
        font-size:10px;
        letter-spacing:2px;
        color:#9ca3af;
    ">
        RIDE WITH CONFIDENCE
    </p>

    <p style="
        margin:16px 0 0;
        font-size:11px;
        line-height:1.5;
        color:#6b7280;
    ">
        This is an automated order confirmation.
        Please do not reply to this email.
    </p>

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
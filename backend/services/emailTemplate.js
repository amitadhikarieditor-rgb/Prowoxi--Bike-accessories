export function paymentSuccessEmail(order) {
    const items = Array.isArray(order.items) ? order.items : [];
    const address = order.addressSnapshot || {};

    const orderDate = new Date(order.createdAt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    const clientUrl =
        process.env.CLIENT_URL || "http://localhost:5173";

    const formatPrice = (value) =>
        Number(value || 0).toLocaleString("en-IN");

    const itemRows = items
        .map((item) => {
            const quantity = Number(item?.quantity || 1);
            const price = Number(item?.price || 0);

            const lineTotal =
                item?.lineTotal != null
                    ? Number(item.lineTotal)
                    : price * quantity;

            return `
                <tr>
                    <td style="
                        padding:20px 0;
                        border-bottom:1px solid #edf0f3;
                    ">

                        <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                        >
                            <tr>

                                <!-- PRODUCT IMAGE -->

                                <td
                                    width="76"
                                    valign="top"
                                    style="width:76px;"
                                >
                                    ${
                                        item?.image
                                            ? `
                                                <img
                                                    src="${item.image}"
                                                    width="64"
                                                    height="64"
                                                    alt="${item?.name || "Product"}"
                                                    style="
                                                        display:block;
                                                        width:64px;
                                                        height:64px;
                                                        object-fit:cover;
                                                        border-radius:12px;
                                                        background:#f3f5f7;
                                                        border:1px solid #e6e9ed;
                                                    "
                                                />
                                            `
                                            : `
                                                <div style="
                                                    width:64px;
                                                    height:64px;
                                                    line-height:64px;
                                                    text-align:center;
                                                    background:#f3f5f7;
                                                    border:1px solid #e6e9ed;
                                                    border-radius:12px;
                                                    color:#9ca3af;
                                                    font-size:9px;
                                                    font-weight:700;
                                                    letter-spacing:1px;
                                                ">
                                                    PROWOXI
                                                </div>
                                            `
                                    }
                                </td>


                                <!-- PRODUCT INFO -->

                                <td
                                    valign="middle"
                                    style="
                                        padding-left:14px;
                                        padding-right:10px;
                                    "
                                >

                                    <p style="
                                        margin:0 0 6px;
                                        font-family:Arial,Helvetica,sans-serif;
                                        font-size:14px;
                                        line-height:20px;
                                        font-weight:700;
                                        color:#111827;
                                    ">
                                        ${item?.name || "Product"}
                                    </p>

                                    <p style="
                                        margin:0;
                                        font-family:Arial,Helvetica,sans-serif;
                                        font-size:12px;
                                        line-height:18px;
                                        color:#7b8491;
                                    ">
                                        Qty ${quantity}
                                        ${
                                            price > 0
                                                ? ` &nbsp;·&nbsp; ₹${formatPrice(price)} each`
                                                : ""
                                        }
                                    </p>

                                </td>


                                <!-- TOTAL -->

                                <td
                                    width="100"
                                    valign="middle"
                                    align="right"
                                    style="
                                        width:100px;
                                        font-family:Arial,Helvetica,sans-serif;
                                        font-size:14px;
                                        font-weight:700;
                                        color:#111827;
                                    "
                                >
                                    ₹${formatPrice(lineTotal)}
                                </td>

                            </tr>
                        </table>

                    </td>
                </tr>
            `;
        })
        .join("");


    return `
<!DOCTYPE html>

<html>
<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="color-scheme"
        content="light"
    >

    <meta
        name="supported-color-schemes"
        content="light"
    >

    <title>Order Confirmed — PROWOXI</title>

</head>


<body style="
    margin:0;
    padding:0;
    background:#eef2f5;
    font-family:Arial,Helvetica,sans-serif;
    color:#111827;
">


<!-- OUTER -->

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        width:100%;
        background:
            linear-gradient(
                180deg,
                #eef2f5 0%,
                #f7f9fa 100%
            );
        padding:42px 14px;
"
>

<tr>
<td align="center">


<!-- EMAIL CONTAINER -->

<table
    width="650"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        width:100%;
        max-width:650px;
        background:#ffffff;
        border-radius:20px;
        overflow:hidden;
        box-shadow:
            0 20px 55px rgba(15,23,42,0.10);
"
>


<!-- ================================= -->
<!-- HEADER -->
<!-- ================================= -->

<tr>

<td style="
    padding:34px 38px 32px;
    background:#0d1117;
    position:relative;
">

    <div style="
        font-size:27px;
        line-height:32px;
        font-weight:900;
        letter-spacing:7px;
        color:#ffffff;
    ">
        PROWOXI
    </div>

    <div style="
        margin-top:8px;
        font-size:9px;
        line-height:14px;
        font-weight:700;
        letter-spacing:3px;
        color:#8e99a7;
    ">
        RIDE WITH CONFIDENCE
    </div>

</td>

</tr>


<!-- ================================= -->
<!-- SUCCESS HERO -->
<!-- ================================= -->

<tr>

<td style="
    padding:38px 38px 30px;
">

    <!-- SUCCESS PILL -->

    <table
        cellpadding="0"
        cellspacing="0"
        border="0"
    >
        <tr>

            <td style="
                background:#ecfdf5;
                border:1px solid #bbf7d0;
                border-radius:999px;
                padding:7px 13px;
            ">

                <span style="
                    font-size:10px;
                    line-height:14px;
                    font-weight:800;
                    letter-spacing:1.2px;
                    color:#15803d;
                ">
                    ✓ &nbsp; PAYMENT SUCCESSFUL
                </span>

            </td>

        </tr>
    </table>


    <h1 style="
        margin:20px 0 0;
        font-size:31px;
        line-height:39px;
        letter-spacing:-0.6px;
        font-weight:800;
        color:#101318;
    ">
        Your order is<br>
        officially confirmed.
    </h1>


    <p style="
        margin:17px 0 0;
        font-size:14px;
        line-height:23px;
        color:#66707d;
    ">
        Hi <strong style="color:#252b33;">
            ${address.fullName || "there"}
        </strong>,
    </p>


    <p style="
        margin:7px 0 0;
        font-size:14px;
        line-height:23px;
        color:#7a838e;
    ">
        Thank you for choosing PROWOXI. Your payment has been
        successfully received and your order is now being prepared.
    </p>

</td>

</tr>


<!-- ================================= -->
<!-- ORDER META -->
<!-- ================================= -->

<tr>

<td style="
    padding:0 38px 30px;
">

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#f8fafb;
        border:1px solid #e7ebef;
        border-radius:14px;
    "
>

<tr>

    <td
        width="50%"
        style="
            padding:17px 18px;
            border-right:1px solid #e5e9ed;
        "
    >

        <p style="
            margin:0 0 6px;
            font-size:9px;
            line-height:12px;
            text-transform:uppercase;
            letter-spacing:1.3px;
            color:#9aa3ad;
            font-weight:700;
        ">
            Order Number
        </p>

        <p style="
            margin:0;
            font-size:13px;
            line-height:18px;
            font-weight:800;
            color:#171b21;
        ">
            #${order.orderNumber}
        </p>

    </td>


    <td
        width="50%"
        style="
            padding:17px 18px;
        "
    >

        <p style="
            margin:0 0 6px;
            font-size:9px;
            line-height:12px;
            text-transform:uppercase;
            letter-spacing:1.3px;
            color:#9aa3ad;
            font-weight:700;
        ">
            Order Date
        </p>

        <p style="
            margin:0;
            font-size:13px;
            line-height:18px;
            font-weight:800;
            color:#171b21;
        ">
            ${orderDate}
        </p>

    </td>

</tr>

</table>

</td>

</tr>


<!-- ================================= -->
<!-- ITEMS -->
<!-- ================================= -->

<tr>

<td style="
    padding:0 38px;
">

    <div style="
        font-size:17px;
        line-height:24px;
        font-weight:800;
        color:#171b21;
    ">
        Your Items
    </div>

    <div style="
        margin-top:5px;
        font-size:12px;
        line-height:18px;
        color:#8a939e;
    ">
        ${items.length}
        ${items.length === 1 ? "item" : "items"}
        in this order
    </div>


    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="margin-top:4px;"
    >

        ${itemRows}

    </table>

</td>

</tr>


<!-- ================================= -->
<!-- DELIVERY -->
<!-- ================================= -->

<tr>

<td style="
    padding:30px 38px 0;
">

    <div style="
        font-size:17px;
        line-height:24px;
        font-weight:800;
        color:#171b21;
        margin-bottom:13px;
    ">
        Delivery Details
    </div>


    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
            background:#fafbfc;
            border:1px solid #e7ebef;
            border-radius:14px;
        "
    >

    <tr>

        <td style="padding:18px 19px;">

            <p style="
                margin:0 0 7px;
                font-size:13px;
                line-height:18px;
                font-weight:800;
                color:#20252c;
            ">
                ${address.fullName || ""}
            </p>

            <p style="
                margin:0;
                font-size:12px;
                line-height:20px;
                color:#737d89;
            ">
                ${address.addressLine1 || address.address || ""}
                <br>

                ${
                    address.addressLine2
                        ? `${address.addressLine2}<br>`
                        : ""
                }

                ${address.city || ""},
                ${address.state || ""}
                <br>

                ${address.pincode || address.postalCode || ""}
                <br>

                ${address.country || "India"}
            </p>

        </td>

    </tr>

    </table>

</td>

</tr>


<!-- ================================= -->
<!-- ORDER SUMMARY -->
<!-- ================================= -->

<tr>

<td style="
    padding:30px 38px 0;
">

    <div style="
        padding:22px;
        background:#11161d;
        border-radius:16px;
        color:#ffffff;
    ">

        <div style="
            margin-bottom:17px;
            font-size:16px;
            line-height:22px;
            font-weight:800;
            color:#ffffff;
        ">
            Order Summary
        </div>


        <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
        >

            <tr>

                <td style="
                    padding:6px 0;
                    font-size:12px;
                    color:#9da6b1;
                ">
                    Subtotal
                </td>

                <td
                    align="right"
                    style="
                        padding:6px 0;
                        font-size:12px;
                        color:#e6e9ed;
                    "
                >
                    ₹${formatPrice(order.subtotal)}
                </td>

            </tr>


            ${
                Number(order.discount || 0) > 0
                    ? `
                        <tr>

                            <td style="
                                padding:6px 0;
                                font-size:12px;
                                color:#9da6b1;
                            ">
                                Discount
                            </td>

                            <td
                                align="right"
                                style="
                                    padding:6px 0;
                                    font-size:12px;
                                    font-weight:700;
                                    color:#4ade80;
                                "
                            >
                                −₹${formatPrice(order.discount)}
                            </td>

                        </tr>
                    `
                    : ""
            }


            <tr>

                <td style="
                    padding:6px 0;
                    font-size:12px;
                    color:#9da6b1;
                ">
                    Shipping
                </td>

                <td
                    align="right"
                    style="
                        padding:6px 0;
                        font-size:12px;
                        color:#e6e9ed;
                    "
                >
                    ${
                        Number(order.shipping || 0) === 0
                            ? "FREE"
                            : `₹${formatPrice(order.shipping)}`
                    }
                </td>

            </tr>


            <tr>

                <td
                    colspan="2"
                    style="
                        padding-top:14px;
                        border-bottom:1px solid #2b323b;
                    "
                ></td>

            </tr>


            <tr>

                <td style="
                    padding-top:17px;
                    font-size:13px;
                    font-weight:700;
                    color:#c8ced6;
                ">
                    Total Paid
                </td>

                <td
                    align="right"
                    style="
                        padding-top:17px;
                        font-size:21px;
                        font-weight:900;
                        color:#ffffff;
                    "
                >
                    ₹${formatPrice(order.total)}
                </td>

            </tr>

        </table>

    </div>

</td>

</tr>


<!-- ================================= -->
<!-- PAYMENT STATUS -->
<!-- ================================= -->

<tr>

<td style="
    padding:20px 38px 0;
">

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
>

<tr>

    <td
        width="50%"
        style="
            padding:15px;
            background:#f0fdf4;
            border:1px solid #dcfce7;
            border-radius:12px;
        "
    >

        <p style="
            margin:0 0 5px;
            font-size:9px;
            text-transform:uppercase;
            letter-spacing:1px;
            color:#65a374;
            font-weight:700;
        ">
            Payment
        </p>

        <p style="
            margin:0;
            font-size:13px;
            color:#166534;
            font-weight:800;
        ">
            ✓ Paid Successfully
        </p>

    </td>


    <td width="12"></td>


    <td
        width="50%"
        style="
            padding:15px;
            background:#f8fafc;
            border:1px solid #e5e7eb;
            border-radius:12px;
        "
    >

        <p style="
            margin:0 0 5px;
            font-size:9px;
            text-transform:uppercase;
            letter-spacing:1px;
            color:#9ca3af;
            font-weight:700;
        ">
            Status
        </p>

        <p style="
            margin:0;
            font-size:13px;
            color:#111827;
            font-weight:800;
        ">
            Order Confirmed
        </p>

    </td>

</tr>

</table>

</td>

</tr>


<!-- ================================= -->
<!-- CTA -->
<!-- ================================= -->

<tr>

<td
    align="center"
    style="
        padding:32px 38px 12px;
    "
>

    <a
        href="${clientUrl}/orders/${order._id}"
        style="
            display:inline-block;
            padding:14px 30px;
            background:#11161d;
            border-radius:10px;
            color:#ffffff;
            text-decoration:none;
            font-size:13px;
            line-height:18px;
            font-weight:800;
            letter-spacing:0.2px;
        "
    >
        View Your Order&nbsp;&nbsp; →
    </a>

</td>

</tr>


<!-- ================================= -->
<!-- MESSAGE -->
<!-- ================================= -->

<tr>

<td style="
    padding:24px 38px 34px;
">

    <div style="
        border-top:1px solid #edf0f3;
        padding-top:22px;
    ">

        <p style="
            margin:0;
            font-size:12px;
            line-height:20px;
            color:#5f6874;
        ">
            We'll keep you updated as your order moves through
            processing and delivery.
        </p>

        <p style="
            margin:9px 0 0;
            font-size:11px;
            line-height:18px;
            color:#9aa2ac;
        ">
            If you have any questions regarding your order,
            please contact the PROWOXI support team.
        </p>

    </div>

</td>

</tr>


<!-- ================================= -->
<!-- FOOTER -->
<!-- ================================= -->

<tr>

<td
    align="center"
    style="
        padding:27px 30px;
        background:#0d1117;
    "
>

    <div style="
        font-size:20px;
        line-height:25px;
        font-weight:900;
        letter-spacing:5px;
        color:#ffffff;
    ">
        PROWOXI
    </div>


    <div style="
        margin-top:7px;
        font-size:8px;
        line-height:13px;
        font-weight:700;
        letter-spacing:2.5px;
        color:#7f8995;
    ">
        RIDE WITH CONFIDENCE
    </div>


    <p style="
        margin:16px 0 0;
        font-size:10px;
        line-height:16px;
        color:#606a76;
    ">
        This is an automated order confirmation.<br>
        Please do not reply to this email.
    </p>


    <p style="
        margin:14px 0 0;
        font-size:9px;
        line-height:14px;
        color:#4f5863;
    ">
        © ${new Date().getFullYear()} PROWOXI
    </p>

</td>

</tr>


</table>

<!-- END EMAIL -->

</td>
</tr>

</table>

</body>
</html>
`;
}
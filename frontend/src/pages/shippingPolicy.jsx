import React from "react";
import "../styles/shippingPolicy.css";

export default function ShippingPolicy() {
    return (
        <main className="shipping-page">

            <section className="shipping-hero">
                <div className="shipping-container">

                    <span className="shipping-eyebrow">
                        PROWOXI / SHIPPING
                    </span>

                    <h1>
                        Shipping
                        <br />
                        Policy
                    </h1>

                    <p>
                        Everything you need to know about how your ProWoxi
                        order is processed, packed, and delivered.
                    </p>

                </div>
            </section>

            <section className="shipping-content">
                <div className="shipping-container shipping-layout">

                    <aside className="shipping-sidebar">
                        <span>ON THIS PAGE</span>

                        <a href="#processing">Order Processing</a>
                        <a href="#delivery">Delivery</a>
                        <a href="#tracking">Order Tracking</a>
                        <a href="#delays">Delays</a>
                        <a href="#address">Address Changes</a>
                    </aside>

                    <div className="shipping-details">

                        <section id="processing">
                            <span className="shipping-number">01</span>

                            <h2>Order Processing</h2>

                            <p>
                                Once an order is successfully placed, we begin
                                processing it for dispatch. Orders are checked,
                                packed, and prepared for shipment before being
                                handed over to the delivery partner.
                            </p>

                            <p>
                                Processing time may vary depending on product
                                availability, order volume, and other
                                operational factors.
                            </p>
                        </section>

                        <section id="delivery">
                            <span className="shipping-number">02</span>

                            <h2>Delivery</h2>

                            <p>
                                Delivery timelines may vary depending on your
                                location, the availability of the product,
                                and the courier service handling your order.
                            </p>

                            <p>
                                The estimated delivery information provided
                                during checkout should be considered an
                                estimate and not a guaranteed delivery date.
                            </p>
                        </section>

                        <section id="tracking">
                            <span className="shipping-number">03</span>

                            <h2>Order Tracking</h2>

                            <p>
                                Once your order has been dispatched, tracking
                                information may be made available through the
                                order details associated with your account.
                            </p>

                            <p>
                                Tracking updates depend on the shipping partner
                                and may take some time to appear after the
                                order has been dispatched.
                            </p>
                        </section>

                        <section id="delays">
                            <span className="shipping-number">04</span>

                            <h2>Delivery Delays</h2>

                            <p>
                                Delivery may occasionally take longer than
                                expected due to factors such as weather,
                                transportation issues, high order volumes,
                                public holidays, or circumstances beyond our
                                control.
                            </p>

                            <p>
                                If an order experiences an unusual delay,
                                customers may contact our support team for
                                assistance.
                            </p>
                        </section>

                        <section id="address">
                            <span className="shipping-number">05</span>

                            <h2>Address Changes</h2>

                            <p>
                                Please make sure that your shipping address
                                and contact details are accurate before
                                completing your order.
                            </p>

                            <p>
                                Address changes may not be possible once an
                                order has been dispatched. If you need to
                                update your address, contact us as soon as
                                possible after placing the order.
                            </p>
                        </section>

                        <div className="shipping-note">
                            <strong>Important</strong>

                            <p>
                                Shipping availability, delivery timelines,
                                and applicable charges may vary depending on
                                the destination and the products included in
                                your order.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="shipping-footer">
                <div className="shipping-container">

                    <span className="shipping-eyebrow">
                        NEED HELP?
                    </span>

                    <h2>
                        Have a question about
                        <br />
                        your order?
                    </h2>

                    <p>
                        If you need assistance with shipping or your order,
                        our support team is here to help.
                    </p>

                    <div className="shipping-contact">

                        <a
                            href="https://wa.me/917048959793"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp: +91 70489 59793
                        </a>

                        <a href="mailto:support@provoxi.com">
                            Email: support@provoxi.com
                        </a>

                    </div>

                </div>
            </section>

        </main>
    );
}
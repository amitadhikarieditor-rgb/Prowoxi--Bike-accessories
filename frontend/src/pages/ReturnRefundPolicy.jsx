import React,{useEffect} from "react";
import "../styles/returnRefundPolicy.css";

export default function ReturnRefundPolicy() {

    useEffect(() => {
    document.title = "PROWOXI-REFUND POLICY"
},[]);

    return (
        <main className="return-page">

            <section className="return-hero">
                <div className="return-container">

                    <span className="return-eyebrow">
                        PROWOXI / RETURNS & REFUNDS
                    </span>

                    <h1>
                        Return
                        <br />
                        & Refund
                    </h1>

                    <p>
                        Everything you need to know about returns, replacements,
                        refunds, and issues with your ProWoxi order.
                    </p>

                </div>
            </section>


      
            <section className="return-content">
                <div className="return-container return-layout">


                    <aside className="return-sidebar">
                        <span>ON THIS PAGE</span>

                        <a href="#eligibility">
                            Return Eligibility
                        </a>

                        <a href="#damaged">
                            Damaged Products
                        </a>

                        <a href="#replacement">
                            Replacement
                        </a>

                        <a href="#refund">
                            Refunds
                        </a>

                        <a href="#process">
                            Return Process
                        </a>

                        <a href="#nonreturnable">
                            Non-Returnable Items
                        </a>
                    </aside>


                  
                    <div className="return-details">

                        <section id="eligibility">
                            <span className="return-number">
                                01
                            </span>

                            <h2>
                                Return Eligibility
                            </h2>

                            <p>
                                Customers may request a return for eligible
                                products within the applicable return period
                                mentioned on the product or order information.
                            </p>

                            <p>
                                Products must generally be unused, in their
                                original condition, and returned with the
                                original packaging and accessories where
                                applicable.
                            </p>
                        </section>


                        
                        <section id="damaged">
                            <span className="return-number">
                                02
                            </span>

                            <h2>
                                Damaged or Incorrect Products
                            </h2>

                            <p>
                                If you receive a damaged, defective, or incorrect
                                product, please contact our support team as soon
                                as possible after delivery.
                            </p>

                            <p>
                                We may request photographs, videos, order
                                details, or other information to understand and
                                verify the issue before processing a return or
                                replacement request.
                            </p>
                        </section>


                   
                        <section id="replacement">
                            <span className="return-number">
                                03
                            </span>

                            <h2>
                                Replacement
                            </h2>

                            <p>
                                Where applicable, an eligible product may be
                                replaced with the same or a suitable
                                alternative product, subject to availability.
                            </p>

                            <p>
                                Replacement requests are reviewed by our team
                                and are subject to product condition and the
                                applicable return requirements.
                            </p>
                        </section>


                        
                        <section id="refund">
                            <span className="return-number">
                                04
                            </span>

                            <h2>
                                Refunds
                            </h2>

                            <p>
                                Once a returned product has been received and
                                inspected, the refund request will be reviewed
                                according to the applicable return conditions.
                            </p>

                            <p>
                                Approved refunds will generally be processed
                                through the original payment method used for
                                the order. The time taken for the refund to
                                reflect may depend on the payment provider or
                                banking institution.
                            </p>
                        </section>


                                    <section id="process">
                            <span className="return-number">
                                05
                            </span>

                            <h2>
                                Return Process
                            </h2>

                            <p>
                                To request a return or replacement, contact our
                                support team with your order details and a brief
                                description of the issue.
                            </p>

                            <p>
                                After reviewing the request, our team will
                                provide further instructions regarding the
                                return or replacement process, if applicable.
                            </p>
                        </section>


                 
                        <section id="nonreturnable">
                            <span className="return-number">
                                06
                            </span>

                            <h2>
                                Non-Returnable Items
                            </h2>

                            <p>
                                Certain products may not be eligible for return
                                due to their nature, installation, usage,
                                customization, or other applicable conditions.
                            </p>

                            <p>
                                Products that have been installed, modified,
                                damaged due to misuse, or returned without
                                required accessories or packaging may not
                                qualify for a return or refund.
                            </p>
                        </section>


                   
                        <div className="return-note">
                            <strong>
                                Important
                            </strong>

                            <p>
                                Return, replacement, and refund eligibility may
                                vary depending on the product and the reason
                                for the request. Please contact ProWoxi support
                                before sending any product back.
                            </p>
                        </div>

                    </div>

                </div>
            </section>


   
            <section className="return-footer">
                <div className="return-container">

                    <span className="return-eyebrow">
                        NEED HELP?
                    </span>

                    <h2>
                        Need help with
                        <br />
                        a return?
                    </h2>

                    <p>
                        Contact our support team if you have questions about
                        returns, replacements, or refunds.
                    </p>

                    <div className="return-contact">

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
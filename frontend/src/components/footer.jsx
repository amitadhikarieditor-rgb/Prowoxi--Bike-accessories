import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="site-footer">

            <div className="footer-top">

                {/* Brand */}
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        PROWOXI
                    </Link>

                    <p>
                        Premium bike accessories built for riders
                        who want style, protection and performance.
                    </p>
                </div>

                {/* Company */}
                <div className="footer-column">
                    <h3>Company</h3>

                    <Link to="/about">
                        About Us
                    </Link>
                </div>

                {/* Customer Policies */}
                <div className="footer-column">
                    <h3>Customer Care</h3>

                    <Link to="/shipping-policy">
                        Shipping Policy
                    </Link>

                    <Link to="/return-refund-policy">
                        Return & Refund Policy
                    </Link>
                </div>

                {/* Legal */}
                <div className="footer-column">
                    <h3>Legal</h3>

                    <Link to="/privacy-policy">
                        Privacy Policy
                    </Link>

                    <Link to="/terms">
                        Terms & Conditions
                    </Link>
                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} ProWoxi. All rights reserved.
                </p>

                <div className="footer-bottom-links">
                    <Link to="/privacy-policy">
                        Privacy
                    </Link>

                    <Link to="/terms">
                        Terms
                    </Link>
                </div>

            </div>

        </footer>
    );
}
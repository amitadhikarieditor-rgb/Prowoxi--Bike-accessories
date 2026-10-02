import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="site-footer">

            <div className="footer-top">


                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        PROWOXI
                    </Link>

                    <p>
                        Premium bike accessories built for riders
                        who want style, protection and performance.
                    </p>
                </div>


          
                <div className="footer-column">
                    <h3>Company</h3>

                    <Link to="/about">
                        About Us
                    </Link>
                </div>


           
                <div className="footer-column">
                    <h3>Customer Care</h3>

                    <Link to="/shipping-policy">
                        Shipping Policy
                    </Link>

                    <Link to="/return-refund-policy">
                        Return & Refund Policy
                    </Link>
                </div>



                <div className="footer-column">
                    <h3>Legal</h3>

                    <Link to="/privacy-policy">
                        Privacy Policy
                    </Link>

                    <Link to="/terms">
                        Terms & Conditions
                    </Link>
                </div>


      
                <div className="footer-column">
                    <h3>Contact</h3>

                    <a
                        href="https://wa.me/917048959793"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        WhatsApp
                    </a>

                    <a href="tel:+917048959793">
                        +91 70489 59793
                    </a>

                    <a href="mailto:prowoxibikeaccessories@gmail.com">
                        support@provoxi.com
                    </a>
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
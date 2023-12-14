// Footer.jsx
import React from 'react';
import './Footer.css'; // Import the external CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: info@example.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
                <div className="footer-section">
                    <h3>Opening Hours</h3>
                    <p>Monday - Friday: 11 AM - 9 PM</p>
                    <p>Saturday - Sunday: 10 AM - 10 PM</p>
                </div>
                <div className="footer-section">
                    <h3>Location</h3>
                    <p>123 Main Street, Cityville</p>
                    <p>Country, ZIP Code</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 Restaurant App. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
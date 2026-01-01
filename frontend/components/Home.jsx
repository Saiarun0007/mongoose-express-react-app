// components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../componentscss/home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h2 className="hero-title">Welcome to the Home Page!</h2>
                <p className="hero-subtitle">
                    This is a central hub for your application. Start managing your products or
                    view user details using the navigation above.
                </p>
                <div className="hero-actions">
                    <Link to="/products" className="btn-primary">View Products</Link>
                    <Link to="/page1" className="btn-secondary">Learn More</Link>
                </div>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <h3>Fast Performance</h3>
                    <p>Optimized components for a smooth user experience.</p>
                </div>
                <div className="feature-card">
                    <h3>Modern Design</h3>
                    <p>Clean UI built with consistent CSS variables.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
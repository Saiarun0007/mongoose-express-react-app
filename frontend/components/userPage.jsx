// components/UserPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentscss/userpage.css';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(''); // New filter state
    const navigate = useNavigate();

    // The list of categories could also be fetched from an API
    const categories = ['fruit', 'vegetable', 'dairy'];

    useEffect(() => {
        setLoading(true);
        // Build the URL with query parameter if a category is selected
        const url = selectedCategory
            ? `http://localhost:3000/products?category=${selectedCategory}`
            : 'http://localhost:3000/products';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, [selectedCategory]); // Re-run effect when category changes

    const handleRowClick = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="header-content">
                    <h1>Product Inventory</h1>
                    <p>Manage and view your product catalog</p>
                </div>

                <div className="header-actions">
                    {/* Category Filter Dropdown */}
                    <select
                        className="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <button className="btn-add" onClick={() => navigate('/newproduct')}>
                        + Add New Product
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="loader">Loading products...</div>
            ) : (
                <div className="table-wrapper">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th style={{ textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user._id} onClick={() => handleRowClick(user._id)}>
                                        <td className="font-bold">{user.name}</td>
                                        <td>${user.price}</td>
                                        <td>
                                            <span className="table-category-badge">
                                                {user.category}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <span className="view-link">View Details →</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                                        No products found in this category.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserPage;
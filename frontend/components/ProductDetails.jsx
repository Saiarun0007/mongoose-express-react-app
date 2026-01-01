// components/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../componentscss/productDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete product #${id}?`)) {
            fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE',
            }).then(response => {
                if (response.ok) {
                    navigate('/products');
                }
            }).catch(error => console.error('Error:', error));
        }
    }

    if (loading) return <div className="loading">Loading product details...</div>;
    if (!data) return <div className="error">Product not found.</div>;

    return (
        <div className="details-container">
            <div className="details-card">
                <header className="details-header">
                    <button className="btn-back" onClick={() => navigate('/products')}>
                        ← Back
                    </button>
                    <h1>{data.name}</h1>
                    <span className="product-id">ID: #{id}</span>
                </header>

                <div className="details-body">
                    <div className="info-group">
                        <label>Price</label>
                        <p className="price-tag">${data.price}</p>
                    </div>
                    <div className="info-group">
                        <label>Category</label>
                        <p className="category-badge">{data.category}</p>
                    </div>
                </div>

                <footer className="details-footer">
                    <button className="btn-edit" onClick={() => navigate(`/products/${id}/edit`)}>
                        Edit Product
                    </button>
                    <button className="btn-delete" onClick={handleDelete}>
                        Delete
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default ProductDetails;
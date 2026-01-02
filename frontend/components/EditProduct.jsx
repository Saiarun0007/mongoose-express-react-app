import React, { useEffect, useState } from 'react'; // Added useState to imports
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null); // Initial state is null

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(response => response.json())
            .then(resData => {
                setData(resData);
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    // Handle input changes to keep 'data' state in sync with the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault(); // Stop page refresh

        fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) // 'data' now contains the updated values
        })
            .then(response => {
                if (response.ok) {
                    console.log('Product updated successfully');
                    navigate('/products'); // Redirect back to list
                }
            })
            .catch(error => console.error('Error updating product:', error));
    };

    // Show loading state while waiting for fetch
    if (!data) return <div>Loading product details...</div>;

    return (
        <div>
            <h1>Editing Product</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                    >
                        <option value="fruit">Fruit</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="dairy">Dairy</option>
                    </select>
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default EditProduct;
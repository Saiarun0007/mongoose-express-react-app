import React from 'react'
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate (hook), not Navigate (component)

const UserForm = () => {
    // 2. Initialize the hook correctly
    const nav = useNavigate();

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [category, setCategory] = React.useState('fruit');

    const handlesudmit = (e) => {
        e.preventDefault();
        const userData = {
            name: name,
            price: Number(price),
            category: category
        };

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(response => {
            if (response.ok) {
                console.log('User created successfully');
                // 3. Now this function call will work!
                nav('/products');
            }
        }).catch(error => console.error('Error creating user:', error));
    }

    return (
        <div>
            <h1>Add your new Product here</h1>
            <form onSubmit={handlesudmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" onChange={e => setPrice(e.target.value)} />
                </div>
                <div>
                    <label>Category:</label>
                    <select name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="fruit">Fruit</option>
                        <option value="vegetable">Vegetables</option>
                        <option value="dairy">Dairy</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UserForm
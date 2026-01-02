const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./products');
const methodOverride = require('method-override');
const { json } = require('stream/consumers');
const morgan = require('morgan');

// Connect to MongoDB



mongoose.connect('mongodb://localhost:27017/formStand').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
})

const app = express();

// const user = new mongoose.Schema({
//     name: String,
//     age: Number,
//     city: String

// });
// const User = mongoose.model('peoples', user);
//app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'))

const corsOptions = {
    // Use the exact origin of your React app
    origin: 'http://localhost:5173',
    // You can also allow specific methods like POST, PUT, DELETE
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // You can also allow specific headers
    // allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));




app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        try {
            const products = await Product.find({ category });
            // console.log(products);


            res.send(JSON.stringify(products));
            // return res.render('index', { products, category });
        } catch (err) {
            return res.status(500).send('Error retrieving products by category');
        }
    } else {
        try {
            const products = await Product.find({});
            // console.log(products);
            res.send(JSON.stringify(products));
            //res.render('index', { products, category: 'All' });
        }
        catch (err) {
            res.status(500).send('Error retrieving products');
        }
    }

});
app.get('/', (req, res) => {
    res.render('productnew');
});
app.post('/products', async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const product = new Product({ name, price, category });

        await product.save();
        // console.log('Product saved successfully');

        // Send JSON back to the frontend
        res.status(201).json({ message: 'Product created successfully' });
    } catch (err) {
        console.error(err); // This will tell you EXACTLY why it failed in your terminal
        res.status(500).json({ error: 'Error saving product', details: err.message });
    }
});
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    //res.send('Updating product with ID: ' + id);
    const { name, price, category } = req.body;
    try {
        await Product.findByIdAndUpdate(id, { name, price, category });
        // console.log('Product updated successfully');
        res.send('Product updated successfully');
        //res.redirect('/products/' + id);
    } catch (err) {
        res.status(500).send('Error updating product');
    }
});
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    // console.log('Editing product with ID:', id);
    Product.findById(id).then((product) => {
        res.render('edit', { product });
    }).catch((err) => {
        res.status(500).send('Error retrieving product for edit');
    });


});
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    Product.findById(id).then((product) => {
        res.send(product);
    }).catch((err) => {
        res.status(500).send('Error retrieving product');
    });
});



app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        // console.log('Product deleted successfully');
        res.send('Product deleted successfully');
        //res.redirect('/products');
    } catch (err) {
        res.status(500).send('Error deleting product');
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
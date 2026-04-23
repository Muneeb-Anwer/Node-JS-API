const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// =====================
// ROOT
// =====================
app.get('/', (req, res) => {
    res.json("E-commerce API running 🚀");
});

// =====================
// ALL TABLE ROUTES
// =====================

// USERS
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADDRESSES
app.get('/addresses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM addresses');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CATEGORIES
app.get('/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PRODUCTS
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SUPPLIERS
app.get('/suppliers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM suppliers');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PRODUCT_SUPPLIERS
app.get('/product-suppliers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM product_suppliers');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CART
app.get('/cart', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cart');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CART ITEMS
app.get('/cart-items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cart_items');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ORDERS
app.get('/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ORDER ITEMS
app.get('/order-items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM order_items');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PAYMENTS
app.get('/payments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM payments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// REVIEWS
app.get('/reviews', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reviews');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =====================
// OPTIONAL: SEE ALL TABLE NAMES 🔥 (VERY IMPRESSIVE FOR VIVA)
// =====================
app.get('/tables', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =====================
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
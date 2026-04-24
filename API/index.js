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

app.get('/', (req, res) => {
    res.json("E-commerce API running 🚀");
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id=$1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await pool.query(
            'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *',
            [name, email, password]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await pool.query(
            'UPDATE users SET name=$1,email=$2,password=$3 WHERE user_id=$4 RETURNING *',
            [name, email, password, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM users WHERE user_id=$1', [req.params.id]);
        res.json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products WHERE product_id=$1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/products', async (req, res) => {
    try {
        const { name, price, category_id, stock } = req.body;
        const result = await pool.query(
            'INSERT INTO products (name,price,category_id,stock) VALUES ($1,$2,$3,$4) RETURNING *',
            [name, price, category_id, stock]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const { name, price, category_id, stock } = req.body;
        const result = await pool.query(
            'UPDATE products SET name=$1,price=$2,category_id=$3,stock=$4 WHERE product_id=$5 RETURNING *',
            [name, price, category_id, stock, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM products WHERE product_id=$1', [req.params.id]);
        res.json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/categories', async (req, res) => {
    try {
        const { name } = req.body;
        const result = await pool.query(
            'INSERT INTO categories (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/categories/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const result = await pool.query(
            'UPDATE categories SET name=$1 WHERE category_id=$2 RETURNING *',
            [name, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/categories/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM categories WHERE category_id=$1', [req.params.id]);
        res.json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/orders', async (req, res) => {
    try {
        const { user_id, status } = req.body;
        const result = await pool.query(
            'INSERT INTO orders (user_id,status) VALUES ($1,$2) RETURNING *',
            [user_id, status]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/orders/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const result = await pool.query(
            'UPDATE orders SET status=$1 WHERE order_id=$2 RETURNING *',
            [status, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/orders/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM orders WHERE order_id=$1', [req.params.id]);
        res.json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/payments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM payments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reviews');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/tables', async (req, res) => {
    try {
        const result = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
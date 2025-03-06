const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3009;
const dataPath = path.join(__dirname, 'records.json');

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Ensure records.json exists and is valid
if (!fs.existsSync(dataPath) || fs.readFileSync(dataPath, 'utf-8').trim() === '') {
    console.log("Initializing records.json with default data...");
    fs.writeFileSync(dataPath, JSON.stringify([
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
        { id: 3, title: '1984', author: 'George Orwell' }
    ], null, 2));
}

// Helper function to read books
const readBooks = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return data.trim() ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading records.json:", error);
        return [];
    }
};

// Helper function to write books
const writeBooks = (books) => {
    fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));
};

// GET ALL BOOKS
app.get('/api/books', (req, res) => {
    res.json(readBooks());
});

// GET BOOK BY ID
app.get('/api/books/:id', (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

// ADD NEW BOOK
app.post('/api/books', (req, res) => {
    const books = readBooks();
    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1, // Increment ID correctly
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    writeBooks(books);
    res.status(201).json(newBook);
});

// UPDATE A BOOK
app.put('/api/books/:id', (req, res) => {
    const books = readBooks();
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found');

    books[bookIndex] = { ...books[bookIndex], ...req.body };
    writeBooks(books);
    res.json(books[bookIndex]);
});

// DELETE A BOOK
app.delete('/api/books/:id', (req, res) => {
    let books = readBooks();
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found');

    books.splice(bookIndex, 1);
    writeBooks(books);
    res.status(204).send();
});

// Start server
app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
});

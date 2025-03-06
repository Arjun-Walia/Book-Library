const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 3009;
const fs = require('fs');

app.use(cors()); // Enable CORS
app.use(express.json());

const books = fs.writeFileSync(path.join(__dirname, 'books.json'), JSON.stringify([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' }
]));

// GET ALL BOOKS
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET BOOK BY ID
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('404 page not found');
    res.json(book);
});

// ADD NEW BOOK
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,  // Adjusted to start from 1
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// UPDATE A BOOK
app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('error 404 book not found');

    book.title = req.body.title;
    book.author = req.body.author;

    res.json(book);
});

// DELETE A BOOK
app.delete('/api/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('error 404 book not found');

    books.splice(bookIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`API server is now listening at port ${port}`);
});

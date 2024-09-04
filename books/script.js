document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');
    const bookForm = document.getElementById('book-form');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');

    const apiUrl = 'http://localhost:3009/api/books';

    // Fetch and display books
    const fetchBooks = async () => {
        const response = await fetch(apiUrl);
        const books = await response.json();
        bookList.innerHTML = '';
        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <span>${book.title} by ${book.author}</span>
                <button onclick="deleteBook(${book.id})">Delete</button>
            `;
            bookList.appendChild(bookItem);
        });
    };

    // Add a new book
    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newBook = {
            title: titleInput.value,
            author: authorInput.value
        };
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });
        titleInput.value = '';
        authorInput.value = '';
        fetchBooks();
    });

    // Delete a book
    window.deleteBook = async (id) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchBooks();
    };

    // Initial fetch
    fetchBooks();
});

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const BookLibrary = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3009/api/books')
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setError('Failed to load books. Please try again later.');
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>📚 Book Library</h1>
            {loading && <p>Loading books...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && books.length === 0 && <p>No books available.</p>}
            <ul>
                {books.map(book => (
                    <li key={book._id || book.id}>
                        <strong>{book.title}</strong> by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

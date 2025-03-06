import React from 'react';
import { createRoot } from 'react-dom/client';
import { BookLibrary } from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BookLibrary />
  </React.StrictMode>
);

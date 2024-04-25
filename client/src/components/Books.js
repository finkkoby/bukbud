import React from 'react';
import { useOutletContext } from'react-router-dom';

import BookCard from './BookCard';

function Books() {
    const { books, navigate } = useOutletContext()

    const bookCards = books.map(book => <BookCard book={book} key={book.title}/>);

    return (
        <div>
            <h1 className="title-header">the <span className="special-text">bukshelf</span>...</h1>
            <div className="add-button" onClick={() => navigate('/add-new-book')}><h1> + </h1></div>
            <div className="book-cards">
                {bookCards}
            </div>
        </div>
    );
}

export default Books;
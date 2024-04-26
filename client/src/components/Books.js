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
            <h4>you reached the end of the shelf :)</h4>
            <button onClick={() => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }}>back to top?</button>
        </div>
    );
}

export default Books;
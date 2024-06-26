import React from 'react';
import { useOutletContext } from 'react-router-dom';

import ReviewCard from './ReviewCard';

function Home() {
    const { reviews, navigate } = useOutletContext()

    const reviewCards = reviews.map(review => <ReviewCard key={review.id} review={review} />);

    return (
        <div>
            <h1 className="title-header">the latest <span className="special-text">buzz</span>...</h1>
            <div className="add-button" onClick={() => navigate('/add-new-review')}><h1> + </h1></div>
            {reviewCards}
            <h4>you're all up to date :)</h4>
            <button onClick={() => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }}>back to top?</button>
        </div>
    );
}

export default Home;
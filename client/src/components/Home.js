import React from 'react';
import { useOutletContext } from 'react-router-dom';

import ReviewCard from './ReviewCard';

function Home() {
    const { reviews } = useOutletContext()

    const reviewCards = reviews.map(review => <ReviewCard review={review} />);

    return (
        <div>
            <h1 className="title-header">the latest <span className="special-text">buzz</span>...</h1>
            {reviewCards}
        </div>
    );
}

export default Home;
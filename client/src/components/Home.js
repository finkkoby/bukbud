import React from 'react';
import { useOutletContext } from 'react-router-dom';

import ReviewCard from './ReviewCard';

function Home() {
    const { reviews } = useOutletContext()

    const reviewCards = reviews.map(review => <ReviewCard review={review} />);

    return (
        <div>
            <h1>User Home</h1>
            {reviewCards}
        </div>
    );
}

export default Home;
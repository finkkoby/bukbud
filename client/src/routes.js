import App from "./components/App";
import Home from "./components/Home";
import Books from "./components/Books";
import Profile from "./components/Profile";
import AddNewReview from "./components/AddNewReview";

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/books',
                element: <Books />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/add-new-review',
                element: <AddNewReview />
            }
        ]
    }
]

export default routes;
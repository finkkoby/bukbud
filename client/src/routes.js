import App from "./components/App";
import Home from "./components/Home";
import Books from "./components/Books";
import Profile from "./components/Profile";

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/books',
                element: <Books />
            },
            {
                path: '/profile',
                element: <Profile />
            }
        ]
    }
]

export default routes;
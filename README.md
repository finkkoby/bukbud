# Phase 4 Project (bukbuzz { *book-buz* })

## Welcome!!
I wanted to create a social media app for books and book reviews. This iteration is just
the beginning. When you first launch the app, you will be invited to login or signup. Once
you have done that, you will immediately see all of the reviews already posted in
chronological order (take that Instagram!). You can like any of the reviews you see as well.
Since you now have your own username and your own account, you can post reviews as well! When
posting a new review, you will see a list of all of the books we have on our 'bukshelf'. You
can also head over to the books tab to see them laid out as well as add a new book.
Implentation of search and filter by author is coming soon! The profile tab will let you update
your profile as well as edit or delete any of your existing reviews. These features are exclusive
to the profile page and of course, your own reviews. What would you like to see next?

### Front-End
I used React Router to create the front end for this website. I have it seperated into five main routes/pages; Home, Books, Profile, AddNewReview, and AddNewBook. The home route has a couple different functions. It handles login and signup as well as displays all reviews which is what makes up the user home page.

### Back-End
I used SQLite, SQLAlchemy and Python to create the back end for this website. I created my own REST API as well to handle all of the client interactions with the database. Our database has four models; User, Book, Review, Author. 

### Models
#### User
Each instance of User represents a user or member of our 'hive' (there's a theme here!). This stores their username, their unique password hash, and their age which is optional. It also has access to all of the reviews that they have posted as well as books that they have a read through a many-to-many relationship via the Review model.

#### Book
Our platform allows users to add new books to our 'bukshelf' that they, or any other users, may leave reviews on. This information is persisted to the database, so that other users can access it as they are writing new reviews. Each book also has access to all reviews written about that book as well as the users that have 'read' that book through a many-to-many relationship via the Review model.

#### Review
Review is our intermediary model that creates a many-to-many relationship between User and Book. This is also where the user_id and book_id are stores in our database. This model also stores information on when the review was posted, the number of likes it has, as well as a rating, and a comment.

#### Author
This is a feature that is still in development for client-side application, but each book on our 'bukshelf' has access to it's author via a one-to-many relationship. Meaning, one author has many books. This will be implemented to allow for searching and sorting by author, as well as showing all reviews of all books by a certain author.


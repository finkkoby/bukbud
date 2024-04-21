from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # Database Schema
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    _password_hash = db.Column(db.String())
    age = db.Column(db.Integer)

    # Relationships
    reviews = db.relationship("Review", back_populates="user")
    books = association_proxy("reviews", "book",
                              creator=lambda book: Review(book=book))

    # Serialize Rules
    serialize_rules = ('-reviews.user',)


    # Validations
    @validates('username')
    def validate_has_attribute(self, key, value):
        if not value:
            raise ValueError(f'Must have a username')
        return value
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    # Other methods
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    # Database Schema
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    comment = db.Column(db.String)

    # Relationships
    book = db.relationship("Book", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")

    # Serialize Rules
    serialize_rules = ('-book.reviews', '-user.reviews')


    # Validations
    @validates('rating')
    def validate_rating(self, key, value):
        if not 0.0 <= value <= 5.0:
            raise ValueError(f'Rating must be between 0.0 and 5.0')
        return value

    # Other methods

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

     # Database Schema
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    length = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable=False)

    # Relationships
    reviews = db.relationship("Review", back_populates="book")
    users = association_proxy("reviews", "user",
                              creator=lambda user: Review(user=user))
    author = db.relationship("Author", back_populates="books")

    # Serialize Rules
    serialize_rules = ('-reviews.book', '-author.books')

    # Validations


    # Other methods

class Author(db.Model, SerializerMixin):
    __tablename__ = 'authors'

    # Database Schema
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer)
    
    # Relationships
    books = db.relationship("Book", back_populates="author")

    # Serialize Rules
    serialize_rules = ('-books.author')


    # Other methods
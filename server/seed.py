#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import ipdb

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Author, Book, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        fake = Faker()
        print("Deleting tables...")
        User.query.delete()
        Author.query.delete()
        Book.query.delete()
        Review.query.delete()
        
        print("Starting seed...")
        # Seed code goes here!

        print("Creating users...")
        users = []
        usernames = []
        user1 = User(username='myusername', age=23)
        user1.password_hash = 'mypassword'
        users.append(user1)
        for i in range(25):
            username = fake.user_name()
            while username in usernames:
                username = fake.user_name()
            
            usernames.append(username)
            age = fake.pyint(18, 100)

            user = User(username=username, age=age)

            user.password_hash = user.username + 'password'

            users.append(user)
        db.session.add_all(users)

        print("Creating authors...")
        authors = []
        for i in range(25):
            name = fake.name()
            age = fake.pyint(18, 100)
            author = Author(name=name, age=age)
            authors.append(author)
        db.session.add_all(authors)


        print("Creating books...")
        books = []
        genres = ["Fiction", "Fantasy", "Science Fiction", "Mystery", "Romance", "Historical Fiction", "Non-Fiction", "Thriller", "Graphic Novel"]
        for i in range(25):
            title = fake.sentence().title()
            title = title.replace(".", '')
            author = authors[randint(0, 24)]
            length = randint(100, 1000)
            genre = rc(genres)
            books.append(Book(title=title, author=author, length=length, genre=genre, image="https://m.media-amazon.com/images/I/81QPHl7zgbL._AC_UF1000,1000_QL80_.jpg"))
        db.session.add_all(books)

        print("Creating reviews...")
        reviews = []
        for i in range(25):
            user = users[randint(0, 24)]
            book = books[randint(0, 24)]
            rating = randint(1, 10)
            comment = fake.paragraph()
            likes = randint(0, 300)
            reviews.append(Review(user=user, book=book, rating=rating, comment=comment, likes=likes))
        db.session.add_all(reviews)

        db.session.commit()
        print("Complete.")
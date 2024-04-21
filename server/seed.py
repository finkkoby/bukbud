#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

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
            author = authors[randint(0, 24)]
            length = randint(100, 1000)
            genre = rc(genres)
            books.append(Book(title=title, author=author, length=length, genre=genre))
        db.session.add_all(books)

        print("Creating reviews...")
        reviews = []
        for i in range(25):
            user = users[randint(0, 24)]
            book = books[randint(0, 24)]
            rating = fake.pyfloat(left_digits=1, right_digits=1, min_value=0, max_value=5)
            comment = fake.paragraph()
            reviews.append(Review(user=user, book=book, rating=rating, comment=comment))
        db.session.add_all(reviews)

        db.session.commit()
        print("Complete.")
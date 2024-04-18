#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

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
        db.session.commit()
        print("Complete.")
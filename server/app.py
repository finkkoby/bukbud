#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Book, Author, Review

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Clear(Resource):
    def get(self):
        session.clear()
        return {'message': 'Session cleared'}, 200

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session.get('user_id')).first()
            return make_response(user.to_dict(), 200)
        else:
            return {}, 401

class Login(Resource):
    def post(self):
        json = request.get_json()
        try:
            username = json.get('username')
            user = User.query.filter(User.username == username).first()
            if user:
                if user.authenticate(json['password']):
                    session['user_id'] = user.id
                    return make_response(user.to_dict(), 200)
                else:
                    return make_response({'error': 'Invalid username or password'}, 400)
            else:
                return make_response({'error': 'Invalid username or password'}, 400)
        except:
            return make_response({'error': 'Invalid username or password'}, 400)
        
class Signup(Resource):
    def post(self):
        json = request.get_json()
        try:
            user = User(username=json['username'], age=json['age'])
        except:
            return {'error': 'Username already taken'}, 400
        if json['password'] == json['confirm_password']:
            user.password_hash = json['password']
        else:
            return {'error': 'Passwords do not match'}, 400
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return user.to_dict(), 200
    
class Logout(Resource):
    def get(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {'message': 'Session cleared'}, 200
        
class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(reviews, 200)
    
class Books(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.all()]
        return make_response(books, 200)
                

api.add_resource(Login, '/api/login')
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check-session')
api.add_resource(Logout, '/api/logout')
api.add_resource(Reviews, '/api/reviews')
api.add_resource(Books, '/api/books')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


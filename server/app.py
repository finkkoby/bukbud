#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy import desc

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
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        return {}, 401

class Login(Resource):
    def get(self):
        return make_response({'message': 'Only accepts post requests'}, 200)
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
    def get(self):
        return make_response({'message': 'Only accepts post requests'}, 200)
    def post(self):
        json = request.get_json()
        if User.query.filter(User.username == json['username']).first():
            return {'error': 'Username already taken'}, 400
        user = User(username=json['username'], age=json['age'])
        if json['password'] == json['confirm_password']:
            user.password_hash = json['password']
        else:
            return {'error': 'Passwords do not match'}, 400
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response(user.to_dict(), 200)

class Profile(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict(), 200
        else:
            return {'error': 'User not logged in'}, 401
    def patch(self):
        json = request.get_json()
        try:
            user = User.query.filter(User.id == session.get('user_id')).first()
            user.authenticate(json[json['password']])
            if user:
                check_username = User.query.filter(User.username == json['username']).first()
                if check_username and check_username.id != user.id:
                    return {'error': 'Username already taken'}, 400
                user.username = json['username']
                user.age = json['age']
                if json['password'] != '' and json['confirm_password'] != '':
                    if json['password'] == json['confirm_password']:
                        user.password_hash = json['password']
                    else:
                        return {'error': 'Passwords do not match'}, 400
                db.session.commit()
                return user.to_dict(), 200
            else:
                return {'error': 'User not logged in'}, 401
        except:
            return {'error': 'User not logged in'}, 401
    
class Logout(Resource):
    def get(self):
        return make_response({'message': 'Only accepts delete requests'}, 200)
    def delete(self):
        session['user_id'] = None
        return {'message': 'Session cleared'}, 200
        
class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.order_by(desc('created_at')).all()]
        return make_response(reviews, 200)
    
    def post(self):
        json = request.get_json()
        try:
            user = User.query.filter(User.id == session.get('user_id')).first()
            if user:
                try:
                    book = Book.query.filter(Book.id == json['book']).first()
                    review = Review(user=user, book=book, rating=int(json['rating']), comment=json['comment'])
                    db.session.add(review)
                    db.session.commit()
                    return make_response(review.to_dict(), 200)
                except:
                    return make_response({'error': "could not create review"}, 400)
        except:
            return make_response({'error': 'User not logged in'}, 401)
        
class ReviewById(Resource):
    def get(self, review_id):
        review = Review.query.filter(Review.id == review_id).first()
        if review:
            return make_response(review.to_dict(), 200)
        else:
            return make_response({'error': 'Review not found'}, 404)
    
    def post(self, review_id):
        json = request.get_json()
        try:
            user = User.query.filter(User.id == session.get('user_id')).first()
            if user:
                try:
                    book = Book.query.filter(Book.id == json['book']).first()
                    review = Review(user=user, book=book, rating=int(json['rating']), comment=json['comment'])
                    db.session.add(review)
                    db.session.commit()
                    return make_response(review.to_dict(), 200)
                except:
                    return make_response({'error': "could not create review"}, 400)
        except:
            return make_response({'error': 'User not logged in'}, 401)
    
    def patch(self, review_id):
        json = request.get_json()
        try:
            user = User.query.filter(User.id == session.get('user_id')).first()
            if user:
                try:
                    review = Review.query.filter(Review.id == review_id).first()
                    if review:
                        review.likes = int(json['likes'])
                        db.session.commit()
                        return make_response(review.to_dict(), 200)
                    else:
                        return make_response({'error': 'Review not found'}, 404)
                except:
                    return make_response({'error': "could not update review"}, 400)
        except:
            return make_response({'error': 'User not logged in'}, 401)
    
    def delete(self, review_id):
        try:
            user = User.query.filter(User.id == session.get('user_id')).first()
            if user:
                try:
                    review = Review.query.filter(Review.id == review_id).first()
                    if review and user.id == review.user.id:
                        db.session.delete(review)
                        db.session.commit()
                        return make_response({}, 204)
                    else:
                        return make_response({'error': 'Review not found'}, 404)
                except:
                    return make_response({'error': "could not delete review"}, 400)
        except:
            return make_response({'error': 'User not logged in'}, 401)
    
    
    
class Books(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.order_by('title').all()]
        return make_response(books, 200)
    
    def post(self):
        json = request.get_json()
        try:
            user = User.query.filter(User.id == session.get('user_id')).first()
            if user:
                try:
                    author = Author.query.filter(Author.id == json['author']).first()
                    book = Book(title=json['title'], author=author, length=json['length'], genre=json['genre'], image=json['image'])
                    db.session.add(book)
                    db.session.commit()
                    return make_response(book.to_dict(), 200)
                except:
                    return make_response({'error': "could not create book"}, 400)
        except:
            return make_response({'error': 'User not logged in'}, 401)
    

class Authors(Resource):
    def get(self):
        authors = [author.to_dict() for author in Author.query.order_by('name').all()]
        return make_response(authors, 200)
    
    def post(self):
        json = request.get_json()
        try:
            user = User.query.filter(User.id == session.get('user_id')).first()
            if user:
                try:
                    author = Author(name=json['name'], age=json['age'])
                    db.session.add(author)
                    db.session.commit()
                    return make_response(author.to_dict(), 200)
                except:
                    return make_response({'error': "could not create author"}, 400)
        except:
            return make_response({'error': 'User not logged in'}, 401)
                

api.add_resource(Login, '/api/login')
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check-session')
api.add_resource(Logout, '/api/logout')
api.add_resource(Reviews, '/api/reviews')
api.add_resource(ReviewById, '/api/reviews/<int:review_id>')
api.add_resource(Books, '/api/books')
api.add_resource(Authors, '/api/authors')
api.add_resource(Profile, '/api/profile')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


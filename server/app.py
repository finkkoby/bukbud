#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Login(Resource):
    def post(self):
        json = request.get_json()
        username = json.get('username')
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(json['password']):
                session['user_id'] = user.id
                return user.to_dict(), 200
        else:
            return {'error': 'Invalid username or password'}, 400
                

api.add_resource(Login, '/api/login')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


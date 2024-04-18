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


    # Serialize Rules


    # Validations
    @validates('username')
    def validate_has_attribute(self, key, value):
        if not value:
            raise ValueError(f'Must have a username')
        return value
    
    @hybrid_property
    def password_hash(self):
        raise PermissionError('Cannot access password hash')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password).encode('utf-8')
        self._password_hash = password_hash.decode('utf-8')

    # Other methods
    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
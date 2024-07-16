from decouple import config
from flask_sqlalchemy import SQLAlchemy

# Create a .env file to store all your environment variables and configuration settings.


class Config:
    SECRET_KEY = config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = config('SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool)

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql://rhema:qwerty123@localhost/waitlist'
    DEBUG = True
    SQLALCHEMY_ECHO = True
    MAIL_SERVER = config('MAIL_SERVER') # Write this in your .env
    MAIL_USERNAME = config('MAIL_USERNAME') # Write this in your .env
    MAIL_PASSWORD = config('MAIL_PASSWORD') # Write this in your .env
    MAIL_PORT = 465
    MAIL_USE_SSL = True 

class ProdConfig(Config):
    SQLALCHEMY_ECHO= False  
    pass

class TestConfig(Config):
    pass
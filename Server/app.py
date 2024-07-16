from flask import Flask, request, jsonify
from config import DevConfig
from flask_restx import Api, Resource, fields
from exts import db
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required
from flask_mail import Mail, Message
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(DevConfig)
api = Api(app,doc='/docs')


CORS(app)
db.init_app(app)
jwtmanager = JWTManager(app)
mail = Mail(app)

#Serialiser Models.
signup_model = api.model(
    'SignUp',
    {
        'username': fields.String(required=True, min_length=2, max_length=80),
        'email': fields.String(),
        'password': fields.String(),
        'f_name': fields.String(),
        'l_name': fields.String()
    }
)


@api.route('/hello')
class helloResource(Resource):
    def get(self):
        return {"message":"Hello World!"}


@api.route('/signup')
class SignUp(Resource):
    """ Use this to allow users to create accounts."""
    
    @api.expect(signup_model)
    def post(self):
        """ Create a new User """
        data = request.get_json()
        username = data.get('username')    

        
        Old_user = User.query.filter_by(username=username).first()

        if Old_user is not None:
            return jsonify({"message": f" A user with the username {username} already exists. Pick another username."})


        new_user = User(
            username=data.get('username'),
            email = data.get('email'),
            password = generate_password_hash(data.get('password')),
            f_name = data.get('f_name'),
            l_name = data.get('l_name')
        
        )
        try:
            new_user.save()

            msg = Message(subject=f" You're on the Waitlist!", sender=app.config['MAIL_USERNAME'], recipients=[new_user.email])
            msg.body = f" Hi {new_user.f_name},\n\nWelcome to the Waitlist!\n\n You are among the first 100 users to sign up on our app and guess what?\n You'll be the among the first users of our app!! Can't wait right?\n We assure you the app is going to be FAN-TASTIC!\n\n Now that we have your email, we'll keep you on the know regarding the official release date for our app. Thank you waiting with us!!\n\n\n\nRegards,\n\nThe Waitlist Team."
            mail.send(msg)
    
        except Exception as e:
            return "Sorry, something went wrong. Please try again later."


        return jsonify({"message":f"New user {username} successfully has registered!"})

    @api.marshal_list_with(signup_model)
    @api.expect(signup_model)
    def get(self):
        """ Use this to get all users in the database. """
        users = User.query.all()
        return users




## Exposing the db to the python shell. This serves as the context processor
@app.shell_context_processor
def make_shell_context():
    return {
        'db': db
    }

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()


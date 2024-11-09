from flask import Blueprint, render_template, request
from controller.users import post_user, auth_user, user_google, get_user_by_email, update_by_email, update_by_email_profession
users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/register', methods=['POST'])
def register():
    user = request.get_json()
    return post_user(user)
    
@users_blueprint.route('/auth', methods=['POST'])
def auth():
    user = request.get_json()
    print(user)
    return auth_user(user)  

@users_blueprint.route('/googleauth', methods=['POST'])
def auth_google():
    user = request.get_json()
    return user_google(user)

@users_blueprint.route('/getuser/<string:email>', methods=['GET'])
def get_user(email):
    print(email)
    return get_user_by_email(email)




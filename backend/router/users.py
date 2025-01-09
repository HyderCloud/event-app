from flask import Blueprint, render_template, request
from controller.users import post_user, auth_user, user_google, get_user_by_email, update_by_email, update_store_login,update_by_email_profession, update_personal_det
users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/register', methods=['POST'])
def register():
    user = request.get_json()
    return post_user(user)
    
@users_blueprint.route('/addbuisness/<string:id>', methods=['POST'])
def addbuisness(id):
    user = request.get_json()
    return update_store_login(user["phone"],user["storeName"],user["email"],user["profession"]
                              ,user["link"],user["slogen"], user["terms"], user["profile"],id)

@users_blueprint.route('/auth', methods=['POST'])
def auth():
    user = request.get_json()
    print(user)
    return auth_user(user)  

@users_blueprint.route('/personaldetails', methods=['POST'])
def personaldetails():
    user = request.get_json()
    return update_personal_det(user["data"]["firsName"],user["data"]["lastName"],user["data"]["lastName"], user["id"])  

@users_blueprint.route('/updateusername', methods=['POST'])
def updateusername():
    user = request.get_json()
    return update_by_email(user["email"],user["username"],user["terms"], user["sellContent"],user["id"])  

@users_blueprint.route('/googleauth', methods=['POST'])
def auth_google():
    user = request.get_json()
    return user_google(user)

@users_blueprint.route('/getuser/<string:email>', methods=['GET'])
def get_user(email):
    print(email)
    return get_user_by_email(email)




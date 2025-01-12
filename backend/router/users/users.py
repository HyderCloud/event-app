from flask import Blueprint, render_template, request
import controller

route_blueprint = Blueprint('users', __name__)
users_api = controller.users.Users()

@route_blueprint.route('/register', methods=['POST'])
def register():
    user = request.get_json()
    return users_api.post_user(user)
    
@route_blueprint.route('/addbuisness/<string:id>', methods=['POST'])
def addbuisness(id):
    user = request.get_json()
    return users_api.update_store_login(user["phone"],user["storeName"],user["email"],user["profession"]
                              ,user["link"],user["slogen"], user["terms"], user["profile"],id)

@route_blueprint.route('/auth', methods=['POST'])
def auth():
    user = request.get_json()
    print(user)
    return users_api.auth_user(user)  

@route_blueprint.route('/personaldetails', methods=['POST'])
def personaldetails():
    user = request.get_json()
    return users_api.update_personal_det(user["data"]["firsName"],user["data"]["lastName"],user["data"]["lastName"], user["id"])  

@route_blueprint.route('/updateusername', methods=['POST'])
def updateusername():
    user = request.get_json()
    return users_api.update_by_email(user["email"],user["username"],user["terms"], user["sellContent"],user["id"])  

@route_blueprint.route('/googleauth', methods=['POST'])
def auth_google():
    user = request.get_json()
    return users_api.user_google(user)

@route_blueprint.route('/getuser/<string:email>', methods=['GET'])
def get_user(email):
    print(email)
    return users_api.get_user_by_email(email)
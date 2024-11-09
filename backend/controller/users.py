from models.mongo import Users, Store
from flask import jsonify
import bcrypt
import jwt
import datetime
SECRET_KEY = "267545f00571a7a7c4b36ec3256ddad5b0bf957dcc32dc2e9fd515a4738c2ba5"

user_api = Users()
store_api = Store()

def post_user(user):
    try: 
        password = user["password"]
        password_bytes = str(password).encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password_bytes, salt)
        doccument = {
            "email": user["email"],
            "username": user["username"],
            "password": hashed_password,
            "pr_image": "",
            "profession": '',
            "description": '',
        }
        if hashed_password:
           result = user_api.insert_user(doccument)
           if result:
               get_user = user_api.get_user_by_email(user["email"])
               if get_user:
                    store = {
                            "key": get_user["_id"],
                            "name": user["username"],
                            'profile_img': '',
                            "bunner": '',
                            "slogen":'',
                            "description":'',
                            "links":[],
                            "email": user["email"],
                            "phone": "",
                            "address": [],
                            "folowers": [],
                            "profession": ""
                        }
                    store2 = store_api.insert_store(store)
                    if store2:
                        return jsonify({'message': True}), 200
                    else:
                        return jsonify({"messege": "wrong"})
               else:
                return jsonify({"messege": "wrong"})
           else:
               return jsonify({"messege": "wrong"})
        else:
               return jsonify({"messege": "wrong"})
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    
def auth_user(user):
    try:
        condition = user["email"]
        if "@" in condition:
            user2 = user_api.get_user_by_email(user["email"])
            password  = bcrypt.checkpw(str(user["password"]).encode('utf-8'),user2["password"])
            if password:
                payload = {
            "user_id": user2["_id"],
            "email": user2["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }
                token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                if user2:
                    store_checker = store_api.get_store_by_key(user2["_id"])
                    payload2 = {
                    "store_id": store_checker["_id"],
                    "name": store_checker["name"],
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
                    }
                    token2 = jwt.encode(payload2, SECRET_KEY, algorithm="HS256")

                    if store_checker:

                        return jsonify({"token": token, "store": token2,"id": user2['_id'],"email": user['email'], "name": user2["username"]}), 200
                    else:
                        return jsonify({"message": "bug"}), 400
                else: 
                    return jsonify({"token": token}), 200
            else:
                return jsonify({"massage": "icorrect password"}), 400
        else:
            user2 = user_api.get_user_by_email(user["email"])
            password  = bcrypt.checkpw(str(user["password"]).encode('utf-8'),user2["password"])
            if password:
                payload = {
            "user_id": user2["_id"],
            "email": user2["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }
                token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                return jsonify({"token": token}), 200
            else:
                return jsonify({"massage": "icorrect password"}), 400
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    
def user_google(user):
    try:
        new_doccument = {
            "email": user["email"],
            "username": user["username"],
            "password": '',
            "pr_image": user["pr_image"],
            "profession": '',
            "description": '',

        }
        user_checker = user_api.get_user_by_email(user["email"])
        if user_checker["email"] == user["email"]:
            payload = {
            "user_id": user_checker["_id"],
            "email": user_checker["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            if len(user_checker["profession"]) > 0:
                store_checker = store_api.get_store_by_key(user_checker["_id"])
                print(store_checker)
                payload2 = {
                    "store_id": store_checker["_id"],
                    "name": store_checker["name"],
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
                    }
                token2 = jwt.encode(payload2, SECRET_KEY, algorithm="HS256")
                print('hi')
                if store_checker:
                    print('hello')
                    return jsonify({"token": token, "store": token2}), 200
                else:
                    return jsonify({"message": "bug"}), 400
            else: 
                return jsonify({"token": token}), 200
        else:
            new_user = user_api.insert_user(new_doccument)
            if new_user:
                payload = {
                "user_id": new_user,
                "email": user["email"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
                }
                token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                return jsonify({'token': token}),200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    
def get_user_by_email(email):
    try:
        user_data = user_api.get_user_by_email(email)
        if 'password' in user_data:
            del user_data['password']
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    
def update_by_email(email,data):
    try:
        return jsonify({"acknowledge": user_api.update_by_email(email,data)}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    

def update_by_email_profession(email,data):
    try:
        return jsonify({"acknowledge": user_api.update_by_email_proffesion(email,data)}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    


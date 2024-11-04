from models.mongo import Users, Store
from flask import jsonify
import bcrypt
import jwt
import datetime
SECRET_KEY = "267545f00571a7a7c4b36ec3256ddad5b0bf957dcc32dc2e9fd515a4738c2ba5"

store_api = Store()
users_api = Users()

def update_slogen_by_name(name,slogen):
    try:
        is_updated = store_api.update_slogen_by_store(slogen, name)
        print(slogen)
        if is_updated:
            return jsonify({"slogen": slogen}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501

def update_bunner_by_name(name,bunner):
    try:
        is_updated = store_api.update_bunner_by_store(bunner, name)
        if is_updated:
            return jsonify({"image": bunner}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    
def update_profile_by_name(name,profile):
    try:
        is_updated = store_api.update_profile_by_store(profile, name)
        if is_updated:
            return jsonify({"image": profile}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501


def update_phone_by_name(name,phone):
    try:
        is_updated = store_api.update_phone_by_store(phone, name)
        print(phone)
        if is_updated:
            return jsonify({"phone": phone}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501

def update_email_by_name(name,email):
    try:
        is_updated = store_api.update_email_by_store(email, name)
        print(email)
        if is_updated:
            return jsonify({"email": email}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501

def update_links_by_name(name,links):
    try:
        is_updated = store_api.update_links_by_store(links, name)
        print(links)
        if is_updated:
            return jsonify({"links": links}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    
def update_description_by_name(name,description):
    try:
        is_updated = store_api.update_description_by_store(description, name)
        if is_updated:
            return jsonify({"description": description}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501

def get_store_by_storeusername(name):
    try:
        store = store_api.get_store_by_name(name)
        print(store)
        if store == None:
            return jsonify({"message": "no store"}), 200
        else:
            return jsonify({"store": store}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501

def get_store_by_username(name, user):
    try:
        decoded_store = jwt.decode(name, options={"verify_signature": False})
        decoded_user = jwt.decode(user, options={"verify_signature": False})
        print(decoded_store)
        print(decoded_user)
        get_store = store_api.get_store_by_id(decoded_store['store_id'])
        if get_store["key"] == decoded_user['user_id']:
            return jsonify({"acknowledge": True}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501

def set_new_store(id ,name, username, profession, email):
    try:
        store = {
            "key": id,
            "name": name,
            'profile_img': '',
            "bunner": '',
            "slogen":'',
            "description":'',
            "links":[],
            "email": email,
            "phone": "",
            "address": [],
            "folowers": [],
            "profession": profession
        }
        updated = users_api.update_by_email(email,username, profession)
        if updated:
            result = store_api.insert_store(store)
            username = users_api.get_user_by_email(email)
            if result:
                get_Token = store_api.get_store_by_name(name)
                if name== get_Token["name"]:
                    payload = {
                    "store_id": get_Token["_id"],
                    "name": get_Token["name"],
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
                    }
                    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                    return jsonify({"acknowledge": True, "username": name, "token": token}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    


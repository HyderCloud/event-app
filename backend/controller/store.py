from models.mongo import Users, Store
from flask import jsonify
import bcrypt
import jwt
import datetime

store_api = Store()

def set_new_store(id ,name):
    try:
        store = {
            "key": id,
            "name": name,
            'profile_img': '',
            "bunner": '',
            'description': '',
            "link": '',
            "email": '',
            "folowers": [],
        }
        
        result = store_api.insert_store(store)
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
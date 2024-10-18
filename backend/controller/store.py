from models.mongo import Users, Store
from flask import jsonify
import bcrypt
import jwt
import datetime
SECRET_KEY = "267545f00571a7a7c4b36ec3256ddad5b0bf957dcc32dc2e9fd515a4738c2ba5"

store_api = Store()
users_api = Users()

def set_new_store(id ,name, username, profession, email):
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
        updated = users_api.update_by_email(email,username, profession)
        if updated:
            result = store_api.insert_store(store)
            username = users_api.get_user_by_email(email)
            if result:
                get_Token = store_api.get_store_by_name(name)
                if name== get_Token["name"]:
                    print('hello')
                    payload = {
                    "store_id": get_Token["_id"],
                    "email": get_Token["email"],
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
                    }
                    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                    return jsonify({"acknowledge": True, "username": username["username"], "token": token}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
import pymongo
from bson import ObjectId

mongodb_url = "mongodb://localhost:27017/eventride"
client = pymongo.MongoClient(mongodb_url)
db = client.get_database()
collection = db.users

class Users:
    def __init__(self):
        pass

    def insert_user(self, doccument):
        result = collection.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)

    def get_user_by_email(self, email):
        documents_list = collection.find_one({"email": email})
        if documents_list is None:
            return {"email": "123"}
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def get_user_by_username(self, username):
        documents_list = collection.find_one({"username": username})
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def update_by_email(self, email, username, terms, sell):
        new_data = {"$set": {"username": username,
                             "terms": terms,
                             "sellContent": sell}}
        result = collection.update_one({"email": email}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")


    def update_personal_det(self, first, last, phone, id):
        new_data = {"$set": {"firsName": first,
                             "lastName": last,
                             "phone": phone}}
        result = collection.update_one({"_id": ObjectId(id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_by_email_proffesion(self, email, data):
        new_data = {
            "$set": {
                "profession": data,
            }
        }
        result = collection.update_one({"email": email}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")


import pymongo
from bson import ObjectId

mongodb_url = "mongodb://localhost:27017/eventride"
client = pymongo.MongoClient(mongodb_url)
db = client.get_database()
collection = db.store

class My_Office:
    def __init__(self):
        pass

    def update_phone_by_store(self, phone, name):
        new_data = {
            "$set": {
                "phone": phone,
            }
        }
        result = collection.update_one({"name": name}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_store_sign(self, phone, name, email, profession,link, slogen, terms , profile, _id):
        new_data = {
            "$set": {
                "name": name,
                "email": email,
                "phone": phone,
                "profession": profession,
                "link": [link],
                "slogen":slogen,
                "terms": terms,
                "pr_image": profile,
                "type": "buisness",
            }
        }
        result = collection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")
    def update_bunner_by_store(self, bunner, name):
        new_data = {
            "$set": {
                "bunner": bunner,
            }
        }
        result = collection.update_one({"name": name}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_profile_by_store(self, profile, name):
        new_data = {
            "$set": {
                "profile_img": profile,
            }
        }
        result = collection.update_one({"name": name}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_slogen_by_store(self, slogen, name):
        new_data = {
            "$set": {
                "slogen": slogen,
            }
        }
        result = collection.update_one({"name": name}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_email_by_store(self, email, name):
        new_data = {
            "$set": {
                "email": email,
            }
        }
        result = collection.update_one({"name": name}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_description_by_store(self, description, name):
        new_data = {
            "$set": {
                "description": description,
            }
        }
        result = collection.update_one({"name": name}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_links_by_store(self, links, name):
        new_data = {
            "$set": {
                "links": links,
            }
        }
        result = collection.update_one({"name": name}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def insert_store(self, doccument):
        result = collection.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)

    def get_store_by_name(self, name):
        documents_list = collection.find_one({"name": name})
        if documents_list is None:
            return None
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def get_store_by_id(self, id):
        object_id = ObjectId(id)
        documents_list = collection.find_one({"_id": object_id})
        if documents_list is None:
            return {"id": "123"}
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def get_store_by_key(self, key):

        documents_list = collection.find_one({"key": key})
        if documents_list is None:
            return {"id": "123"}
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list



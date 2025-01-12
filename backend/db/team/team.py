import pymongo
from bson import ObjectId

mongodb_url = "mongodb://localhost:27017/eventride"
client = pymongo.MongoClient(mongodb_url)
db = client.get_database()
collection = db.events

class Team:
    def __init__(self):
        pass

    def get_team_by_profession(self, profession):
        documents_cursor = collection.find({"profession": profession})
        documents_list = []
        for document in documents_cursor:
            document["_id"] = str(document["_id"])
            documents_list.append(document)
        if not documents_list:
            return None
        return documents_list

    def update_role(self, role, _id):
        new_data = {
            "$set": {
                "roles": role,
            }
        }
        result = collection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_workers(self, doc, _id):
        new_data = {
            "$set": {
                "workers": doc,
            }
        }
        result = collection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_grid(self, doc, _id):
        new_data = {
            "$set": {
                "grid": doc,
            }
        }
        result = collection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_waiting(self, waiting, _id):
        new_data = {
            "$set": {
                "waiting": waiting,
            }
        }
        result = collection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")





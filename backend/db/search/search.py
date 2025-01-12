import pymongo
from bson import ObjectId

mongodb_url = "mongodb://localhost:27017/eventride"
client = pymongo.MongoClient(mongodb_url)
db = client.get_database()
collection = db.store

class Search:
    def __init__(self):
        pass

    def get_team(self):
        documents_cursor = collection.find()
        documents_list = []
        for document in documents_cursor:
            document["_id"] = str(document["_id"])
            documents_list.append(document)
        if not documents_list:
            return None
        return documents_list
    
    def update_mission_status(self, status, _id):
        new_data = {
            "$set": {
                "participent": status,
            }
        }
        result = collection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_missions(self, x, y, _id):
        new_data = {
            "$set": {
                "x": x,
                "y": y,
            }
        }
        result = collection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")
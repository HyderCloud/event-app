from bson import ObjectId
import pymongo

mongodb_url = "mongodb://localhost:27017/eventride"
client = pymongo.MongoClient(mongodb_url)
db = client.get_database()
collection = db.missions

class Missions:
    def __init__(self):
        pass

    def get_mission_by_id(self, id):
        documents_list = collection.find_one({"_id": ObjectId(id)})
        if documents_list is None:
            return None
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def insert_mission(self, doccument):
        result = collection.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)
    
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

    def get_missions_by_key(self, key):
        documents_cursor = collection.find({"key": key})
        documents_list = []
        for document in documents_cursor:
            document["_id"] = str(document["_id"])
            documents_list.append(document)
        if not documents_list:
            return None
        return documents_list
    
    def get_mission_by_id(self, id):
        documents_list = collection.find_one({"_id": ObjectId(id)})
        if documents_list is None:
            return None
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list    
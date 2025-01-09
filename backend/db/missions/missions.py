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

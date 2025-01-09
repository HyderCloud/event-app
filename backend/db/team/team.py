import pymongo
from bson import ObjectId

mongodb_url = "mongodb://localhost:27017/eventride"
client = pymongo.MongoClient(mongodb_url)
db = client.get_database()
collection = db.users

class Team:
    def __init__(self):
        pass

    def get_team_by_profession(self, profession):
        documents_cursor = eventsCollection.find({"profession": profession})
        documents_list = []
        for document in documents_cursor:
            document["_id"] = str(document["_id"])
            documents_list.append(document)
        if not documents_list:
            return None
        return documents_list

    def get_team(self):
        documents_cursor = storeCollection.find()
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
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
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
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
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
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
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
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_mission_status(self, status, _id):
        new_data = {
            "$set": {
                "participent": status,
            }
        }
        result = missionCollection.update_one({"_id": ObjectId(_id)}, new_data)
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
        result = missionCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def insert_job_request(self, doccument):
        result = requestCollection.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)

    def insert_message_to_chat(self, doccument):
        result = chatCollection.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)

    def insert_mission(self, doccument):
        result = missionCollection.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)

    def insert_connection(self, doccument):
        result = connectionsCollection.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)

    def get_chat_by_key(self, key):
        documents_cursor = chatCollection.find({"key": key})
        documents_list = []
        for document in documents_cursor:
            document["_id"] = str(document["_id"])
            documents_list.append(document)
        if not documents_list:
            return None
        return documents_list

    def get_jobs_by_key(self, key):
        documents_cursor = requestCollection.find({"key": key})
        documents_list = []
        for document in documents_cursor:
            document["_id"] = str(document["_id"])
            documents_list.append(document)
        if not documents_list:
            return None
        return documents_list

    def get_missions_by_key(self, key):
        documents_cursor = missionCollection.find({"key": key})
        documents_list = []
        for document in documents_cursor:
            document["_id"] = str(document["_id"])
            documents_list.append(document)
        if not documents_list:
            return None
        return documents_list

    def delete_request_by_id(collection, document_id):
        result = requestCollection.delete_one({"_id": ObjectId(document_id)})
        if result.deleted_count > 0:
            return True
        else:
            False

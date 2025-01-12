import pymongo
from bson import ObjectId

mongodb_url = "mongodb://localhost:27017/eventride"
client = pymongo.MongoClient(mongodb_url)
db = client.get_database()
collection = db.chat


class Chat:
    def __init__(self):
        pass

    def insert_message_to_chat(self, doccument):
        result = collection.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)

    def get_chat_by_key(self, key):
        documents_cursor = collection.find({"key": key})
        documents_list = []
        for document in documents_cursor:
            document["_id"] = str(document["_id"])
            documents_list.append(document)
        if not documents_list:
            return None
        return documents_list
    
    def delete_request_by_id(collection, document_id):
        result = collection.delete_one({"_id": ObjectId(document_id)})
        if result.deleted_count > 0:
            return True
        else:
            False
import pymongo
from bson import ObjectId

mongodb_url = "mongodb://localhost:27017/eventride"
client = pymongo.MongoClient(mongodb_url)
db = client.get_database()


def reverse_array(arr):
    return arr[::-1]


# Select a collection
missionCollection = db.missions
storeCollection = db.stores
collectionUsers = db.users
eventsCollection = db.events
requestCollection = db.request
connectionsCollection = db.connections
chatCollection = db.chat


class EventsDB:
    def __init__(self):
        pass

    def update_type_by_id(self, type, _id):
        new_data = {
            "$set": {
                "type": type,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_sellPage_by_id(self, sellPage, _id):
        new_data = {
            "$set": {
                "sellPage": sellPage,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_promoPage_by_id(self, promoPage, _id):
        new_data = {
            "$set": {
                "promoPage": promoPage,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_endPage_by_id(self, endPage, _id):
        new_data = {
            "$set": {
                "endPage": endPage,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_ticket_settings_by_id(self, ticket_settings, _id):
        new_data = {
            "$set": {
                "ticket_settings": ticket_settings,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_ticket_amount_by_id(self, ticket_settings, _id):
        new_data = {
            "$set": {
                "tickets": ticket_settings,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_budget_by_id(self, budget, _id):
        new_data = {
            "$set": {
                "budget": budget,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_rounds_by_id(self, rounds, _id):
        new_data = {
            "$set": {
                "rounds": rounds,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_description_by_id(self, rounds, _id):
        new_data = {
            "$set": {
                "description": rounds,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_cuppons_by_id(self, cuppons, _id):
        new_data = {
            "$set": {
                "cuppons": cuppons,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_tubnail_by_id(self, img, _id):
        new_data = {
            "$set": {
                "tubnail": img,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_age_by_id(self, age, _id):
        new_data = {
            "$set": {
                "age": age,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_details_by_id(self, s_date, e_date, s_time, e_time, place, _id):
        new_data = {
            "$set": {
                "start_date": s_date,
                "end_date": e_date,
                "start_time": s_time,
                "end_time": e_time,
                "place": place,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def update_mode_by_event(self, mode, _id):
        new_data = {
            "$set": {
                "mode": mode,
            }
        }
        result = eventsCollection.update_one({"_id": ObjectId(_id)}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def insert_event(self, doccument):
        result = eventsCollection.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)

    def get_event_by_id(self, id):
        documents_list = eventsCollection.find_one({"_id": ObjectId(id)})
        if documents_list is None:
            return None
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def get_events_by_key(self, key):
        documents_cursor = eventsCollection.find({"key": key})
        documents_list = []
        for document in documents_cursor:
            document["_id"] = str(document["_id"])  # Convert _id to a string
            documents_list.append(document)
        if not documents_list:
            return None
        return documents_list

    def get_mission_by_id(self, id):
        documents_list = missionCollection.find_one({"_id": ObjectId(id)})
        if documents_list is None:
            return None
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def get_events_by_connection(self, key):
        documents_cursor = connectionsCollection.find({"connection": key})
        documents_list = []
        for document in documents_cursor:
            document["_id"] = str(document["_id"])  # Convert _id to a string
            documents_list.append(document)
        if not documents_list:
            return None
        return documents_list


class Store:
    def __init__(self):

        pass

    def update_phone_by_store(self, phone, name):
        new_data = {
            "$set": {
                "phone": phone,
            }
        }
        result = storeCollection.update_one({"name": name}, new_data)
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
        result = storeCollection.update_one({"_id": ObjectId(_id)}, new_data)
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
        result = storeCollection.update_one({"name": name}, new_data)
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
        result = storeCollection.update_one({"name": name}, new_data)
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
        result = storeCollection.update_one({"name": name}, new_data)
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
        result = storeCollection.update_one({"name": name}, new_data)
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
        result = storeCollection.update_one({"name": name}, new_data)
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
        result = storeCollection.update_one({"name": name}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")

    def insert_store(self, doccument):
        result = storeCollection.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)

    def get_store_by_name(self, name):
        documents_list = storeCollection.find_one({"name": name})
        if documents_list is None:
            return None
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def get_store_by_id(self, id):
        object_id = ObjectId(id)
        documents_list = storeCollection.find_one({"_id": object_id})
        if documents_list is None:
            return {"id": "123"}
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def get_store_by_key(self, key):

        documents_list = storeCollection.find_one({"key": key})
        if documents_list is None:
            return {"id": "123"}
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list


class Users:
    def __init__(self):
        pass

    def insert_user(self, doccument):
        result = collectionUsers.insert_one(doccument)
        inserted_id = result.inserted_id
        return str(inserted_id)

    def get_user_by_email(self, email):
        documents_list = collectionUsers.find_one({"email": email})
        if documents_list is None:
            return {"email": "123"}
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def get_user_by_username(self, username):
        documents_list = collectionUsers.find_one({"username": username})
        documents_list["_id"] = str(documents_list["_id"])
        return documents_list

    def update_by_email(self, email, username, terms, sell):
        new_data = {"$set": {"username": username,
                             "terms": terms,
                             "sellContent": sell}}
        result = collectionUsers.update_one({"email": email}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")


    def update_personal_det(self, first, last, phone, id):
        new_data = {"$set": {"firsName": first,
                             "lastName": last,
                             "phone": phone}}
        result = collectionUsers.update_one({"_id": ObjectId(id)}, new_data)
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
        result = collectionUsers.update_one({"email": email}, new_data)
        if result.matched_count > 0:
            return True
        else:
            print("No document found with the given email.")


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

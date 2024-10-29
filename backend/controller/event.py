from models.mongo import Users, Store, EventsDB
from flask import jsonify
import bcrypt
import jwt
import datetime
SECRET_KEY = "267545f00571a7a7c4b36ec3256ddad5b0bf957dcc32dc2e9fd515a4738c2ba5"
api_events = EventsDB()
class Events:
    def __init__(self):
            pass

    def add_event_for_store(self,id, owner, name, start_date,end_date, start_time, end_time, place):
        try:
            doccument = {
            "key": id,
            "owner": owner,
            "name": name,
            "start_date": start_date,
            "end_date": end_date,
            "start_time": start_time,
            "end_time": end_time,
            "place": place,
            "description": '',
            "tubnail": '',
            "tickets": '',
            "pepole_amount": [],
            "public": [],
            "photographers": [],
            "equipment": [],
            "artist": [],
            "services": [],
            "images": [],
            "cuppuns": [],
            "rounds": [],
            "workers": [],
            "security": [],
            "admin": [],
            "status": 'in progress',
            "age": '',
            "type": '',
            "mode": True,
        }
            result = api_events.insert_event(doccument)
            if result:
                 return jsonify({"acknowledge": "allow"}),200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501 
        
    def get_events_by_store(self,key):
         try:
            result = api_events.get_events_by_key(key)
            if result == None:
                return jsonify({"message": 'null'}), 200
            else: 
                return jsonify({"events": result}), 200
         except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501 
         
    def get_event(self, id):
         try:
            result = api_events.get_event_by_id(id)
            if result == None:
                return jsonify({"message": 'null'}), 200
            else: 
                return jsonify({"events": result}), 200
         except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501 
    
    def update_mode_by_id(self,id,mode):
        try:
            is_updated = api_events.update_mode_by_event(mode, id)
            if is_updated:
                return jsonify({"mode": mode}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501


    def update_detail_by_id(self,s_date,e_date, s_time, e_time, place, _id):
        try:
            is_updated = api_events.update_details_by_id(s_date,e_date, s_time, e_time, place, _id)
            if is_updated:
                return jsonify({"start_d": s_date, "end_d":e_date, "start_t": s_time, "end_t": e_time, "place": place}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501
        
    def update_tubnail_by_id(self,id,img):
        try:
            is_updated = api_events.update_tubnail_by_id(img, id)
            if is_updated:
                return jsonify({"image": img}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501
        
    def update_type_by_id(self,id,type):
        try:
            is_updated = api_events.update_type_by_id(type, id)
            if is_updated:
                return jsonify({"type": type}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501
        
    def update_age_by_id(self,id,age):
        try:
            is_updated = api_events.update_age_by_id(age, id)
            if is_updated:
                return jsonify({"age": age}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501
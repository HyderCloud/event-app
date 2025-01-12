from traceback import print_exc
import db
from flask import jsonify
import db.missions
import db.notifications

api_notification = db.notifications.Notifications()
api_mission = db.missions.Missions()

class Missions:
    def __init__(self):
        pass

    def get_mission_by_id(self, key):
        try:
            result = api_mission.get_mission_by_id(key)
            if result == None:
                return jsonify({"mission": []}), 200
            else:
                return jsonify({"mission": result}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501
        
    def get_mission_by_key(self, key):
        try:
            print(key)
            mission = api_mission.get_missions_by_key(key)
            if mission:
                return jsonify({"missions": mission}), 200
            else: 
                     return jsonify({"missions": []}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501
        
    def add_mission(self, doc, req):
        try:
            for req in req:
                team = api_notification.insert_job_request(req)
            is_inserted = api_mission.insert_mission(doc)
            if is_inserted and team:
                return jsonify({"acknowledge": True}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501
        
    def update_mission_status(self, status, id):
        try:
            print(status)
            is_updated2 = api_mission.update_mission_status(status, id)
            if is_updated2:
                return jsonify({"acknowledge": True}), 200
            else:
                return jsonify({"message": "not updated"}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_missions_place(self, x, y, id):
        try:
            is_updated2 = api_mission.update_missions(x, y, id)
            if is_updated2:
                return jsonify({"acknowledge": True}), 200
            else:
                return jsonify({"message": "not updated"}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

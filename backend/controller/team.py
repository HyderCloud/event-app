from models.mongo import Users, Store, EventsDB
from flask import jsonify
from controller.smtp import send_bulk_emails
import bcrypt
import jwt
import datetime
from models.mongo import Team
SECRET_KEY = "267545f00571a7a7c4b36ec3256ddad5b0bf957dcc32dc2e9fd515a4738c2ba5"

team_api = Team()
event_api = EventsDB()


class TeamC:
    def __init__(self):
        pass

    def get_team_by_profession(self,profession):
        try:
            team = team_api.get_team_by_profession(profession)
            return jsonify({"team": team}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501
        
    def get_mission_by_key(self, key):
        try:
            mission = team_api.get_missions_by_key(key)
            if mission:
                return jsonify({"missions": mission}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501

    def get_search(self):
        try:
            team = team_api.get_team()
            return jsonify({"team": team}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501

    def update_role_by_id(self, id, role):
        try:
            is_updated = team_api.update_role(role, id)
            if is_updated:
                return jsonify({"role": role}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501
        
    def add_mission(self,doc, req):
        try:
            for req in req:
                team = team_api.insert_job_request(req)
            is_inserted = team_api.insert_mission(doc)
            if is_inserted and team:
                return jsonify({"acknowledge": True}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501

    def workers_recruit(self, emails):
        try:
            send_bulk_emails(emails)
            for email in emails:
                team = team_api.insert_job_request(email)
            if team:
                return jsonify({"waiting": "message"}), 200
            else:
                return jsonify({"message": 'error-'}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501

    def get_job_req(self, key):
        try:
            team = team_api.get_jobs_by_key(key)
            print(team)
            if team:
                return jsonify({"notify": team}), 200
            else:
                return jsonify({"message": 'error-'}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501
        
    

    def update_job_by_id(self, id, role, name, key, fromU):
        try:
            event = event_api.get_event_by_id(fromU)
            if event:
                workers = event["workers"]
                workers.append({"key": key, "role": role, "admin": "none"})
                is_connected = event_api.get_event_by_id(fromU)
                is_connected["connection"] = key
                is_connected["origin"] = is_connected["_id"]
                del is_connected["_id"]
                is_delite = team_api.delete_request_by_id(id)
                print(fromU)
                is_updated2 = team_api.update_workers(workers, fromU)
                if is_updated2 and is_delite and is_connected:
                    team_api.insert_connection(is_connected)
                    return jsonify({"link": f"/{name}/{fromU}"}), 200
                else:
                    return jsonify({"message": 'error-'}), 200
            else:
                return jsonify({"message": 'error-'}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501

    def update_admin(self, admin, id):
        try:
            is_updated2 = team_api.update_workers(admin, id)
            if is_updated2:
                    return jsonify({"team": admin}), 200
            else:
                return jsonify({"message": "not updated"}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501 
        
    def update_mission_status(self, status, id):
        try:
            print(status)
            is_updated2 = team_api.update_mission_status(status, id)
            if is_updated2:
                    return jsonify({"acknowledge": True}), 200
            else:
                return jsonify({"message": "not updated"}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501 

    def update_missions_place(self, x,y, id):
        try:
            is_updated2 = team_api.update_missions(x,y, id)
            if is_updated2:
                    return jsonify({"acknowledge": True}), 200
            else:
                return jsonify({"message": "not updated"}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501     
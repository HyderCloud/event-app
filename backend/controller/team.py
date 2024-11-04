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

    def get_team_by_profession(profession):
        try:
            team = team_api.get_team_by_profession(profession)
            return jsonify({"team": team}), 200
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
                is_delite = team_api.delete_request_by_id(id)
                is_updated2 = team_api.update_workers(workers, fromU)
                if is_updated2 and is_delite:
                    return jsonify({"link": f"/{name}/{fromU}"}), 200
                else:
                    return jsonify({"message": 'error-'}), 200
            else:
                return jsonify({"message": 'error-'}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501

    def delete_by_key(arr, key_value):
        # Filter out objects where 'key' matches 'key_value'
        new_arr = [obj for obj in arr if obj.get("key") != key_value]
        return new_arr

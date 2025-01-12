from flask import jsonify
import bcrypt
import jwt
import datetime
import db.events
import db.notifications
import db.team

SECRET_KEY = "267545f00571a7a7c4b36ec3256ddad5b0bf957dcc32dc2e9fd515a4738c2ba5"

team_api = db.team.Team()
event_api = db.events.Events()
notification_api = db.notifications.Notifications()

class Team:
    def __init__(self):
        pass
    def get_team_by_profession(self, profession):
        try:
            team = team_api.get_team_by_profession(profession)
            return jsonify({"team": team}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_role_by_id(self, id, role):
        try:
            is_updated = team_api.update_role(role, id)
            if is_updated:
                return jsonify({"role": role}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501


    def update_workers(self, workers, fromU):
        try:
            is_updated = team_api.update_workers(workers, fromU)
            if is_updated:
                return jsonify({"workers": workers}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_grid(self, grid, fromU):
        try:
            is_updated = team_api.update_grid(grid, fromU)
            if is_updated:
                return jsonify({"grid": grid}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

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
                is_delite = notification_api.delete_request_by_id(id)
                print(fromU)
                is_updated2 = team_api.update_workers(workers, fromU)
            else:
                return jsonify({"message": "error-"}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_admin(self, admin, id):
        try:
            is_updated2 = team_api.update_workers(admin, id)
            if is_updated2:
                return jsonify({"team": admin}), 200
            else:
                return jsonify({"message": "not updated"}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501


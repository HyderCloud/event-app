from models.mongo import Users, Store, EventsDB
from flask import jsonify
from controller.smtp import send_bulk_emails
import bcrypt
import jwt
import datetime
from models.mongo import Team
SECRET_KEY = "267545f00571a7a7c4b36ec3256ddad5b0bf957dcc32dc2e9fd515a4738c2ba5"

team_api = Team()

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
        
    def update_role_by_id(self,id,role):
        try:
            is_updated = team_api.update_role(role, id)
            if is_updated:
                return jsonify({"role": role}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501
        

    def workers_recruit(self,emails, id):
        try:
            send_bulk_emails(emails)
            team = team_api.update_waiting(emails, id)
            if team:       
                    return jsonify({"waiting": emails}), 200
        except Exception as e:
            return jsonify({"message": 'error-' + str(e)}), 501
from flask import jsonify
from controller.smtp import send_bulk_emails
import db.notifications
notification_api = db.notifications.Notifications()

class Notifications:
    def __init__(self):
        pass

    def workers_recruit(self, data):
        try:
            send_bulk_emails(data)
            team = notification_api.insert_job_request(data)
            if team:
                return jsonify({"waiting": True}), 200
            else:
                return jsonify({"message": "error-"}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501
        
    def get_job_req(self, key):
        try:
            team = notification_api.get_jobs_by_key(key)
            print(team)
            if team:
                return jsonify({"notify": team}), 200
            else:
                return jsonify({"message": "error-"}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501
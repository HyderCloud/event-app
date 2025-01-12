from flask import Blueprint, render_template, request, jsonify
route_blueprint = Blueprint('notificaiton', __name__)
import controller.notifications

notifications_api = controller.notifications.Notifications()

@route_blueprint.route('/notification/<string:id>', methods=['GET'])
def get_jobs(id):
    return notifications_api.get_job_req(id)

@route_blueprint.route('/waiting/<string:id>', methods=['PATCH'])
def update_waiting(id):
    event = request.get_json()
    return notifications_api.workers_recruit(event["waiting"])
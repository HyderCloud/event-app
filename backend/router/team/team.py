from flask import Blueprint, render_template, request, jsonify
route_blueprint = Blueprint('team', __name__)
from controller.team import Team

team_api = Team()

@route_blueprint.route('/getteam/<string:profession>', methods=['GET'])
def get_team_by_profession(profession):
    return team_api.get_team_by_profession(profession)

@route_blueprint.route('/roles/<string:id>', methods=['PATCH'])
def update_role(id):
    event = request.get_json()
    return team_api.update_role_by_id(id,event["roles"],)

@route_blueprint.route('/allowjob/<string:id>', methods=['PATCH'])
def allow_jobs(id):
    event = request.get_json()
    return team_api.update_job_by_id(event['id'],event["role"],event["name"],event["key"],event["from"])

@route_blueprint.route('/updateadmin/<string:id>', methods=['PATCH'])
def admin_up(id):
    event = request.get_json()
    return team_api.update_admin(event['data'], id)

@route_blueprint.route('/updateworker/<string:id>', methods=['PATCH'])
def update_worker_status(id):
    event = request.get_json()
    return team_api.update_workers(event['team'], id)

@route_blueprint.route('/updategrid/<string:id>', methods=['PATCH'])
def update_grid_status(id):
    event = request.get_json()
    return team_api.update_grid(event['grid'], id)

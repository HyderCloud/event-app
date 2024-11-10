from flask import Blueprint, render_template, request, jsonify
team_blueprint = Blueprint('team', __name__)
from controller.team import TeamC

team_api = TeamC()

@team_blueprint.route('/getteam/<string:profession>', methods=['GET'])
def get_team_by_profession(profession):
    return team_api.get_team_by_profession(profession)

@team_blueprint.route('/getteam', methods=['GET'])
def get_team():
    return team_api.get_search()


@team_blueprint.route('/roles/<string:id>', methods=['PATCH'])
def update_role(id):
    event = request.get_json()
    return team_api.update_role_by_id(id,event["roles"],)

@team_blueprint.route('/waiting/<string:id>', methods=['PATCH'])
def update_waiting(id):
    event = request.get_json()
    return team_api.workers_recruit(event["waiting"])

@team_blueprint.route('/notification/<string:id>', methods=['GET'])
def get_jobs(id):
    return team_api.get_job_req(id)

@team_blueprint.route('/allowjob/<string:id>', methods=['PATCH'])
def allow_jobs(id):
    event = request.get_json()
    return team_api.update_job_by_id(event['id'],event["role"],event["name"],event["key"],event["from"])

@team_blueprint.route('/updateadmin/<string:id>', methods=['PATCH'])
def admin_up(id):
    event = request.get_json()
    return team_api.update_admin(event['data'], id)

@team_blueprint.route('/addmission/<string:id>', methods=['POST'])
def add_mission(id):
    event = request.get_json()

    return team_api.add_mission(event['data'], event["request"])

@team_blueprint.route('/missions/<string:id>', methods=['GET'])
def get_missions(id):
    print(get_missions)
    return team_api.get_mission_by_key(id)

@team_blueprint.route('/updatemissions/<string:id>', methods=['PATCH'])
def update_position_mission(id):
    event = request.get_json()
    return team_api.update_missions_place(event['x'], event['y'], event["id"])
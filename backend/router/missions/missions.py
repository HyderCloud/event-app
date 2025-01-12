from flask import Blueprint, render_template, request
import controller.missions

route_blueprint = Blueprint("missions", __name__)
missions_api = controller.missions.Missions()


@route_blueprint.route("/missionbyid/<string:id>", methods=["GET"])
def get_mission_by_id(id):
    return missions_api.get_mission_by_id(id)

@route_blueprint.route('/addmission/<string:id>', methods=['POST'])
def add_mission(id):
    body = request.get_json()
    return missions_api.add_mission(body['data'], body["request"])

@route_blueprint.route('/missions/<string:id>', methods=['GET'])
def get_missions(id):
    return missions_api.get_mission_by_key(id)

@route_blueprint.route('/updatestatus/<string:id>', methods=['PATCH'])
def update_mission_status(id):
    body = request.get_json()
    return missions_api.update_mission_status(body['status'], body["id"])
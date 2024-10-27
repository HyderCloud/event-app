from flask import Blueprint, render_template, request
events_blueprint = Blueprint('events', __name__)
from controller.event import Events
events_api = Events()

@events_blueprint.route('/addevent/<string:id>/<string:owner>', methods=['POST'])
def addEvent(id, owner):
    event = request.get_json()
    return events_api.add_event_for_store(id,owner,event["name"],event["start_date"],event["end_date"],event["startTime"],event["endTime"],event["place"])

@events_blueprint.route('/getevents/<string:id>', methods=['GET'])
def get_events_store(id):
    return events_api.get_events_by_store(id)

@events_blueprint.route('/getevent/<string:id>', methods=['GET'])
def get_event_store(id):
    return events_api.get_event(id)


@events_blueprint.route('/chnagemode/<string:id>', methods=['PATCH'])
def update_event_mode(id):
    event = request.get_json()
<<<<<<< HEAD
    print(id)
    return events_api.update_mode_by_id(id,event["mode"],)
=======
    return events_api.update_mode_by_event(id,event["mode"],)
>>>>>>> 00d0b214e996b35dd18ecdac70f86d19f64133c2

from flask import Blueprint, render_template, request

events_blueprint = Blueprint("events", __name__)
from controller.event import Events

events_api = Events()


@events_blueprint.route("/addevent/<string:id>/<string:owner>", methods=["POST"])
def addEvent(id, owner):
    event = request.get_json()
    return events_api.add_event_for_store(
        id,
        owner,
        event["name"],
        event["dateRange"],
        event["startTime"],
        event["endTime"],
        event["place"],
        event["id"],
        event["ticket"],
        event["round"],
        event["description"],
        event["type"],
        event["age"],
        event["image"],
        event["public"]
        
    )


@events_blueprint.route("/getevents/<string:id>", methods=["GET"])
def get_events_store(id):
    return events_api.get_events_by_store(id)


@events_blueprint.route("/getevent/<string:id>", methods=["GET"])
def get_event_store(id):
    return events_api.get_event(id)


@events_blueprint.route("/chnagemode/<string:id>", methods=["PATCH"])
def update_event_mode(id):
    event = request.get_json()
    print(id)
    return events_api.update_mode_by_id(
        id,
        event["mode"],
    )


@events_blueprint.route("/chnagdetails/<string:id>", methods=["PATCH"])
def update_event_details(id):
    event = request.get_json()
    return events_api.update_detail_by_id(
        event["startDate"],
        event["endDate"],
        event["startTime"],
        event["endTime"],
        event["place"],
        id,
    )


@events_blueprint.route("/chnagetubnail/<string:id>", methods=["PATCH"])
def update_event_tubnail(id):
    event = request.get_json()
    return events_api.update_tubnail_by_id(
        id,
        event["image"],
    )


@events_blueprint.route("/chnagetype/<string:id>", methods=["PATCH"])
def update_event_type(id):
    event = request.get_json()
    return events_api.update_type_by_id(
        id,
        event["type"],
    )


@events_blueprint.route("/chnageage/<string:id>", methods=["PATCH"])
def update_event_age(id):
    event = request.get_json()
    return events_api.update_age_by_id(
        id,
        event["age"],
    )


@events_blueprint.route("/ticketset/<string:id>", methods=["PATCH"])
def update_ticket_settings(id):
    event = request.get_json()
    return events_api.update_ticket_settings(
        id,
        event["settings"],
    )


@events_blueprint.route("/rounds/<string:id>", methods=["PATCH"])
def update_rounds(id):
    event = request.get_json()
    return events_api.update_rounds(id, event["rounds"])


@events_blueprint.route("/tamount/<string:id>", methods=["PATCH"])
def update_tamount(id):
    event = request.get_json()
    return events_api.update_tickets_amount_by_id(id, event["tamount"])


@events_blueprint.route("/cuppons/<string:id>", methods=["PATCH"])
def update_cupponss(id):
    event = request.get_json()
    return events_api.update_cuppons(id, event["cuppons"])


@events_blueprint.route("/geteventconnection/<string:id>", methods=["GET"])
def get_connection_event(id):
    return events_api.get_events_by_connection(id)

@events_blueprint.route("/missionbyid/<string:id>", methods=["GET"])
def get_mission_by_id(id):
    return events_api.get_mission_by_id(id)

@events_blueprint.route("/sellPage/<string:id>", methods=["PATCH"])
def update_sellPage(id):
    event = request.get_json()
    return events_api.update_sellPage( event["sellPage"],id)

@events_blueprint.route("/endPage/<string:id>", methods=["PATCH"])
def update_endPage(id):
    event = request.get_json()
    return events_api.update_endPage( event["endPage"],id)

@events_blueprint.route("/promoPage/<string:id>", methods=["PATCH"])
def update_promoPage(id):
    event = request.get_json()
    return events_api.update_promoPage( event["promoPage"],id)

@events_blueprint.route("/description/<string:id>", methods=["PATCH"])
def update_description(id):
    event = request.get_json()
    return events_api.update_description(id, event["description"])

@events_blueprint.route("/budget/<string:id>", methods=["PATCH"])
def update_budget(id):
    event = request.get_json()
    return events_api.update_budget_by_id(id, event["budget"])

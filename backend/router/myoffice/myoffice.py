from flask import Blueprint, render_template, request, jsonify
import controller

route_blueprint = Blueprint('myoffice', __name__)
my_office_api = controller.myoffice.My_Office()

@route_blueprint.route('/insertstore/<string:id>', methods=['PATCH'])
def insert_store(id):
    user = request.get_json()
    return my_office_api.set_new_store(id, user["store"],user["username"], user["profession"],user["email"])

@route_blueprint.route('/getstorebyid/<string:id>', methods=['GET'])
def get_store_by_ids(id):
    print(id)
    return my_office_api.get_store_by_id3(id)


@route_blueprint.route('/<string:name>', methods=['GET'])
def get_store_by_storename_(name):
    return my_office_api.get_store_by_storeusername(name)

@route_blueprint.route('/events/<string:name>', methods=['GET'])
def get_store_by_storename_events(name):
    return my_office_api.get_store_by_storeusername(name)

@route_blueprint.route('/update_links/<string:name>', methods=['PATCH'])
def update_links(name):
    user = request.get_json()
    return my_office_api.update_links_by_name(name,user["links"])

@route_blueprint.route('/update_description/<string:name>', methods=['PATCH'])
def update_descrpition(name):
    user = request.get_json()
    return my_office_api.update_description_by_name(name,user["description"])

@route_blueprint.route('/update_email/<string:name>', methods=['PATCH'])
def email_update(name):
    user = request.get_json()
    print(name)
    return my_office_api.update_email_by_name(name,user["email"])

@route_blueprint.route('/update_phone/<string:name>', methods=['PATCH'])
def phone_update(name):
    user = request.get_json()
    return my_office_api.update_phone_by_name(name,user["phone"])

@route_blueprint.route('/update_slogen/<string:name>', methods=['PATCH'])
def slogen_update(name):
    user = request.get_json()
    return my_office_api.update_slogen_by_name(name,user["slogen"])

@route_blueprint.route('/bunner/<string:name>', methods=['PATCH'])
def bunner_update(name):
    user = request.get_json()
    return my_office_api.update_bunner_by_name(name,user["image"])

@route_blueprint.route('/profile/<string:name>', methods=['PATCH'])
def profile_update(name):
    user = request.get_json()
    return my_office_api.update_profile_by_name(name,user["image"])



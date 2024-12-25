from flask import Blueprint, render_template, request, jsonify
from controller.store import set_new_store, get_store_by_username, get_store_by_id3,get_store_by_storeusername,update_bunner_by_name,update_profile_by_name, update_phone_by_name,update_slogen_by_name,update_links_by_name, update_email_by_name,update_description_by_name
stores_blueprint = Blueprint('store', __name__)

@stores_blueprint.route('/insertstore/<string:id>', methods=['PATCH'])
def insert_store(id):
    user = request.get_json()
    return set_new_store(id, user["store"],user["username"], user["profession"],user["email"])

@stores_blueprint.route('/getstorebyid/<string:id>', methods=['GET'])
def get_store_by_ids(id):
    print(id)
    return get_store_by_id3(id)


@stores_blueprint.route('/<string:name>', methods=['GET'])
def get_store_by_storename_(name):
    return get_store_by_storeusername(name)

@stores_blueprint.route('/events/<string:name>', methods=['GET'])
def get_store_by_storename_events(name):
    return get_store_by_storeusername(name)

@stores_blueprint.route('/update_links/<string:name>', methods=['PATCH'])
def update_links(name):
    user = request.get_json()
    return update_links_by_name(name,user["links"])

@stores_blueprint.route('/update_description/<string:name>', methods=['PATCH'])
def update_descrpition(name):
    user = request.get_json()
    return update_description_by_name(name,user["description"])

@stores_blueprint.route('/update_email/<string:name>', methods=['PATCH'])
def email_update(name):
    user = request.get_json()
    print(name)
    return update_email_by_name(name,user["email"])

@stores_blueprint.route('/update_phone/<string:name>', methods=['PATCH'])
def phone_update(name):
    user = request.get_json()
    return update_phone_by_name(name,user["phone"])

@stores_blueprint.route('/update_slogen/<string:name>', methods=['PATCH'])
def slogen_update(name):
    user = request.get_json()
    return update_slogen_by_name(name,user["slogen"])

@stores_blueprint.route('/bunner/<string:name>', methods=['PATCH'])
def bunner_update(name):
    user = request.get_json()
    return update_bunner_by_name(name,user["image"])

@stores_blueprint.route('/profile/<string:name>', methods=['PATCH'])
def profile_update(name):
    user = request.get_json()
    return update_profile_by_name(name,user["image"])



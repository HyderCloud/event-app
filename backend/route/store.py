from flask import Blueprint, render_template, request
from controller.store import set_new_store
stores_blueprint = Blueprint('store', __name__)

@stores_blueprint.route('/insertstore/<string:id>', methods=['POST'])
def insert_store(id):
    user = request.get_json()
    return 'HELLO'
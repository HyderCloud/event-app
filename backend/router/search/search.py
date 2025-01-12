from flask import Blueprint, render_template, request, jsonify
import controller.search
route_blueprint = Blueprint('search', __name__)
import controller

search_api = controller.search.Search()

@route_blueprint.route('/getteam', methods=['GET'])
def get_team():
    return search_api.get_search()
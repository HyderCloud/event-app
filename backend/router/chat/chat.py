from flask import Blueprint, render_template, request
import controller.chat

route_blueprint = Blueprint("chat", __name__)
chat_api = controller.chat.Chat()

@route_blueprint.route('/addmessage', methods=['POST'])
def add_message():
    event = request.get_json()
    return chat_api.add_mesasge_to_chat(event['data'])

@route_blueprint.route('/chat/<string:id>', methods=['GET'])
def get_chat(id):
    return chat_api.get_chat_by_key(id)
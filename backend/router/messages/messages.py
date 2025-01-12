from flask import Blueprint, render_template, request
import controller.messages

route_blueprint = Blueprint("messages", __name__)
messages_api = controller.messages.Message()
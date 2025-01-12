from flask import Blueprint, render_template, request
import controller.logs

route_blueprint = Blueprint("logs", __name__)
logs_api = controller.logs.Logs()
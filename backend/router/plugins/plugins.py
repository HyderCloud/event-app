from flask import Blueprint, render_template, request
import controller.plugins

route_blueprint = Blueprint("plugins", __name__)
plugins_api = controller.plugins.Plugins()
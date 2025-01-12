from flask import Blueprint, render_template, request, jsonify
import controller.settings
route_blueprint = Blueprint('settings', __name__)
import controller

settings_api = controller.settings.Settings()
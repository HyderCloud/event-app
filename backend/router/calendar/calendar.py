from flask import Blueprint, render_template, request
import controller.calendar

route_blueprint = Blueprint("calendar", __name__)
calendar_api = controller.calendar.Calendar()
from flask import Blueprint, render_template, request
import controller.emails

route_blueprint = Blueprint("emails", __name__)
emails_api = controller.emails.Emails()
from flask import Blueprint, render_template, request
import controller.wallet

route_blueprint = Blueprint("wallet", __name__)
wallet_api = controller.wallet.Wallet()

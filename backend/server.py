from flask import Flask
from flask_cors import CORS
from route.users import users_blueprint
from route.store import stores_blueprint
from route.event import events_blueprint
from route.team import team_blueprint
app = Flask(__name__)
CORS(app)

app.register_blueprint(users_blueprint)
app.register_blueprint(stores_blueprint)
app.register_blueprint(events_blueprint)
app.register_blueprint(team_blueprint)

@app.route('/')
def home():
    return "Hello eventride, Flask is running on localhost:9020!"




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9020, debug=True)
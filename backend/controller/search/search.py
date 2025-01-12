from flask import jsonify
import db.search

search_api = db.search.Search()

class Search:
    def __init__(self):
        pass

    def get_search(self):
        try:
            team = search_api.get_team()
            return jsonify({"team": team}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501
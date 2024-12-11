from traceback import print_exc
from models.mongo import Users, Store, EventsDB
from flask import jsonify
import bcrypt
import jwt
import datetime

SECRET_KEY = "267545f00571a7a7c4b36ec3256ddad5b0bf957dcc32dc2e9fd515a4738c2ba5"
api_events = EventsDB()
api_store = Store()


class Events:
    def __init__(self):
        pass

    def add_event_for_store(
        self,
        id,
        owner,
        name,
        dateRange,
        start_time,
        end_time,
        place,
        user_id,
        ticket,
        round,
        description,
        type2,
        age,
        thubnail,
        public
    ):
        try:
            doccument = {
                "key": id,
                "owner": owner,
                "name": name,
                "dateRange": dateRange,
                "start_time": start_time,
                "end_time": end_time,
                "place": place,
                "description": description,
                "tubnail": thubnail,
                "tickets": "ללא הגבלה",
                "clients": [],
                "images": [],
                "isTicketSale": ticket,
                "cuppons": [],
                "roles": [],
                "rounds": round,
                "budget": [
                    {
                        "name": "תקציב",
                        "y": 0,
                        "dataLabels": {"style": {"color": "#ffff", "fontSize": "16px"}},
                    }
                ],
                "workers": [
                    {
                        "key": user_id,
                        "role": "בעלים",
                        "admin": "יוצר",
                        "files": [],
                        "ai": [],
                    }
                ],
                "status": "in progress",
                "age": age,
                "type": type2,
                "sellPage": {"workers": [],
                              "mission": []},
                "promoPage": {"workers": [],
                              "mission": []},
                "endPage": {"workers": [],
                              "mission": []},
                "mode": public,
                "grid": [
                    {"field": "_id"},
                    {"field": "name"},
                    {"field": "email"},
                    {"field": "phone"},
                    {"field": "role", "editable": True},
                    {"field": "ai"},
                    {"field": "files"},
                    {"field": "quotations"},
                    {"field": "status"},
                    {"field": "admin"},
                ],
                "ticket_settings": {
                    "cash": False,
                    "payment": False,
                    "ID": False,
                    "date": False,
                    "gender": False,
                    "isInstegram": False,
                    "facebookLink": False,
                    "instegramLink": False,
                },
            }
            result = api_events.insert_event(doccument)
            if result:
                return jsonify({"acknowledge": True, "link": f"/{name}/{result}"}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def get_events_by_store(self, key):
        try:
            result = api_events.get_events_by_key(key)
            if result == None:
                return jsonify({"message": "null"}), 200
            else:
                return jsonify({"events": result}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def get_event(self, id):
        try:
            team = []
            result = api_events.get_event_by_id(id)
            if result == None:
                return jsonify({"message": "null"}), 200
            else:
                if len(result["workers"]) > 0:
                    for res in result["workers"]:
                        result2 = api_store.get_store_by_key(res["key"])
                        for i in res:
                            result2[i] = res[i]
                            result2[i] = res[i]

                        team.append(result2)

                    return (
                        jsonify(
                            {
                                "events": result,
                                "team": team,
                                "workers": result["workers"],
                            }
                        ),
                        200,
                    )
                else:
                    return jsonify({"events": result}), 200
        except Exception as e:
            print_exc()
            return jsonify({"message": "error-" + str(e)}), 501

    def update_mode_by_id(self, id, mode):
        try:
            is_updated = api_events.update_mode_by_event(mode, id)
            if is_updated:
                return jsonify({"mode": mode}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_detail_by_id(self, s_date, e_date, s_time, e_time, place, _id):
        try:
            is_updated = api_events.update_details_by_id(
                s_date, e_date, s_time, e_time, place, _id
            )
            if is_updated:
                return (
                    jsonify(
                        {
                            "start_d": s_date,
                            "end_d": e_date,
                            "start_t": s_time,
                            "end_t": e_time,
                            "place": place,
                        }
                    ),
                    200,
                )
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_tubnail_by_id(self, id, img):
        try:
            is_updated = api_events.update_tubnail_by_id(img, id)
            if is_updated:
                return jsonify({"image": img}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_type_by_id(self, id, type):
        try:
            is_updated = api_events.update_type_by_id(type, id)
            if is_updated:
                return jsonify({"type": type}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_tickets_amount_by_id(self, id, tickets_amount):
        try:
            is_updated = api_events.update_ticket_amount_by_id(tickets_amount, id)
            if is_updated:
                return jsonify({"rounds": tickets_amount}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_budget_by_id(self, id, budget):
        try:
            is_updated = api_events.update_budget_by_id(budget, id)
            if is_updated:
                return jsonify({"acknowledge": True}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_age_by_id(self, id, age):
        try:
            is_updated = api_events.update_age_by_id(age, id)
            if is_updated:
                return jsonify({"age": age}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_ticket_settings(self, id, doccument):
        try:
            is_updated = api_events.update_ticket_settings_by_id(doccument, id)
            if is_updated:
                return jsonify({"settings": doccument}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_rounds(self, id, doccument):
        try:
            is_updated = api_events.update_rounds_by_id(doccument, id)
            if is_updated:
                return jsonify({"rounds": doccument}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_description(self, id, doccument):
        try:
            is_updated = api_events.update_description_by_id(doccument, id)
            if is_updated:
                return jsonify({"description": doccument}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_cuppons(self, id, doccument):
        try:
            is_updated = api_events.update_cuppons_by_id(doccument, id)
            if is_updated:
                return jsonify({"cuppons": doccument}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_sellPage(self,  doccument,id):
        try:
            is_updated = api_events.update_sellPage_by_id(doccument, id)
            if is_updated:
                return jsonify({"sellPage": doccument}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_endPage(self,  doccument,id):
        try:
            is_updated = api_events.update_endPage_by_id(doccument, id)
            if is_updated:
                return jsonify({"endPage": doccument}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def update_promoPage(self,  doccument,id):
        try:
            is_updated = api_events.update_promoPage_by_id(doccument, id)
            if is_updated:
                return jsonify({"promoPage": doccument}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def get_events_by_connection(self, id):
        try:
            result = api_events.get_events_by_connection(id)
            if result == None:
                return jsonify({"events": []}), 200
            else:
                return jsonify({"events": result}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def get_mission_by_id(self, key):
        try:
            result = api_events.get_mission_by_id(key)
            if result == None:
                return jsonify({"mission": []}), 200
            else:
                return jsonify({"mission": result}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501
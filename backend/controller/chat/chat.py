from flask import jsonify
import db.chat

api_chat = db.chat.Chat()

class Chat:
    def __init__(self):
        pass

    def add_mesasge_to_chat(self, doc):
        try:
            is_inserted = api_chat.insert_message_to_chat(doc)
            if is_inserted:
                return jsonify({"acknowledge": True}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501

    def get_chat_by_key(self, key):
        try:
            chat = api_chat.get_chat_by_key(key)
            return jsonify({"chat": chat}), 200
        except Exception as e:
            return jsonify({"message": "error-" + str(e)}), 501
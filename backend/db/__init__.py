from .calendar import *
from .chat import *
from .events import *
from .logs import *
from .missions import *
from .myoffice import *
from .notifications import *
from .plugins import *
from .team import *
from .users import *
from .wallet import *
import pymongo



# Select a collection
mission_collection = db.missions
myoffice_collection = db.stores
users_collection = db.users

request_collection = db.request
connections_collection = db.connections
chat_collection = db.chat
office_collection= db.myoffice


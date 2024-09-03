from flask_admin.contrib.sqla import ModelView
from sqlalchemy import inspect
from database import *
class UserView(ModelView):
    column_display_pk = True # optional, but I like to see the IDs in the list
    column_hide_backrefs = False
    column_list = [c_attr.key for c_attr in inspect(User).mapper.column_attrs]

class CompletedView(ModelView):
    column_display_pk = True # optional, but I like to see the IDs in the list
    column_hide_backrefs = False
    column_list = [c_attr.key for c_attr in inspect(Completed).mapper.column_attrs]
class TakesView(ModelView):
    column_display_pk = True # optional, but I like to see the IDs in the list
    column_hide_backrefs = False
    column_list = [c_attr.key for c_attr in inspect(Takes).mapper.column_attrs]
class LogsView(ModelView):
    column_display_pk = True # optional, but I like to see the IDs in the list
    column_hide_backrefs = False
    column_list = [c_attr.key for c_attr in inspect(Logs).mapper.column_attrs]
# -*- encoding: utf-8 -*-

from flask import Flask
from flask.ext.restful import Api


app = Flask('vpnchooser')
api = Api(app)

# -*- encoding: utf-8 -*-

from vpnchooser.applicaton import api

from .device import DeviceResource, DeviceListResource
from .vpn import VpnResource, VpnListResource
from .user import UserResource, UserListResource


api.add_resource(DeviceListResource, '/devices', endpoint='device_list')
api.add_resource(DeviceResource, '/devices/<string:device_ip>', endpoint='device')
api.add_resource(VpnListResource, '/vpns', endpoint='vpn_list')
api.add_resource(VpnResource, '/vpns/<string:vpn_name>', endpoint='vpn')
api.add_resource(UserListResource, '/users', endpoint='user_list')
api.add_resource(UserResource, '/users/<string:user_name>', endpoint='user')

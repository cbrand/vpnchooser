# -*- encoding: utf-8 -*-

from flask.ext.restful import (
    Resource,
    fields,
    marshal_with,
    abort,
    url_for
)
from flask.ext.restful.reqparse import RequestParser

from vpnchooser.helpers import (
    require_admin, require_login
)
from vpnchooser.helpers.fields import AbsoluteUrl
from vpnchooser.db import session, Device


parser = RequestParser()
parser.add_argument(
    'ip', type=str,
    required=True,
)
parser.add_argument(
    'name', type=str,
    required=True,
)
parser.add_argument(
    'type', type=str,
    required=False,
)
parser.add_argument(
    'vpn', type=str,
    required=False
)

resource_fields = {
    'ip': fields.String,
    'name': fields.String,
    'type': fields.String,
    'vpn': AbsoluteUrl('vpn'),
    'self': AbsoluteUrl('device'),
}


class AbstractDeviceResource(Resource):
    """
    Abstract of the resource.
    """

    @staticmethod
    def update(device: Device) -> Device:
        args = parser.parse_args()
        device.ip = args.ip
        device.name = args.name
        device.type = args.type
        return device


class DeviceResource(AbstractDeviceResource):
    """
    The resource to access a device resource.
    """

    @staticmethod
    def _get_by_ip(ip: str) -> Device:
        return session.query(Device).filter(
            Device.ip == ip
        ).first()

    def _get_or_abort(self, device_ip: str):
        device = self._get_by_ip(device_ip)
        if device is None:
            abort(404)
        else:
            pass
        return device

    @require_login
    @marshal_with(resource_fields)
    def get(self, device_ip: str) -> Device:
        """
        Gets the Device Resource.
        """
        return self._get_or_abort(device_ip)

    @require_login
    @marshal_with(resource_fields)
    def put(self, device_ip: str) -> Device:
        """
        Updates the Device Resource with the
        name.
        """
        device = self._get_or_abort(device_ip)
        self.update(device)
        session.commit()
        session.add(device)
        return device

    @require_login
    @marshal_with(resource_fields)
    def post(self, device_ip: str) -> Device:
        device = Device()
        device.name = device_ip
        self.update(device)
        session.commit()
        session.add(device)
        return device, 201, {
            'Location': url_for('device', device_ip=device_ip)
        }

    @require_login
    def delete(self, device_ip: str):
        """
        Deletes the resource with the given name.
        """
        device = self._get_or_abort(device_ip)
        session.delete(device)
        session.commit()
        return '', 204


class DeviceListResource(AbstractDeviceResource):
    """
    List resource for the device.
    """

    @require_login
    @marshal_with(resource_fields)
    def get(self):
        return list(session.query(Device))

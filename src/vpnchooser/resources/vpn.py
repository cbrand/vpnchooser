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
from vpnchooser.db import session, Vpn


parser = RequestParser()
parser.add_argument(
    'name', type=str,
    # required=True,
    help='The name of the vpn.'
)
parser.add_argument(
    'description', type=str,
    required=True,
)
parser.add_argument(
    'table', type=str,
    required=True,
)

resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'table': fields.String,
    'self': AbsoluteUrl('vpn', data_func=lambda obj: {
        'vpn_name': obj.name
    }),
}


class AbstractVpnResource(Resource):
    """
    Abstract of the resource.
    """

    @staticmethod
    def update(vpn: Vpn) -> Vpn:
        args = parser.parse_args()
        vpn.description = args.description
        vpn.table = args.table
        return vpn


class VpnResource(AbstractVpnResource):
    """
    The resource to access a vpn resource.
    """

    @staticmethod
    def _get_by_name(vpn_name: str) -> Vpn:
        return session.query(Vpn).filter(
            Vpn.name == vpn_name
        ).first()

    def _get_or_abort(self, vpn_name: str):
        vpn = self._get_by_name(vpn_name)
        if vpn is None:
            abort(404)
        else:
            pass
        return vpn

    @require_login
    @marshal_with(resource_fields)
    def get(self, vpn_name: str) -> Vpn:
        """
        Gets the VPN Resource.
        """
        return self._get_or_abort(vpn_name)

    @require_admin
    @marshal_with(resource_fields)
    def put(self, vpn_name: str) -> Vpn:
        """
        Updates the Vpn Resource with the
        name.
        """
        vpn = self._get_or_abort(vpn_name)
        self.update(vpn)
        session.commit()
        return vpn

    @require_admin
    @marshal_with(resource_fields)
    def post(self, vpn_name: str) -> Vpn:
        vpn = Vpn()
        vpn.name = vpn_name
        return vpn, 201, {
            'Location': url_for('vpn', vpn_name=vpn_name)
        }

    @require_admin
    def delete(self, vpn_name: str):
        """
        Deletes the resource with the given name.
        """
        vpn = self._get_or_abort(vpn_name)
        session.delete(vpn)
        session.commit()
        return '', 204


class VpnListResource(AbstractVpnResource):
    """
    List resource for the vpn.
    """

    @require_login
    @marshal_with(resource_fields)
    def get(self):
        return list(session.query(Vpn))

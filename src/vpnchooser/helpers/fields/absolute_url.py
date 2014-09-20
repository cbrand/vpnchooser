# -*- encoding: utf-8 -*-

from flask.ext.restful.fields import Url


class AbsoluteUrl(Url):
    def __init__(self, endpoint, absolute=True, scheme=None):
        super(AbsoluteUrl, self).__init__(
            endpoint=endpoint,
            absolute=absolute,
            scheme=scheme,
        )

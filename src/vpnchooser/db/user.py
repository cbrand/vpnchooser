# -*- encoding: utf-8 -*-

from passlib.hash import pbkdf2_sha512

from sqlalchemy.ext.hybrid import hybrid_property

from .database import db


class User(db.Model):
    """
    A user resource to be able to authenticate.
    """

    __tablename__ = 'user'

    name = db.Column(db.Unicode(255), primary_key=True)

    _password = db.Column(db.Unicode(512), nullable=False)

    is_admin = db.Column(db.Boolean, default=False, server_default='false')

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password: str):
        self._password = pbkdf2_sha512.encrypt(password)

    def check(self, password: str) -> bool:
        """
        Checks the given password with the one stored
        in the database
        """
        return pbkdf2_sha512.verify(password, self.password)

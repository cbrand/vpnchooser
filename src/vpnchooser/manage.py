# -*- encoding: utf-8 -*-
"""
Manager for the application.
"""

from getpass import getpass

from flask.ext.script import Manager

from vpnchooser.applicaton import app
from vpnchooser.syncer import sync as do_sync
from vpnchooser.db import db, session, User

manager = Manager(app)


def _init_app(config=None):
    if config is None:
        app.config.from_envvar('FLASK_CONFIG_FILE')
    else:
        app.config.from_pyfile(config)


@manager.command
@manager.option('-c', '--config', dest='config', default=None)
def runserver(config=None):
    _init_app(config)
    app.run()


@manager.command
@manager.option('-c', '--config', dest='config', default=None)
def init_db(config=None):
    _init_app(config)
    db.create_all()

@manager.command
@manager.option('-c', '--config', dest='config', default=None)
def sync(config=None):
    _init_app(config)
    do_sync()
    print("Synchronization complete")

@manager.command
@manager.option('-c', '--config', dest='config', default=None)
@manager.option('-u', '--username', dest='username')
@manager.option('-p', '--password', dest='password')
def create_admin(username, password, config=None):
    _init_app(config)
    user = User()
    user.name = username
    user.password = password
    user.is_admin = True
    user.generate_api_key()
    session.add(user)
    session.commit()

@manager.command
@manager.option('-c', '--config', dest='config', default=None)
@manager.option('-u', '--username', dest='username')
@manager.option('-p', '--password', dest='password', default=None)
def reset_password(username, password=None, config=None):
    _init_app(config)
    user = session.query(User).filter(User.name == username).first()
    if user is None:
        print('User %s not found' % username)
    if password is None:
        password = getpass('Enter new password: ')

    user.password = password
    session.commit()
    print('Password reset done for user %s' % username)

if __name__ == '__main__':
    manager.run()

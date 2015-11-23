FROM python:3.4
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /config
RUN mkdir -p /code
RUN mkdir -p /scripts
RUN mkdir -p /data

WORKDIR /code
RUN pip install --upgrade setuptools
RUN easy_install vpnchooser

ADD docker.cfg /config/vpnchooser.cfg

ENV C_FORCE_ROOT true
ENV FLASK_CONFIG_FILE /config/vpnchooser.cfg

ADD manage.py /code/manage.py

RUN pip install PyMySQL
RUN python manage.py init_db
RUN python manage.py create_admin admin admin
VOLUME ["/data", "/config"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:5000"]

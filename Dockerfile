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
ADD start.sh /code/start.sh
ADD start-celery.sh /code/start.sh
RUN chmod +x /code/start.sh
RUN chmod +x /code/start-celery.sh

RUN pip install PyMySQL
VOLUME ["/data", "/config"]
CMD ["start.sh"]

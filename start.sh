#!/bin/bash

FILE=/config/initialized

if [ ! -f $FILE ]
then
    sleep 10
    python manage.py init_db
    python manage.py create_admin admin admin
    echo 1 > $FILE
fi

python manage.py runserver 0.0.0.0:5000
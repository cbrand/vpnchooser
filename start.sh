#!/bin/bash

FILE=/config/initialized

if [ ! -f $FILE ]
then
    sleep 30
    python manage.py init_db
    python manage.py create_admin admin admin
    echo 1 > $FILE
fi

python manage.py runserver  -h 0.0.0.0 -p 5000

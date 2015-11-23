#!/bin/bash

FILE=/code/initialized

if [ ! -f $FILE ]
then
    sleep 5
    python manage.py init_db
    python manage.py create_admin admin admin
    echo 1 > $FILE
fi

python manage.py runserver 0.0.0.0:5000

#!/bin/bash

FILE=/config/initialized

if [ ! -f $FILE ]
then
    sleep 30
    echo 1 > $FILE
fi

python manage.py runcelery

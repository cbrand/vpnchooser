#!/bin/bash

FILE=/config/initialized

if [ ! -f $FILE ]
then
    sleep 10
    echo 1 > $FILE
fi

python manage.py runcelery

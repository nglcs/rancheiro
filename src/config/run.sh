#!/bin/sh

cd /app/
/usr/sbin/crond -f -l 8 &
npm start 
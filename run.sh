#!/bin/bash
/usr/sbin/crond -f -l 8 &
node /node/src/index.js &
nginx -g 'daemon off;' 

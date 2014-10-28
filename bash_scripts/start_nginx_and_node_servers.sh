#!/bin/bash

# REMOVE DEFAULT
if [ -e "/etc/nginx/sites-enabled/default" ]
then
    echo "REMOVING NGINX DEFAULT FILE"
    rm -rf /etc/nginx/sites-enabled/default
    rm -rf /etc/nginx/sites-available/default
fi

# SYMLINK EXAMPLE FROM AVAILABLE TO ENABLED
if [ -e "/etc/nginx/sites-enabled/example" ]
then
    echo "Example site already exists... moving on."
else
    echo "Symlinking sites..."
    ln -s /etc/nginx/sites-available/example /etc/nginx/sites-enabled/
fi

echo "===================================================================================="
echo "||   ___       ___                                                                ||";
echo "||  |  _|     |_  |    _           _   _                                          ||";
echo "||  | | ___ ___ | |___| |_ ___ ___| |_|_|___ ___    ___ ___ ___ _ _ ___ ___ ___   ||";
echo "||  | ||  _| -_|| |_ -|  _| .'|  _|  _| |   | . |  |_ -| -_|  _| | | -_|  _|_ -|  ||";
echo "||  | ||_| |___|| |___|_| |__,|_| |_| |_|_|_|_  |  |___|___|_|  \_/|___|_| |___|  ||";
echo "||  |___|     |___|                         |___|                                 ||";
echo "||                                                                                ||"
echo "===================================================================================="
echo "      "
echo "      "
sudo service nginx restart
SERVERID=`ps ax | grep node | grep -v grep | awk '{print $1}'`
if [ -z "$SERVERID" ]
then
    echo "starting node server."
else
    echo "already running, killing off and starting fresh!"
    ps ax | grep node | grep -v grep | awk '{print $1}' | xargs sudo kill
fi

forever start --no-colors --sourceDir /var/www/example --watchDirectory /var/www/example --watchIgnore **/*.log --watch server.js

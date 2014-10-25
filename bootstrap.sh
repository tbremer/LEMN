#!/usr/bin/env bash

#lets update everything first.
apt-get -y update

#install base features
apt-get -y install python-software-properties #python g++ make

# then we will add the node repo
add-apt-repository ppa:chris-lea/node.js

# Add Node repo get updated lists and modules
apt-get -y update
apt-get install -y nodejs
npm install --loglevel error -g express
npm install --loglevel error -g ejs
npm install --loglevel error -g forever

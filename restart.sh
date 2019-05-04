#!/bin/bash

git checkout .
git pull

cd /home/root/sites-main
yarn install
yarn dist
cd dist
yarn install --production
yarn stop
yarn start


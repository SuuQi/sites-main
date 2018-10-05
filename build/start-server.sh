#!/bin/bash
cd /home/jenkins_pack/sites-main/
echo "=========start restart server========="
npm install --production
npm run stop
npm start
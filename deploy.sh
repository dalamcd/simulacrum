#!/bin/sh

echo "Switching to branch master"
git checkout master

echo "Building app"
npm run build

echo "Deploying files to server"
rsync -avP build/ dalamcd@170.187.156.238:/var/www/html/simulacrum.com/
echo "Deployment complete"

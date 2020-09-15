npm run build

rsync --delete -za ./dist/ mo@imx.sh:/home/mo/www/
rsync --delete -za ./dist/ at@nightcrickets.space:/home/at/www/yamo

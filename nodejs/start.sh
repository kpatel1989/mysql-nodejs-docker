docker build -t test-nodejs .
docker stop test-nodejs-microservice
docker rm test-nodejs-microservice
docker run -it -d \
    --publish 4000:4000 \
    -e MYSQL_USER='root' \
    -e MYSQL_PASSWORD='admin' \
    -e MYSQL_DATABASE='test1' \
    -e MYSQL_PORT='6603' \
    -e MYSQL_HOST='10.136.162.111' \
    --link test-mysql-microservice:db \
    --name=test-nodejs-microservice test-nodejs
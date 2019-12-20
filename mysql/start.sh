docker build -t test-mysql .
docker stop test-mysql-microservice
docker rm test-mysql-microservice
docker run -it -d \
--publish 6603:3306 \
--volume=/Users/kartik.patel/Documents/kartik/task/mysql-microservice/data:/var/lib/mysql \
--name=test-mysql-microservice test-mysql



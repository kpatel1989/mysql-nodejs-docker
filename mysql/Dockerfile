## Pull the mysql:5.7 image
FROM mysql:5.7

# database = test and password for root = password
ENV MYSQL_DATABASE=test1 \
    MYSQL_ROOT_PASSWORD=admin

# when container will be started, we'll have `test1` database created with this schema
COPY ./test-dump.sql /docker-entrypoint-initdb.d/

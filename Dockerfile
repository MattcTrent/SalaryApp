FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=root

ENV MYSQL_ROOT_PASSWORD=root

ENV MYSQL_DATABASE=salaryapp 

ENV MYSQL_USER=user 
ENV MYSQL_PASSWORD=password

ADD db_entry.sql /docker-entrypoint-initdb.d

EXPOSE 3306

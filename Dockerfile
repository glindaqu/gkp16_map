FROM alpine:latest

WORKDIR /leafletmap

COPY . .

RUN apt update -y \
    apt upgrade -y \
    apt install apache2 -y 

ENTRYPOINT [ "service", "apache2 start" ]

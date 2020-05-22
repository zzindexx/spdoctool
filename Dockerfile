FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY /default.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html
COPY ./website/public .
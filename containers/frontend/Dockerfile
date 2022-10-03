FROM node:18-buster-slim

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

WORKDIR /app

RUN npm update -g npm
RUN apt-get update
RUN apt-get install -y openssl

EXPOSE 3000


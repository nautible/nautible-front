FROM node:14.11.0-alpine3.11

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

# 以下の設定はプロキシ配下で開発する場合に必要
ENV http_proxy $http_proxy
ENV https_proxy $https_proxy
RUN npm -g config set proxy $http_proxy
RUN npm -g config set https-proxy $https_proxy
RUN npm -g config set registry "http://registry.npmjs.org/"

WORKDIR /usr/src/app

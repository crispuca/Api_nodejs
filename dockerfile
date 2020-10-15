FROM node:0.12

RUN npm install -g nodemon

ADD start.sh /bin/start

WORKDIR /app

EXPOSE 3000

ENTRYPOINT ["/bin/start"]
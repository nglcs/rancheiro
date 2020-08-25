# build environment
FROM node:13-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY /reactjs/package.json /app/package.json
RUN npm install 
RUN npm install react-scripts@3.0.1 -g 
COPY ./reactjs/ /app

RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html/diagrama-rancher
COPY /node /node

COPY run.sh run.sh
ADD crontab.txt /crontab.txt
COPY default.conf /etc/nginx/conf.d/default.conf

RUN /usr/bin/crontab /crontab.txt
RUN apk add --update nodejs nodejs-npm
RUN npm --prefix /node/ install /node/
EXPOSE 80

# start app
CMD ["sh","run.sh"]

FROM node:18.14.0 as forbuild
USER root

COPY ./ /app

WORKDIR /app

RUN npm -v
RUN npm install --privilege && npm run build

FROM nginx:1.25.2-alpine3.18-slim

RUN mkdir /app
COPY --from=forbuild /app/dist /app/

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

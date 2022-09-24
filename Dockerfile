FROM node:15.4 as build 
EXPOSE 80
WORKDIR /react-app
COPY package*.jso .
RUN yarn install
COPY . .
RUN yarn run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /react-app/build /usr/share/nginx/html
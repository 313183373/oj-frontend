#Stage 1 build
FROM node as build
COPY package*.json ./
RUN npm install
COPY . ./
RUN REACT_APP_DOCKER=true npm run build

#Stage 2 product
FROM nginx
COPY --from=build build /usr/share/nginx/html
COPY frontend.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

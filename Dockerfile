#Stage 1 build
FROM node as build
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

#Stage 2 product
RUN npm run build
FROM nginx
COPY --from=build build /usr/share/nginx/html
COPY frontend.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

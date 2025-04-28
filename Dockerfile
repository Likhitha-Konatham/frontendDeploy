FROM node

WORKDIR /frontend-app

COPY package*.json ./

RUN npm install

COPY . /frontend-app

RUN npm run build

FROM nginx:alpine

COPY --from=build /frontend-app/build /usr/share/nginx/html

# Expose port 80 for HTTP
EXPOSE 7004

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]




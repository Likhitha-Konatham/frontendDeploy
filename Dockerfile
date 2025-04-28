FROM node:14

WORKDIR /frontend-app

COPY package*.json ./

RUN npm install

COPY . /frontend-app

RUN npm run build

EXPOSE 7004

CMD ["npm", "start"]




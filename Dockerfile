FROM node

WORKDIR /frontend-app

COPY package*.json ./

RUN npm install

COPY . /frontend-app

RUN npm run build

EXPOSE 7005

CMD ["npm", "start"]


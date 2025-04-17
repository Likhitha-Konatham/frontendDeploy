FROM node

WORKDIR /myapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 7004

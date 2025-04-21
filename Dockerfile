FROM node

WORKDIR /myapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 7004

CMD ["npm", "start"]


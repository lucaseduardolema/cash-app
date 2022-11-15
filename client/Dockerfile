FROM node:16

WORKDIR /usr/scr/client

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm start"]
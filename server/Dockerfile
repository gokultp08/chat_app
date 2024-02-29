FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .

RUN npm install dotenv

EXPOSE ${PORT}

ENV NODE_ENV=development

CMD ["node", "-r", "dotenv/config", "server.js"]
FROM node:lts-alpine3.14
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
COPY .env.sandbox /app/.env
RUN npm run build

CMD ["npm","start"]
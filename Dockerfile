FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "src/index.js"]

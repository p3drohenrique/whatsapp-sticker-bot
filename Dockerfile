FROM node:lts-alpine

RUN apk add chromium

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "src/index.js"]
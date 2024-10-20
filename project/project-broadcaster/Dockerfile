FROM --platform=linux/amd64 node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install --package-lock-only
RUN npm ci

COPY . .

CMD ["npm", "start"]
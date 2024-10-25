FROM --platform=linux/amd64 node:alpine

WORKDIR /usr/src/app

ARG PRODUCTION
ENV PRODUCTION=$PRODUCTION

COPY package* ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
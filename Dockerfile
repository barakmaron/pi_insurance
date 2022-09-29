FROM node:lts-alpine
WORKDIR /

COPY ./ .

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]

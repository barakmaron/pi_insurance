FROM node:lts-alpine
WORKDIR /

COPY ./ .

ENV NEXT_PUBLIC_SUPBASE_URL $NEXT_PUBLIC_SUPBASE_URL

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]

FROM node:14.18.2-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3333

ENV TZ=America/Sao_Paulo

CMD ["npm", "run", "start:prod"]
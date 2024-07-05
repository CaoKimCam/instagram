FROM node:20-alpine
WORKDIR /var/www/server
COPY . /var/www/server/
RUN npm install
RUN npm run build
CMD ["npm","run","start:dev"]
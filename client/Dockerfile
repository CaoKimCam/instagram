FROM node:latest AS builder

#thiết lập thư mục làm việc
WORKDIR /app

#copy package.json, package-lock.json vào thư mục làm việc
COPY package*.json ./

#cài đặt các dependencies
RUN npm install

#sao chép các tệp còn lại vào thư mục làm việc
COPY . .

#Build ứng dụng
RUN npm run build

#Sử dụng nginx image để serve ứng dụng đã build
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
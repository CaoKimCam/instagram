# Sử dụng image node với phiên bản cụ thể
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép mã nguồn vào thư mục làm việc
COPY . .

# Chạy lệnh chown để đảm bảo quyền sở hữu của thư mục làm việc
# RUN chown -Rh node:node /var/www/client

# Đổi user sang node để chạy các lệnh sau với quyền hạn tối thiểu
# USER node

# Cài đặt các dependencies từ file package.json và package-lock.json
RUN npm install

# Thông báo rằng container sẽ lắng nghe trên cổng 80
EXPOSE 80

# Lệnh để khởi động ứng dụng
CMD ["npm","start"]
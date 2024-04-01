# instagram-backend

instagram-backend

# Folder video: https://www.youtube.com/watch?v=UhihFdEIkmc&list=PLnRJxWEhhmzriVI5YiYI01O4cSzR5AHH_&index=8

1. Set up

- Create a new instance
- Hot reload
- Chạy chương trình:
  npm run start:dev

2. Module

- Create a new module: tạo tay hoặc tạo = lệnh (controller, module, service)

* 1 module gổm 3 tp chính:

- Module:
- Controller: các phương thức GET,PUT,POST,DELETE... Vai trò: nhận request từ client về server, và response data (data này lấy từ service) từ server về client
- Service:

3. Provider (file service)

- Trong controller khởi tạo đối tượng productService, đối tượng này sẽ chấm tới method của nó trong controller.

4. Response data

- Trạng thái status code,... để response data

5. Get Product List

- Tạo danh sách các product và get product từ response đã tạo

6. Get Detail Product

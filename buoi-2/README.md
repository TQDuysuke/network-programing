# Buổi 2: Server Node.js đơn giản

## Mô tả
- Tạo một server Node.js đơn giản sử dụng Express.
- Server đọc và cập nhật dữ liệu từ file `data.json`.

## Chức năng chính
1. Đọc dữ liệu từ file `data.json`.
2. Cập nhật dữ liệu vào file `data.json`.

## Công nghệ sử dụng
- Node.js
- Express
- File System (fs)
- Path

## Hướng dẫn chạy
1. Cài đặt các package cần thiết:
   ```cmd
   npm install
   ```
2. Chạy server:
   ```cmd
   node server.js
   ```
3. Truy cập server tại địa chỉ: `http://localhost:3000`.

## Hướng dẫn test API với Postman

### 1. Cài đặt Postman
- Tải và cài đặt Postman từ [trang chủ Postman](https://www.postman.com/).

### 2. Test API
#### a. Test GET
1. Mở Postman và tạo một request mới.
2. Chọn phương thức `GET`.
3. Nhập URL: `http://localhost:3000`.
4. Nhấn `Send` để gửi request.
5. Kiểm tra phản hồi từ server trong tab `Body`.

#### b. Test POST
1. Mở Postman và tạo một request mới.
2. Chọn phương thức `POST`.
3. Nhập URL: `http://localhost:3000`.
4. Chuyển sang tab `Body` và chọn `raw`.
5. Chọn định dạng `JSON` và nhập nội dung:
   ```json
   {
     "temperature": 25,
     "humidity": 60
   }
   ```
6. Nhấn `Send` để gửi request.
7. Kiểm tra phản hồi từ server trong tab `Body`.

### 3. Lưu ý
- Đảm bảo server đang chạy trước khi gửi request.
- Kiểm tra cổng và địa chỉ IP nếu không nhận được phản hồi.

# Buổi 3: Server nhận dữ liệu từ ESP32

## Mô tả
- Server nhận dữ liệu từ ESP32.
- Xác thực API key và UID.
- Lưu dữ liệu vào file `data.json`.

## Chức năng chính
1. POST `/data`: ESP32 gửi dữ liệu cảm biến, server lưu vào `data.json`.
2. GET `/data`: Lấy dữ liệu cảm biến hiện tại.

## Công nghệ sử dụng
- Node.js
- Express
- File System (fs)
- Path
- Middleware kiểm tra API key và UID (import từ `api.js`)

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
#### a. Test GET `/data`
1. Mở Postman và tạo một request mới.
2. Chọn phương thức `GET`.
3. Nhập URL: `http://localhost:3000/data`.
4. Nhấn `Send` để gửi request.
5. Kiểm tra phản hồi từ server trong tab `Body`.

#### b. Test POST `/data`
1. Mở Postman và tạo một request mới.
2. Chọn phương thức `POST`.
3. Nhập URL: `http://localhost:3000/data`.
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

## Placeholder cho hình ảnh
- Hình 1: Sơ đồ luồng dữ liệu giữa ESP32 và server.
- Hình 2: Giao diện Postman gửi request POST `/data`.
- Hình 3: Giao diện Postman gửi request GET `/data`.

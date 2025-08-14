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

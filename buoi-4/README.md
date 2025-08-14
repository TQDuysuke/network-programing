# Buổi 4: Server nhận dữ liệu cảm biến từ ESP32

## Mô tả
- Server nhận dữ liệu cảm biến từ ESP32.
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

## Giải thích chi tiết mã nguồn

### 1. Import các thư viện và module cần thiết
```javascript
const { checkApiKey, checkUid } = require('./api');
const express = require('express');
const fs = require('fs');
const path = require('path');
```
- `checkApiKey` và `checkUid`: Middleware để xác thực API key và UID.
- `express`: Framework để tạo server.
- `fs`: Module để làm việc với file hệ thống.
- `path`: Module để xử lý đường dẫn file.

### 2. Định nghĩa đường dẫn tới file dữ liệu
```javascript
const dataPath = path.join(__dirname, 'data.json');
```
- `dataPath`: Đường dẫn tuyệt đối tới file `data.json` để lưu trữ dữ liệu.

### 3. Hàm đọc và ghi dữ liệu
```javascript
function readData() {
  if (!fs.existsSync(dataPath)) return { esp32: {} };
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}
```
- `readData()`: Đọc dữ liệu từ file `data.json`. Nếu file không tồn tại, trả về một object rỗng.
- `writeData(data)`: Ghi dữ liệu vào file `data.json` với định dạng JSON.

### 4. Định nghĩa các API endpoint
#### POST `/data`
```javascript
app.post('/data', checkApiKey, checkUid, (req, res) => {
  const data = readData();
  data.esp32 = req.body;
  writeData(data);
  console.log('Received from ESP32:', req.body, 'UID:', req.headers['uid']);
  res.json({ status: 'OK', received: req.body });
});
```
- Nhận dữ liệu từ ESP32 qua body của request.
- Lưu dữ liệu vào `data.json`.
- Gửi phản hồi xác nhận đã nhận dữ liệu.

#### GET `/data`
```javascript
app.get('/data', checkApiKey, (req, res) => {
  const data = readData();
  res.json(data.esp32);
});
```
- Trả về dữ liệu cảm biến hiện tại từ `data.json`.

### 5. Khởi động server
```javascript
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```
- Server lắng nghe tại cổng 3000.

## Placeholder cho hình ảnh
- Hình 1: Sơ đồ luồng dữ liệu giữa ESP32 và server.
- Hình 2: Ví dụ cấu trúc file `data.json` sau khi lưu dữ liệu.
- Hình 3: Giao diện Postman gửi request POST `/data`.
- Hình 4: Giao diện Postman gửi request GET `/data`.

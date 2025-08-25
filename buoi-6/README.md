# Bài 6 - API + ESP32 + Ví dụ server

Mô tả:
- Thư mục chứa `server.js`, `api.js`, `data.json`, và `esp32_code.ino`.
- Mục tiêu: server Express trả dữ liệu từ `data.json` và nhận dữ liệu từ ESP32.

Yêu cầu:
- Node.js (>= 14) và npm
- Arduino IDE/PlatformIO cho ESP32

Cài đặt nhanh (Node):
1. Mở terminal tại thư mục này.
2. `npm init -y`
3. `npm install express`

Chạy server:
- `node server.js`

Ghi chú:
- Nếu muốn, chỉnh `server.js` để dùng `express.json()` và route POST để nhận dữ liệu từ ESP32.

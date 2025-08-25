# Bài 4 - API + Client + ESP32

Mô tả:
- Thư mục chứa `server.js`, `api.js`, `client.js`, `data.json` và mã `esp32_code.ino`.
- Mục tiêu: minh hoạ server API (Express) và client (Node) giao tiếp, cùng ví dụ code cho ESP32.

Yêu cầu:
- Node.js (>= 14), npm
- Arduino IDE hoặc PlatformIO để nạp `esp32_code.ino`

Cài đặt nhanh (Node):
1. Mở terminal tại thư mục này.
2. `npm init -y`
3. `npm install express`

Chạy server:
- `node server.js`

Ghi chú ESP32:
- Mở `esp32_code.ino` trong Arduino IDE, chọn board ESP32 phù hợp, nạp chương trình.

# ------------------------------------------------------------
# Code thuộc bản quyền Phòng thí nghiệm PLC & IIoT
# Trường Đại học Cần Thơ
# ------------------------------------------------------------
# Buổi 6: Quản lý multi-client nâng cao

## Mục tiêu
- Server quản lý nhiều client (user, esp32) cùng lúc, mỗi client có API key và UID riêng biệt.
- User có thể điều khiển từng ESP32 qua UID, các client ESP32 gửi dữ liệu cảm biến và nhận lệnh điều khiển độc lập.
- Các client có thể tương tác với nhau thông qua server.


## Nội dung
1. Thiết kế API phân biệt client qua UID, mỗi client có API key riêng (khuyến khích tạo nhiều API key cho user/esp32)
   - [ ] Ảnh: Code API ![placeholder](images/api-code.png)
   - [ ] Ảnh: File data.json ![placeholder](images/data-json.png)
   - Server sẽ tự động tạo client mới nếu UID chưa tồn tại (có thể dùng cho demo hoặc phát triển nhanh, muốn bảo mật hơn thì cần kiểm tra UID hợp lệ).
2. Lưu trạng thái cảm biến và lệnh điều khiển riêng biệt cho từng UID
   - [ ] Ảnh: Log trạng thái ![placeholder](images/status-log.png)
   - Dữ liệu cảm biến lưu tại clients[uid].sensor, lệnh điều khiển lưu tại commands[uid].
3. User gửi lệnh điều khiển tới ESP32 qua UID, ESP32 lấy lệnh và gửi dữ liệu cảm biến về server
   - [ ] Ảnh: Giao diện kiểm thử ![placeholder](images/postman-multi.png)
   - User gửi POST /command/:id, ESP32 gửi POST /data/:id và GET /command/:id.
4. Các client có thể lấy trạng thái cảm biến của nhau qua API
   - GET /data/:id hoặc GET /status.

## Ví dụ request
```http
# ESP32 gửi dữ liệu cảm biến
POST http://localhost:3000/data/esp32_01
Content-Type: application/json
x-api-key: <api_key_esp32_01>
uid: esp32_01
{
  "temp": 30,
  "humi": 60
}

# User gửi lệnh điều khiển cho ESP32
POST http://localhost:3000/command/esp32_01
Content-Type: application/json
x-api-key: <api_key_user>
uid: user_01
{
  "led": "on"
}

# ESP32 lấy lệnh điều khiển của mình
GET http://localhost:3000/command/esp32_01
x-api-key: <api_key_esp32_01>
uid: esp32_01

# User hoặc client khác lấy trạng thái cảm biến của ESP32
GET http://localhost:3000/data/esp32_01
x-api-key: <api_key_user>
uid: user_01

# Xem trạng thái cảm biến của tất cả client
GET http://localhost:3000/status
x-api-key: <api_key_user>
uid: user_01
```

## Yêu cầu
- Chụp ảnh từng bước thực hiện và dán vào các vị trí placeholder.

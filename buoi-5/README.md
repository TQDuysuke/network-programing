# Buổi 5: Ứng dụng điều khiển từ server

> Được tạo bởi Phòng thí nghiệm PLC & IIoT - Trường Đại học Cần Thơ

# ------------------------------------------------------------
# Code thuộc bản quyền Phòng thí nghiệm PLC & IIoT
# Trường Đại học Cần Thơ
# ------------------------------------------------------------
# Buổi 5: Ứng dụng điều khiển từ server


## Mục tiêu
- Server gửi lệnh điều khiển về cho ESP32, lưu lệnh vào file data.json.
- ESP32 vừa gửi dữ liệu cảm biến, vừa nhận lệnh điều khiển từ server.


## Nội dung
1. Tạo API nhận lệnh điều khiển từ client (Postman) và lưu vào data.json
   - [ ] Ảnh: Code API ![placeholder](images/api-code.png)
   - [ ] Ảnh: File data.json ![placeholder](images/data-json.png)
2. ESP32 gửi dữ liệu cảm biến lên server (POST /data), nhận lệnh điều khiển (GET /command)
   - [ ] Ảnh: ESP32 nhận lệnh ![placeholder](images/esp32-receive.png)
3. Thực hiện điều khiển thiết bị dựa trên lệnh nhận được
   - [ ] Ảnh: Thiết bị được điều khiển ![placeholder](images/device-control.png)


## Ví dụ request
### Gửi dữ liệu cảm biến
```http
POST http://localhost:3000/data
Content-Type: application/json
x-api-key: 123456
uid: esp32_01
{
   "temp": 30,
   "humi": 60
}
```

### Gửi lệnh điều khiển
```http
POST http://localhost:3000/command
Content-Type: application/json
x-api-key: 123456
uid: user_01
{
   "led": "on"
}
```

### ESP32 lấy lệnh điều khiển
```http
GET http://localhost:3000/command
x-api-key: 123456
uid: esp32_01
```


## Yêu cầu
- Chụp ảnh từng bước thực hiện và dán vào các vị trí placeholder.
- Thử gửi lệnh điều khiển và kiểm tra trạng thái thiết bị.

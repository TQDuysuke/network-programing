# ------------------------------------------------------------
# Code thuộc bản quyền Phòng thí nghiệm PLC & IIoT
# Trường Đại học Cần Thơ
# ------------------------------------------------------------
# Buổi 3: Server giao tiếp với MCU (ESP32)

## Mục tiêu
- Server nhận dữ liệu từ ESP32 (Arduino framework), lưu vào file data.json.
- Làm quen với bảo mật API: API key, header, UID.
- Hiểu cách xác thực client, phân biệt thiết bị qua UID, và kiểm thử bảo mật bằng Postman.


## Nội dung
1. Viết API nhận dữ liệu POST và lưu vào data.json
   - [ ] Ảnh: Code API ![placeholder](images/api-code.png)
   - [ ] Ảnh: File data.json ![placeholder](images/data-json.png)
2. Thêm kiểm tra API key trong header để bảo vệ API
   - [ ] Ảnh: Cấu hình API key ![placeholder](images/api-key.png)
   - API key là chuỗi bí mật, chỉ client hợp lệ mới gửi được dữ liệu.
3. ESP32 gửi dữ liệu lên server, kèm header API key và UID
   - [ ] Ảnh: ESP32 gửi dữ liệu ![placeholder](images/esp32-send.png)
   - UID là mã định danh riêng cho từng thiết bị, gửi trong header hoặc body.
4. Server log dữ liệu nhận được, kiểm tra đúng API key và UID
   - [ ] Ảnh: Log dữ liệu ![placeholder](images/server-log.png)
   - Nếu API key hoặc UID sai, server sẽ trả về lỗi 401/403.


## Ví dụ request
### Gửi dữ liệu cảm biến từ ESP32 lên server
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

### Lấy dữ liệu cảm biến từ server
```http
GET http://localhost:3000/data
x-api-key: 123456
```


## Hướng dẫn bảo mật cơ bản
- Tạo một API key (ví dụ: 123456) lưu ở server, chỉ client hợp lệ mới gửi được dữ liệu.
- Mỗi thiết bị (ESP32) nên có UID riêng, gửi kèm trong header hoặc body.
- Server kiểm tra API key và UID trước khi xử lý dữ liệu.
- Không chia sẻ API key công khai.
- Có thể mở rộng kiểm tra UID hợp lệ nếu muốn bảo mật hơn.

## Yêu cầu
- Chụp ảnh từng bước thực hiện và dán vào các vị trí placeholder.
- Thử cố tình gửi sai API key hoặc UID để kiểm tra bảo mật.

# Buổi 6: Server quản lý multi-client

## Mô tả
- Server quản lý nhiều client.
- Lưu dữ liệu và lệnh điều khiển từ các client vào file `data.json`.

## Chức năng chính
1. POST `/data/{uid}`: Client gửi dữ liệu cảm biến, server lưu vào `data.json`.
2. POST `/command{uid}`: Client gửi lệnh điều khiển, server lưu vào `data.json`.
3. GET `/data{uid}`: Lấy dữ liệu cảm biến hiện tại.
4. GET `/command{uid}`: Lấy lệnh điều khiển hiện tại.

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

## Giải thích chi tiết mã nguồn server
...existing code...

## Giải thích chi tiết mã nguồn ESP32

### 1. Kết nối WiFi
```cpp
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
WiFi.begin(ssid, password);
while (WiFi.status() != WL_CONNECTED) {
  delay(1000);
  Serial.println("Connecting to WiFi...");
}
Serial.println("Connected to WiFi");
```
- `ssid` và `password`: Thông tin mạng WiFi cần kết nối.
- `WiFi.begin`: Bắt đầu kết nối WiFi.
- `WL_CONNECTED`: Kiểm tra trạng thái kết nối.

### 2. Gửi dữ liệu cảm biến
```cpp
HTTPClient http;
http.begin(serverDataUrl);
http.addHeader("Content-Type", "application/json");
http.addHeader("apiKey", apiKey);
http.addHeader("uid", uid);
int httpResponseCode = http.POST("{\"temperature\": 25}");
http.end();
```
- `serverDataUrl`: URL của server để gửi dữ liệu.
- `http.POST`: Gửi dữ liệu cảm biến dưới dạng JSON.

### 3. Nhận lệnh điều khiển
```cpp
http.begin(serverCmdUrl);
http.addHeader("apiKey", apiKey);
http.addHeader("uid", uid);
int httpResponseCode = http.GET();
if (httpResponseCode > 0) {
  String payload = http.getString();
  Serial.println(payload);
}
http.end();
```
- `serverCmdUrl`: URL của server để nhận lệnh điều khiển.
- `http.GET`: Lấy lệnh điều khiển từ server.

## Placeholder cho hình ảnh
- Hình 1: Sơ đồ kết nối ESP32 với server.
- Hình 2: Giao diện Postman gửi request POST `/data`.
- Hình 3: Giao diện Postman gửi request GET `/command`.

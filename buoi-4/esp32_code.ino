// ------------------------------------------------------------
// Được tạo bởi Phòng thí nghiệm PLC & IIoT - Trường Đại học Cần Thơ
// ------------------------------------------------------------

// ESP32 gửi dữ liệu cảm biến lên server, kèm API key và UID
// Đổi ssid, password, serverUrl, apiKey, uid cho phù hợp
// esp32_code.ino - Gửi dữ liệu cảm biến lên server có xác thực API key và UID
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverUrl = "http://YOUR_PC_IP:3000/data"; // Đổi YOUR_PC_IP thành IP máy chạy server

const char* apiKey = "123456";
const char* uid = "esp32_01";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("x-api-key", apiKey);
    http.addHeader("uid", uid);

    // Giả lập dữ liệu cảm biến
    int temp = random(25, 35);
    int humi = random(50, 70);
    String json = "{\"temp\":" + String(temp) + ",\"humi\":" + String(humi) + "}";

    int httpResponseCode = http.POST(json);
    Serial.print("POST response: ");
    Serial.println(httpResponseCode);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(response);
    }
    http.end();
  }
  delay(10000); // Gửi mỗi 10 giây
}

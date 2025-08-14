// ------------------------------------------------------------
// Được tạo bởi Phòng thí nghiệm PLC & IIoT - Trường Đại học Cần Thơ
// ------------------------------------------------------------

// ESP32 gửi dữ liệu cảm biến và nhận lệnh điều khiển theo UID
// Đổi ssid, password, serverBase, apiKey, uid cho phù hợp
// esp32_code.ino - ESP32 gửi dữ liệu cảm biến và nhận lệnh điều khiển theo UID (bài 6)
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* uid = "esp32_01"; // Đổi thành esp32_02 cho thiết bị khác
const char* apiKey = "123456"; // Đổi cho từng thiết bị nếu cần

// Đổi YOUR_PC_IP thành IP máy chạy server
String serverBase = "http://YOUR_PC_IP:3000";
String serverDataUrl = serverBase + "/data/" + uid;
String serverCmdUrl = serverBase + "/command/" + uid;

void setup() {
  Serial.begin(115200);
  pinMode(8, OUTPUT);
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
    // 1. Gửi dữ liệu cảm biến lên server (theo UID)
    HTTPClient http;
    http.begin(serverDataUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("x-api-key", apiKey);
    http.addHeader("uid", uid);
    int temp = random(25, 35);
    int humi = random(50, 70);
    String json = "{\"temp\":" + String(temp) + ",\"humi\":" + String(humi) + "}";
    int httpResponseCode = http.POST(json);
    Serial.print("POST data response: ");
    Serial.println(httpResponseCode);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(response);
    }
    http.end();

    // 2. Lấy lệnh điều khiển của chính mình
    HTTPClient httpCmd;
    httpCmd.begin(serverCmdUrl);
    httpCmd.addHeader("x-api-key", apiKey);
    httpCmd.addHeader("uid", uid);
    int cmdResponseCode = httpCmd.GET();
    Serial.print("GET command response: ");
    Serial.println(cmdResponseCode);
    if (cmdResponseCode > 0) {
      String cmdJson = httpCmd.getString();
      Serial.print("Command from server: ");
      Serial.println(cmdJson);
      // Giả sử lệnh dạng {"led":"on"} hoặc {"led":"off"}
      int ledOn = cmdJson.indexOf("\"led\":\"on\"") > 0;
      int ledOff = cmdJson.indexOf("\"led\":\"off\"") > 0;
      if (ledOn) { digitalWrite(8, HIGH); }
      else if (ledOff) { digitalWrite(8, LOW); }
    }
    httpCmd.end();
  }
  delay(10000); // Lặp lại mỗi 10 giây
}

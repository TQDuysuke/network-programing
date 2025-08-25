// ------------------------------------------------------------
// Được tạo bởi Phòng thí nghiệm PLC & IIoT - Trường Đại học Cần Thơ
// ------------------------------------------------------------

// Server nhận dữ liệu từ ESP32, xác thực API key và UID
// Lưu dữ liệu vào data.json, chỉ chấp nhận client hợp lệ

// Middleware kiểm tra API key và UID được import từ ./api.js
// POST /data: ESP32 gửi dữ liệu cảm biến, server lưu vào data.json
// GET /data: Lấy dữ liệu cảm biến hiện tại
// ------------------------------------------------------------
// Code thuộc bản quyền Phòng thí nghiệm PLC & IIoT
// Trường Đại học Cần Thơ
// ------------------------------------------------------------
// Buổi 3: Server nhận dữ liệu từ ESP32
const express = require('express');
const fs = require('fs');
const path = require('path');
const { checkApiKey, checkUid } = require('./api');
const app = express();
const port = 3000;

const dataPath = path.join(__dirname, 'data.json');

app.use(express.json());

function readData() {
  if (!fs.existsSync(dataPath)) return { esp32: {} };
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Áp dụng kiểm tra API key và UID cho các route cần bảo vệ
app.post('/data', checkApiKey, checkUid, (req, res) => {
  const data = readData();
  data.esp32 = req.body;
  writeData(data);
  console.log('Received from ESP32:', req.body, 'UID:', req.headers['uid']);
  res.json({ status: 'OK', received: req.body });
});

app.get('/data', checkApiKey, (req, res) => {
  const data = readData();
  res.json(data.esp32);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

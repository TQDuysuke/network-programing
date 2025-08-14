// ------------------------------------------------------------
// Được tạo bởi Phòng thí nghiệm PLC & IIoT - Trường Đại học Cần Thơ
// ------------------------------------------------------------

// Server nhận dữ liệu cảm biến từ ESP32, xác thực API key và UID
// Lưu dữ liệu vào data.json, chỉ chấp nhận client hợp lệ
const { checkApiKey, checkUid } = require('./api');
const express = require('express');
const fs = require('fs');
const path = require('path');
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

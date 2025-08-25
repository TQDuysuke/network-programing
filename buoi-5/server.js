// ------------------------------------------------------------
// Được tạo bởi Phòng thí nghiệm PLC & IIoT - Trường Đại học Cần Thơ
// ------------------------------------------------------------

// Server nhận dữ liệu cảm biến và lệnh điều khiển từ ESP32/user
// Lưu dữ liệu vào data.json, xác thực API key và UID
// Buổi 5: Server gửi lệnh điều khiển cho ESP32
const express = require('express');
const fs = require('fs');
const path = require('path');
const { checkApiKey, checkUid } = require('./api');
const app = express();
const port = 3000;

const dataPath = path.join(__dirname, 'data.json');

app.use(express.json());

function readData() {
  if (!fs.existsSync(dataPath)) return { sensor: null, command: null };
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Nhận dữ liệu cảm biến từ ESP32
app.post('/data', checkApiKey, checkUid, (req, res) => {
  const data = readData();
  data.sensor = req.body;
  writeData(data);
  console.log('Received sensor data:', req.body, 'UID:', req.headers['uid']);
  res.json({ status: 'Sensor data received', received: req.body });
});

// Nhận lệnh điều khiển từ client (Postman)
app.post('/command', checkApiKey, checkUid, (req, res) => {
  const data = readData();
  data.command = req.body;
  writeData(data);
  console.log('Received command:', req.body, 'UID:', req.headers['uid']);
  res.json({ status: 'Command received', command: req.body });
});

// ESP32 lấy lệnh điều khiển
app.get('/command', checkApiKey, checkUid, (req, res) => {
  const data = readData();
  const command = data.command;
  // Không reset command về null, giữ trạng thái điều khiển
  res.json({ command });
});

// Xem dữ liệu cảm biến hiện tại
app.get('/data', checkApiKey, (req, res) => {
  const data = readData();
  res.json(data.sensor);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

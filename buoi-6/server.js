// ------------------------------------------------------------
// Được tạo bởi Phòng thí nghiệm PLC & IIoT - Trường Đại học Cần Thơ
// ------------------------------------------------------------

// Server quản lý nhiều client ESP32 qua UID
// Buổi 6: Quản lý nhiều Client

const express = require('express');
const fs = require('fs');
const path = require('path');
const { checkApiKey, checkUid } = require('./api');
const app = express();
const port = 3000;

const dataPath = path.join(__dirname, 'data.json');
app.use(express.json());

// Đọc/Ghi dữ liệu
function readData() {
  if (!fs.existsSync(dataPath)) return { clients: {} };
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// ESP32 gửi dữ liệu cảm biến
app.post('/data', checkApiKey, checkUid, (req, res) => {
  const uid = req.headers['uid'];
  const data = readData();
  if (!data.clients[uid]) {
    data.clients[uid] = { sensor: {}, command: {} };
  }
  data.clients[uid].sensor = req.body;
  writeData(data);
  console.log(`Received sensor data from ${uid}:`, req.body);
  res.json({ status: 'Sensor data saved', uid, data: req.body });
});

// ESP32 lấy lệnh điều khiển
app.get('/command', checkApiKey, checkUid, (req, res) => {
  const uid = req.headers['uid'];
  const data = readData();
  const client = data.clients[uid] || { command: {} };
  res.json(client.command);
});

// Client (Postman) gửi lệnh điều khiển
app.post('/command', checkApiKey, checkUid, (req, res) => {
  const uid = req.headers['uid'];
  const data = readData();
  if (!data.clients[uid]) {
    data.clients[uid] = { sensor: {}, command: {} };
  }
  data.clients[uid].command = req.body;
  writeData(data);
  console.log(`Set command for ${uid}:`, req.body);
  res.json({ status: 'Command updated', uid, command: req.body });
});

// Xem toàn bộ dữ liệu nhiều client
app.get('/all', checkApiKey, (req, res) => {
  const data = readData();
  res.json(data.clients);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// ------------------------------------------------------------
// Code thuộc bản quyền Phòng thí nghiệm PLC & IIoT
// Trường Đại học Sư phạm Kỹ thuật TP.HCM
// ------------------------------------------------------------

// Buổi 6: Server quản lý multi-client
const express = require('express');
const fs = require('fs');
const path = require('path');
const { checkApiKey, checkUid } = require('./api');
const app = express();
const port = 3000;

const dataPath = path.join(__dirname, 'data.json');

app.use(express.json());

function readData() {
  if (!fs.existsSync(dataPath)) return { clients: {}, commands: {} };
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Nhận dữ liệu cảm biến từ ESP32 (theo UID)
// ESP32 gửi POST /data/:id với dữ liệu cảm biến, server lưu vào clients[id].sensor
app.post('/data/:id', checkApiKey, checkUid, (req, res) => {
  const id = req.params.id;
  const data = readData();
  if (!data.clients[id]) data.clients[id] = {};
  data.clients[id].sensor = req.body;
  writeData(data);
  console.log(`Received sensor from ${id}:`, req.body, 'UID:', req.headers['uid']);
  res.json({ status: 'Sensor data received', id, received: req.body });
});

// Nhận lệnh điều khiển cho ESP32 (theo UID), cho phép user gửi lệnh tới esp32
// User gửi POST /command/:id với lệnh điều khiển, server lưu vào commands[id]
app.post('/command/:id', checkApiKey, checkUid, (req, res) => {
  const id = req.params.id;
  const data = readData();
  data.commands[id] = req.body;
  writeData(data);
  console.log(`Set command for ${id}:`, req.body, 'By UID:', req.headers['uid']);
  res.json({ status: 'Command set', id });
});

// ESP32 lấy lệnh điều khiển của chính nó
// ESP32 gửi GET /command/:id để lấy lệnh điều khiển, server trả về commands[id]
app.get('/command/:id', checkApiKey, checkUid, (req, res) => {
  const id = req.params.id;
  const data = readData();
  const cmd = data.commands[id] || null;
  // Không reset command để client khác có thể kiểm tra trạng thái
  res.json({ command: cmd });
});

// Xem trạng thái cảm biến của tất cả client
// GET /status trả về toàn bộ trạng thái cảm biến của các client
app.get('/status', checkApiKey, (req, res) => {
  const data = readData();
  res.json(data.clients);
});

// Cho phép user lấy trạng thái cảm biến của từng ESP32
// GET /data/:id trả về trạng thái cảm biến của client có UID tương ứng
app.get('/data/:id', checkApiKey, (req, res) => {
  const id = req.params.id;
  const data = readData();
  res.json(data.clients[id]?.sensor || null);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

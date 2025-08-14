// ------------------------------------------------------------
// Được tạo bởi Phòng thí nghiệm PLC & IIoT - Trường Đại học Cần Thơ
// ------------------------------------------------------------

// Server Node.js đơn giản, trả về và cập nhật dữ liệu trong data.json
// Sử dụng Express, fs, path
// Buổi 2: Server Node.js đơn giản
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const dataPath = path.join(__dirname, 'data.json');

app.use(express.json());

// Đọc dữ liệu từ file
function readData() {
  if (!fs.existsSync(dataPath)) return {};
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

// Ghi dữ liệu ra file
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

app.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/', (req, res) => {
  const data = req.body;
  writeData(data);
  res.json({ status: 'Data updated', data });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

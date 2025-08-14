// api.js - Quản lý xác thực API key và UID cho server buổi 6

const VALID_API_KEY = '123456'; // Đổi giá trị này để tăng bảo mật
const VALID_UIDS = ['esp32_01', 'esp32_02']; // Thêm UID hợp lệ tại đây

function checkApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== VALID_API_KEY) {
    return res.status(401).json({ error: 'API key không hợp lệ!' });
  }
  next();
}

function checkUid(req, res, next) {
  const uid = req.headers['uid'];
  if (!VALID_UIDS.includes(uid)) {
    return res.status(403).json({ error: 'UID không hợp lệ hoặc chưa đăng ký!' });
  }
  next();
}

module.exports = { checkApiKey, checkUid };

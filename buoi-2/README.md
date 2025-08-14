# Buổi 2: Xây dựng server Node.js đơn giản

> Được tạo bởi Phòng thí nghiệm PLC & IIoT - Trường Đại học Cần Thơ

# ------------------------------------------------------------
# Code thuộc bản quyền Phòng thí nghiệm PLC & IIoT
# Trường Đại học Cần Thơ
# ------------------------------------------------------------
# Buổi 2: Xây dựng server Node.js đơn giản


## Mục tiêu
- Hiểu mô hình client-server, tạo server HTTP cơ bản, lưu dữ liệu vào file data.json.
- Làm quen với Express, thao tác file JSON, kiểm thử API bằng Postman.


## Nội dung
1. Tạo project Node.js, cài đặt Express
   - Khởi tạo thư mục, chạy `npm init`, cài đặt express (`npm install express`).
   - [ ] Ảnh: Khởi tạo project ![placeholder](images/init-project.png)
2. Viết server đọc/ghi dữ liệu từ file data.json
   - Server trả về dữ liệu từ file data.json khi GET, cập nhật khi POST.
   - [ ] Ảnh: Chạy server thành công ![placeholder](images/server-running.png)
   - [ ] Ảnh: File data.json ![placeholder](images/data-json.png)
3. Kiểm thử với Postman:
   - Gửi GET để xem dữ liệu hiện tại
   - Gửi POST để cập nhật dữ liệu mới
   - [ ] Ảnh: Gửi request bằng Postman ![placeholder](images/postman-test.png)


## Ví dụ request
### Lấy dữ liệu hiện tại
```http
GET http://localhost:3000/
```

### Cập nhật dữ liệu mới
```http
POST http://localhost:3000/
Content-Type: application/json
{
   "message": "Nội dung mới"
}
```


## Yêu cầu
- Chụp ảnh từng bước thực hiện và dán vào các vị trí placeholder.
- Thử thay đổi dữ liệu và kiểm tra lại bằng GET.

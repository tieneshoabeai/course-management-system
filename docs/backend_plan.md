Sau khi đã hoàn thành xong phần 1 và phần 2 trong flow_plan_overview. Mỗi team sẽ hoàn thành các công việc sau đây:

## 1. Khởi tạo & Tiêu chuẩn hóa (Scaffolding & Linting)
- Khởi tạo dự án NestJS (`nest new`) làm bộ khung chuẩn.
- Lựa chọn kiến trúc cho backend (hexagonal or microservices) 
- Cấu hình ESLint, Prettier và Husky (tự động chặn commit nếu code sai định dạng) (nếu cần).
- Phân tách cấu trúc mã nguồn theo hướng Domain-Driven Design (Ví dụ: tách biệt hoàn toàn module Auth, Student, Course, Enrollment).

## 2. Quản lý Cơ sở dữ liệu (Database & Migration)
- Cài đặt và cấu hình thư viện ORM (Prisma hoặc TypeORM).
- Viết các file Database Migration để tự động hóa việc tạo bảng SQL từ bản vẽ ERD (Bảng Users, Courses, Classes, Enrollments).
- Viết script Seeder tự động đổ dữ liệu mẫu (10.000 user và 500 môn học giả) để tạo lập môi trường test ngay lập tức.

## 3. Thiết lập Kết nối Lõi (Core Infrastructure)
- Đọc và nạp các biến từ file `.env` cục bộ.
- Thiết lập kết nối an toàn với PostgreSQL.
- Thiết lập kết nối Redis: Cấu hình Rate Limiting để chặn spam API trong đợt đăng ký tín chỉ.
- Thiết lập kết nối RabbitMQ: Cấu hình các cơ chế Producer (Gửi yêu cầu đăng ký) và Consumer (Xử lý hàng đợi).

## 4. Phát triển Logic Nghiệp vụ (Business Logic)
- Xây dựng API Xác thực (Đăng nhập/Đăng xuất), có tính toán giao tiếp với AI Service.
- Xây dựng API Tra cứu môn học (Tích hợp Redis cache để tăng tốc truy xuất).
- Xây dựng luồng Đăng ký học phần (Đẩy message vào RabbitMQ, xử lý thuật toán khóa dữ liệu chống Overbooking).
- Viết Unit Test cho các logic tính toán nghiệp vụ lõi để đảm bảo không sai lệch dữ liệu tài chính/tín chỉ.

## 5. Xây dựng bảo mật cho hệ thống (Security System)
- SHA-256
- AES-256
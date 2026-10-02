# Hệ Thống Quản Lý Học Phần Đại Học (Course Management System)

## 1. Tổng Quan Dự Án (Project Overview)
Hệ thống Quản lý Học phần là nền tảng phần mềm cấp doanh nghiệp (enterprise-grade) được thiết kế nhằm số hóa và tối ưu hóa quy trình quản lý đào tạo và đăng ký tín chỉ tại các cơ sở giáo dục đại học.

Mục đích cốt lõi của dự án là giải quyết bài toán nghẽn cổ chai hệ thống trong các đợt đăng ký tín chỉ cao điểm, phục vụ quy mô lên đến 100.000 sinh viên. Hệ thống được thiết kế để đảm bảo tính sẵn sàng cao (High Availability), tính nhất quán dữ liệu tuyệt đối (Strict Data Consistency), và ngăn chặn hoàn toàn rủi ro đăng ký vượt quá sĩ số lớp học (Overbooking) dưới áp lực tải đột biến.

## 2. Phân Hệ Chức Năng Cốt Lõi (Core Modules)
- **Phân hệ Sinh viên (Student Portal):** Hỗ trợ tra cứu danh mục môn học theo thời gian thực, xử lý giao dịch đăng ký/hủy học phần, và quản lý lịch học cá nhân.
- **Phân hệ Quản trị (Administration Console):** Quản lý Master Data (Chương trình đào tạo, Môn học, Lớp học, Tài khoản), thiết lập cấu hình đợt đăng ký, và giám sát tài nguyên hệ thống.
- **Phân hệ Giảng viên (Faculty Portal):** Cung cấp công cụ theo dõi lịch giảng dạy và trích xuất danh sách sinh viên.

## 3. Kiến Trúc Hệ Thống (System Architecture)
Dự án áp dụng tiêu chuẩn API-First Design và Kiến trúc Hướng sự kiện (Event-Driven Architecture) nhằm tách biệt các luồng xử lý và nâng cao khả năng chịu tải.

### 3.1. Ngăn Xếp Công Nghệ (Technology Stack)
- **Application Framework:** Node.js với NestJS (sử dụng TypeScript để đảm bảo tính chặt chẽ của kiểu dữ liệu).
- **Relational Database:** PostgreSQL (Đảm bảo tính tuân thủ ACID cho các giao dịch đăng ký học phần).
- **In-Memory Cache:** Redis (Tối ưu hóa thời gian truy xuất danh sách môn học và xử lý giới hạn tốc độ - Rate Limiting).
- **Message Broker:** RabbitMQ (Quản lý hàng đợi bất đồng bộ cho các yêu cầu đăng ký, bảo vệ Database khỏi tình trạng quá tải).
- **Containerization:** Docker và Docker Compose.

### 3.2. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)
- **Khả năng mở rộng (Scalability):** Có khả năng xử lý từ 20.000 đến 30.000 người dùng đồng thời (CCU) trong 15-30 phút đầu tiên của đợt đăng ký.
- **Tính nhất quán (Consistency):** Áp dụng cơ chế khóa dữ liệu (Locking mechanisms) nghiêm ngặt để đảm bảo số lượng đăng ký không vượt quá sức chứa cấu hình của lớp học phần.

## 4. Hướng Dẫn Cài Đặt (Local Environment Setup)

### 4.1. Yêu cầu hệ thống
Đảm bảo máy chủ hoặc môi trường phát triển đã cài đặt:
- Node.js (v18.x hoặc mới hơn)
- Docker Engine & Docker Compose
- Node Package Manager (npm hoặc yarn)

### 4.2. Các bước triển khai
1. Tải mã nguồn và cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```

2. Khởi tạo hạ tầng dịch vụ (PostgreSQL, Redis, RabbitMQ):
   ```bash
   docker-compose up -d
   ```

3. Cấu hình biến môi trường:
   ```bash
   cp .env.example .env
   ```

4. Chạy kịch bản di chuyển dữ liệu (Database Migration) để tạo lược đồ cơ sở dữ liệu:
   ```bash
   npm run db:migrate
   ```

5. Khởi động ứng dụng Backend trong môi trường phát triển:
   ```bash
   npm run start:dev
   ```

## 5. Tài Liệu Giao Tiếp (API Documentation)
Giao kèo API (API Contract) của hệ thống được chuẩn hóa theo định dạng OpenAPI (Swagger). Sau khi ứng dụng khởi động thành công, tài liệu có thể được truy cập tại:
http://localhost:3000/uth/api/docs

## 6. Kiểm Thử (Testing)
Hệ thống cung cấp sẵn các kịch bản kiểm thử tự động:
- Kiểm thử luồng xử lý (Unit/Integration Test):
  ```bash
  npm run test
  ```
- Kiểm thử khả năng chịu tải (Load/Stress Test - yêu cầu thư viện k6):
  ```bash
  k6 run tests/load/registration.js
  ```

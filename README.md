# Hệ Thống Quản Lý Học Phần Đại Học (Course Management System)

## 1. Tổng Quan Dự Án (Project Overview)
Hệ thống Quản lý Học phần là nền tảng phần mềm cấp doanh nghiệp (enterprise-grade) được thiết kế nhằm số hóa và tối ưu hóa quy trình quản lý đào tạo và đăng ký tín chỉ tại các cơ sở giáo dục đại học.

Mục đích cốt lõi của dự án là giải quyết bài toán nghẽn cổ chai hệ thống trong các đợt đăng ký tín chỉ cao điểm, phục vụ quy mô lên đến 100.000 sinh viên. Hệ thống được thiết kế để đảm bảo tính sẵn sàng cao (High Availability), tính nhất quán dữ liệu tuyệt đối (Strict Data Consistency), và tích hợp Trí tuệ nhân tạo (AI) để nâng cao tự động hóa và trải nghiệm người dùng.

## 2. Phân Hệ Chức Năng Cốt Lõi (Core Modules)
- **Phân hệ Sinh viên (Student Portal):** Đăng ký/hủy học phần, tra cứu lịch học.
- **Phân hệ Quản trị (Administration Console):** Quản lý Master Data (Chương trình đào tạo, Môn học, Lớp học, Tài khoản), cấu hình đợt đăng ký, giám sát tải hệ thống.
- **Phân hệ Giảng viên (Faculty Portal):** Theo dõi lịch giảng dạy và danh sách sinh viên.
- **Hệ thống AI (AI Inference):** 
  - **Xác thực khuôn mặt (Face Login):** Xác thực định danh sinh viên theo thời gian thực.
  - **Trợ lý tìm kiếm (RAG Search):** Truy vấn thông tin môn học và quy chế đào tạo dựa trên LLM và cơ sở dữ liệu Vector.

## 3. Kiến Trúc Hệ Thống (Polyglot Monorepo)
Dự án áp dụng tiêu chuẩn API-First Design và Kiến trúc Hướng sự kiện (Event-Driven Architecture), tổ chức theo mô hình Monorepo Đa ngôn ngữ nhằm tách biệt các luồng xử lý và tối ưu hóa tài nguyên.

### 3.1. Cấu trúc thư mục
```text
.
├── ai_inference/       # AI Service (Python / FastAPI) xử lý Face Login & RAG
├── backend/            # Core API Service (Node.js / NestJS)
├── deploy/             # Chứa hạ tầng Docker Compose cục bộ
├── docs/               # Tài liệu thiết kế hệ thống và luồng nghiệp vụ
├── frontend/           # Web App (React Vite) & Mobile App (React Native)
├── test/               # Kịch bản kiểm thử tải (Load test) với k6
└── .github/workflows/  # CI/CD Pipelines theo cơ chế Path Filtering
```

### 3.2. Ngăn Xếp Công Nghệ (Technology Stack)
- **Backend Framework:** Node.js với NestJS (TypeScript).
- **Frontend Framework:** React (Web) và React Native (Mobile).
- **AI Inference:** Python (FastAPI, Langchain, OpenCV/InsightFace).
- **Relational & Vector DB:** PostgreSQL tích hợp extension `pgvector`.
- **In-Memory Cache:** Redis (Tối ưu truy xuất & Rate Limiting).
- **Message Broker:** RabbitMQ (Xử lý hàng đợi bất đồng bộ chống Overbooking).
- **Object Storage:** MinIO (Lưu trữ ảnh khuôn mặt và tài liệu, S3-compatible).

## 4. Hướng Dẫn Cài Đặt (Local Environment Setup)

### 4.1. Yêu cầu hệ thống
- Docker Engine & Docker Compose
- Node.js (v18.x hoặc mới hơn)
- Python (v3.10 hoặc mới hơn)

### 4.2. Khởi tạo hạ tầng (Infrastructure)
Hạ tầng cơ sở dữ liệu được đóng gói toàn bộ qua Docker.
```bash
cd deploy
docker-compose up -d
```

### 4.3. Thiết lập biến môi trường (.env)
> **LƯU Ý QUAN TRỌNG:** Dự án tuân thủ nguyên tắc cô lập ranh giới (Security Boundaries). **Tuyệt đối không sử dụng file `.env` chung ở cấp Root.**

Lập trình viên cần tạo file `.env` độc lập bên trong từng thư mục service (`backend/`, `frontend/`, `ai_inference/`) theo cấu trúc mẫu do từng team quy định.

### 4.4. Khởi động các Service
Mỗi service hoạt động hoàn toàn độc lập. Lập trình viên di chuyển vào thư mục tương ứng và khởi chạy theo chuẩn của Framework đó (Ví dụ: `npm run start:dev` đối với Backend, `fastapi dev` đối với AI).

## 5. Quy trình CI/CD
Hệ thống CI/CD được cấu hình bằng Github Actions áp dụng chiến lược **Path Filtering**. 
Mỗi khi có commit đẩy lên nhánh `main` hoặc `dev`, hệ thống chỉ kích hoạt pipeline test và build tương ứng cho thư mục có sự thay đổi (Backend, Frontend, hoặc AI), đảm bảo tính độc lập và tiết kiệm tài nguyên máy chủ CI.

## 6. Kiểm Thử (Testing)
Hệ thống cung cấp sẵn các kịch bản kiểm thử tải (Load/Stress Test) nằm trong thư mục `test/`, sử dụng công cụ **k6** để giả lập luồng 30.000 sinh viên đồng thời (CCU).

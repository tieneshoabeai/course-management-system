### Phần 1: Phân tích & Phân rã ranh giới (Discovery & Scoping)
- **Tìm hiểu:** 
  + Các thành viên vào trang portal và tìm hiểu các tính năng của trang và liệt kê theo từng module.
  + Định nghĩa Functional Requirements (FR) và Non-Functional Requirements (NFR).
- **Tài liệu hóa:**
  + Viết tài liệu SRS (Software Requirements Specification).
  + Danh sách Feature theo module (Bao gồm các luồng AI: Face Login, RAG Search).
  + Vẽ Use Case Diagram.

### Phần 2: Thiết kế Kiến trúc & API (Architecture & API Design)
- **Kiến trúc Hệ thống (System Architecture):** 
  + Vẽ Data Flow Diagram (DFD) để chốt luồng dữ liệu nghiệp vụ.
  + Chốt hạ tầng máy chủ: Load Balancer, Cache (Redis), Message Queue (**RabbitMQ** chống Overbooking), Object Storage (**MinIO** lưu trữ file/ảnh khuôn mặt).
  + Mô tả chi tiết thứ tự thời gian xử lý của các luồng phức tạp (Sequence Diagram) nhằm phát hiện sớm Race Condition.
  + Lựa chọn Tech Stack kèm tài liệu quyết định kiến trúc (ADR).
- **Thiết kế Dữ liệu & Bảo mật:**
  + Thiết kế Database Schema (ERD) cho PostgreSQL và cấu trúc lưu trữ Vector (**pgvector**) phục vụ AI RAG.
  + Thiết kế cơ chế cấp quyền lưu trữ an toàn (Pre-signed URL) để quản lý dữ liệu sinh trắc học PII.
- **Giao kèo API (API Contract):**
  + Định nghĩa API để thống nhất giữa Backend (NestJS), AI (FastAPI) và Frontend (Swagger/OpenAPI): Định nghĩa endpoint, payload, error code.

### Phần 3: Phát triển song song (Parallel Implementation - Polyglot Monorepo)
- **Frontend / Mobile:** Sử dụng công cụ (Postman hoặc Prism) tạo Mock API từ tài liệu Swagger. Tiến hành code UI/UX và ghép API giả ngay lập tức.
- **Backend (NestJS):** Thiết lập kiến trúc Module-based (hoặc DDD). Code logic nghiệp vụ bám sát theo DFD, đặc biệt tập trung xử lý hàng đợi (Queue) giao tiếp với RabbitMQ.
- **AI Inference (Python):** 
  + Xây dựng mô hình và API nhận diện khuôn mặt thời gian thực (Face Login).
  + Xây dựng Data Pipeline để nhúng (embed) tài liệu môn học/quy chế vào cơ sở dữ liệu Vector phục vụ tính năng tìm kiếm ngữ nghĩa.

### Phần 4: Tích hợp & Kiểm thử (Integration & Testing) 
- **CI (Continuous Integration):** Đẩy code lên Git, kích hoạt hệ thống CI tự động (**cơ chế Path Filtering**) chạy Unit Test cho service tương ứng.
- **Tích hợp:** Frontend thay thế Mock API bằng Real API của Backend và AI trên môi trường Staging.
- **Load Testing (Kiểm thử tải):** Sử dụng k6 giả lập 20.000 - 30.000 CCU cùng lúc đập vào luồng Đăng ký học phần để kiểm tra xem cấu trúc Queue (RabbitMQ) và Cache (Redis) có chịu tải và chặn Overbooking đúng chuẩn NFR không.
- **Kết quả:** Ứng dụng chạy trơn tru trên Staging, có báo cáo chịu tải đạt chuẩn.

### Phần 5: Triển khai & Giám sát (Deployment & Observability)
- **CD (Continuous Deployment):** Triển khai tự động lên Production với phương pháp Zero-Downtime.
- **Giám sát (Monitoring):** Gắn các công cụ APM (Application Performance Monitoring) như Grafana, Datadog để theo dõi CPU, RAM, Database Lock, độ trễ mạng (API Latency), và **độ dài hàng đợi (Queue Length)** của RabbitMQ theo thời gian thực.
- **Kết quả:** Hệ thống Live an toàn, tự động cảnh báo (Alert) trước khi sập.

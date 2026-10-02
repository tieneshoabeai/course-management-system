### Bước 1: Phân tích & Phân rã ranh giới (Discovery & Scoping)
- **Hành động:** 
  + Thu thập yêu cầu từ Stakeholders.
  + Phân rã dự án theo từng giai đoạn (Phase). Xác định rõ ranh giới của bản phát hành đầu tiên (MVP) để tránh sa lầy (Ví dụ: Ưu tiên luồng Đăng ký học phần).
  + Định nghĩa Functional Requirements (FR) và Non-Functional Requirements (NFR).
- **Đầu ra:** 
  + Tài liệu SRS & Danh sách Feature đã phân độ ưu tiên.
  + Use Case Diagram.

### Bước 2: Thiết kế Kiến trúc & API (Architecture & API Design)
- **Hành động & Yêu cầu:** 
  + Vẽ Data Flow Diagram (DFD) để chốt luồng dữ liệu nghiệp vụ.
  + Vẽ System Architecture Diagram (High-Level Design): Chốt hạ tầng máy chủ, Load Balancer, Cache (Redis), Message Queue (RabbitMQ).
  + Mô tả chi tiết thứ tự thời gian xử lý của các luồng phức tạp nhằm phát hiện sớm Race Condition.
  + Lựa chọn Tech Stack kèm tài liệu đánh giá (ADR).
  + Thiết kế Database Schema (ERD).
  + Thiết kế API Contract (Swagger/OpenAPI): Định nghĩa toàn bộ endpoint, payload, error code.
- **Đầu ra:** Sổ tay thiết kế hệ thống hoàn chỉnh (HLD, DFD, ERD, Sequence) và API Contract được ký chốt bởi cả team BE và FE.

### Bước 3: Phát triển song song (Parallel Implementation)
- **Hành động:** 
  + **Frontend / Mobile:** Sử dụng công cụ (Postman/Prism) tạo Mock API từ tài liệu Swagger. Tiến hành code UI/UX và ghép API giả ngay lập tức.
  + **Backend:** Cài đặt môi trường local (Docker cho DB, Redis, Queue). Code logic nghiệp vụ bám sát theo đúng HLD và API Contract đã chốt ở Bước 2.
- **Đầu ra:** Mã nguồn độc lập của FE và BE hoàn thiện trên môi trường nội bộ (Local/Dev).

### Bước 4: Tích hợp & Kiểm thử (Integration & Testing) 
*Xóa bỏ rủi ro tích hợp thủ công và đảm bảo NFR về khả năng chịu tải.*
- **Hành động:** 
  + Đẩy code lên Git, kích hoạt hệ thống **CI (Continuous Integration)** tự động chạy Unit Test và Integration Test.
  + Frontend thay thế Mock API bằng Real API của Backend trên môi trường Staging.
  + **Load Testing (Kiểm thử chịu tải):** Sử dụng k6 hoặc JMeter giả lập 20.000 user cùng lúc đập vào luồng Đăng ký học phần để kiểm tra xem cấu trúc Queue và Cache ở Bước 2 có hoạt động đúng không.
- **Đầu ra:** Ứng dụng chạy trơn tru trên Staging, có báo cáo chịu tải đạt chuẩn NFR.

### Bước 5: Triển khai & Giám sát (Deployment & Observability)
- **Hành động:** 
  + **CD (Continuous Deployment):** Triển khai tự động lên Production với phương pháp Zero-Downtime.
  + Gắn các công cụ **APM (Application Performance Monitoring)** như Grafana, Datadog để giám sát CPU, RAM, Database Lock, và API Latency theo thời gian thực.
- **Đầu ra:** Hệ thống Live an toàn, có khả năng tự động cảnh báo (Alert) trước khi sập.

---

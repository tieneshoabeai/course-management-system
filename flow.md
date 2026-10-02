### Phần 1: Phân tích & Phân rã ranh giới (Discovery & Scoping)
- **Tìm hiểu:** 
  + Các thành viên vào trang portal và tìm hiểu các tính năng của trang và liệt kê theo từng module
  + Định nghĩa Functional Requirements (FR) và Non-Functional Requirements (NFR).
- **Sau đó viết:**
  + Tài liệu SRS
  + Danh sách Feature theo module.
  + Vẽ Use Case Diagram.

### Phần 2: Thiết kế Kiến trúc & API (Architecture & API Design)
- **Yêu cầu:** 
  + Vẽ Data Flow Diagram (DFD) để chốt luồng dữ liệu nghiệp vụ.
  + Vẽ System Architecture Diagram: Chốt hạ tầng máy chủ, Load Balancer, Cache (Redis), Message Queue (Kafka).
  + Mô tả chi tiết thứ tự thời gian xử lý của các luồng phức tạp nhằm phát hiện sớm Race Condition.
  + Lựa chọn Tech Stack kèm tài liệu đánh giá (ADR).
  + Thiết kế Database Schema (ERD).
  + Thiết kế API để thống nhất giữa BE và FE (Swagger/OpenAPI): Định nghĩa toàn bộ endpoint, payload, error code

### Phần 3: Phát triển song song (Parallel Implementation)
- **Yêu cầu:** 
  + **Frontend / Mobile:** Sử dụng công cụ (Postman or Prism) tạo Mock API từ tài liệu Swagger. Tiến hành code UI/UX và ghép API giả ngay lập tức.
  + **Backend:** Thiết kế hệ thống, cấu trúc thư mục,..v.v. Code logic nghiệp vụ bám sát theo đúng DFD và API ở Bước 2.

### Phần 4: Tích hợp & Kiểm thử (Integration & Testing) 
- **Yêu cầu:** 
  + Đẩy code lên Git, kích hoạt hệ thống **CI (Continuous Integration)** tự động chạy Unit Test và Integration Test.
  + Frontend thay thế Mock API bằng Real API của Backend trên môi trường Staging.
  + **Load Testing:** Sử dụng k6 hoặc K8s giả lập khoảng 10.000 user cùng lúc đập vào luồng Đăng ký học phần (hoặc các tính năng có lượng truy cập cao tương tự) để kiểm tra xem cấu trúc Queue và Cache ở Bước 2 có hoạt động đúng không.
- **Kết quả:** Ứng dụng chạy trơn tru trên Staging, có báo cáo chịu tải đạt chuẩn NFR.

### Phần 5: Triển khai & Giám sát (Deployment & Observability)
- **Yêu cầu:** 
  + **CD (Continuous Deployment):** Triển khai tự động lên Production với phương pháp Zero-Downtime (nếu nhóm mình muốn triển khai)
  + Gắn các công cụ **APM (Application Performance Monitoring)** như Grafana, Datadog để giám sát CPU, RAM, Database Lock, và API Latency theo thời gian thực.
- **Kết quả:** Hệ thống Live an toàn, có khả năng tự động cảnh báo (Alert) trước khi sập.

---

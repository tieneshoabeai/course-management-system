Sau khi đã hoàn thành xong phần 1 và phần 2 trong flow_plan_overview. Mỗi team sẽ hoàn thành các công việc sau đây:

## 1. Khởi tạo & Tiêu chuẩn hóa (Scaffolding)
- Thiết lập môi trường ảo Python (`venv` hoặc `conda`) với Python 3.10.
- Khởi tạo dự án FastAPI và liệt kê thư viện vào `requirements.txt`.
- Cài đặt Linter (Ruff/Flake8) và Formatter (Black) để đồng bộ định dạng code Python.

## 2. Thiết lập Kết nối Dữ liệu (Connections)
- Kết nối MinIO: Viết script tải xuống (pull) hình ảnh gốc của sinh viên phục vụ việc so sánh khuôn mặt.
- Kết nối PostgreSQL: Thiết lập tương tác với extension `pgvector` để lưu trữ và truy vấn vector.

## 3. Phát triển Luồng Face Login (Nhận diện khuôn mặt)
- Nghiên cứu và gắn các mô hình trích xuất đặc trưng khuôn mặt (InsightFace, OpenCV, dlib).
- Viết API `/api/v1/face-match` (REST FastAPI): Nhận luồng hình ảnh đầu vào từ Backend/Frontend, tiến hành so sánh với vector chân dung gốc và trả về điểm tương đồng (Similarity Score).
- (Tùy chọn nâng cao) Bổ sung thuật toán Anti-spoofing để chống dùng ảnh in/màn hình điện thoại giả mạo.

## 4. Phát triển Luồng RAG Search (Trợ lý tìm kiếm)
- **Data Pipeline:** Viết script tự động trích xuất text từ các file tài liệu PDF (Đề cương môn học, Quy chế) trên MinIO.
- **Embedding:** Chạy mô hình Embedding (OpenAI hoặc Open-source) để chuyển đổi nội dung text thành vector và lưu trữ vào `pgvector`.
- **Inference API:** Viết API `/api/v1/search` sử dụng Langchain / LlamaIndex. API này nhận câu hỏi tự nhiên của sinh viên, tìm kiếm ngữ nghĩa trong Vector DB, và tổng hợp câu trả lời trả về cho Backend.

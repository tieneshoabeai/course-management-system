Sau khi đã hoàn thành xong phần 1 và phần 2 trong flow_plan_overview. Mỗi team sẽ hoàn thành các công việc sau đây:

## 1. Khởi tạo & Tiêu chuẩn hóa (Scaffolding & Workspace)
- Khởi tạo thư mục gốc cho Frontend. Tách Workspace độc lập nếu làm song song bản Web (React Vite) và bản Mobile (React Native).
- Cấu hình ESLint, Prettier, và thư viện UI (TailwindCSS / Material-UI).
- Thiết lập hệ thống Router và thư viện State Management (Zustand hoặc Redux).

## 2. Tích hợp Mock API (Mở khóa lập trình)
- Trích xuất file giao kèo Swagger (từ Phần 2) đưa vào các công cụ như Postman hoặc Prism để dựng Mock Server.
- Cấu hình Axios/Fetch trỏ vào Mock Server để lấy dữ liệu JSON tĩnh. Việc này giúp Frontend code giao diện ngay lập tức mà không cần đợi Backend.

## 3. Phát triển Giao diện (UI/UX)
- Xây dựng Hệ thống Design System: Các UI Component dùng chung (Button, Input, Table, Modal).
- Dựng trang Đăng nhập: Tích hợp logic truy xuất Camera/WebRTC để chụp ảnh sinh viên phục vụ Face Login.
- Dựng trang Portal Sinh viên: Màn hình tra cứu môn học, thời khóa biểu, công nợ.
- Dựng trang Đăng ký tín chỉ: Thiết kế giao diện chịu tải (Hiển thị trạng thái Loading, Hàng đợi khi gửi request vào lúc cao điểm).

## 4. Tích hợp API thật & Tối ưu (Integration)
- Thay đổi cấu hình `.env` để trỏ URL từ Mock Server sang API thật của Backend.
- Xử lý các mã lỗi đồng bộ (HTTP 4xx, 5xx) và thiết lập hệ thống thông báo (Toast/Alert) phản hồi kết quả đăng ký cho sinh viên.
- Tối ưu hóa bundle size và lazy loading cho các trang nặng.

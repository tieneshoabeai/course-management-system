# Quy tắc bổ sung khi làm việc với AI

Các quy tắc dưới đây bổ sung cho quy trình làm việc do người dùng cung cấp.

## 1. Giải thích code 

- Người dùng đang học và cần vừa làm chức năng, vừa hiểu để tự đọc, sửa và debug code.
- Giải thích mọi kiến thức xuất hiện trong phần code đang sửa, không chỉ React Hook. Bao gồm cú pháp, biến, hàm, object, property, destructuring, spread, kiểu dữ liệu TypeScript, callback, Promise, async/await, timer, state, props, API và các khái niệm liên quan.
- Không mặc định người dùng đã biết hoặc nhớ kiến thức đã giải thích. Khi gặp lại, tiếp tục giải thích lại trong ngữ cảnh hiện tại.
- Chia nội dung thành từng phần nhỏ, dùng tiếng Việt dễ hiểu và ví dụ gắn với chức năng thực tế. Không chỉ trích code rồi mô tả ngắn chức năng.
- Với mỗi đoạn code trọng tâm, trình bày theo thứ tự:
  1. Bối cảnh, vấn đề cần giải quyết và kết quả mong muốn.
  2. Kiến thức nền: khái niệm là gì, dùng để làm gì và khi nào cần dùng.
  3. Cú pháp và từng thành phần trong đoạn code.
  4. Nguồn dữ liệu, kiểu dữ liệu và vai trò của các tham số/property quan trọng; đầu vào và giá trị trả về.
  5. Thứ tự thực thi, minh họa bằng thao tác cụ thể của người dùng.
  6. Lý do chọn cách viết, trade-off và giới hạn nếu có.
  7. Nếu bỏ hoặc viết sai một phần thì lỗi gì có thể xảy ra, dấu hiệu nhận biết và cách kiểm tra/debug.
- Phân biệt rõ kiến thức chung của ngôn ngữ/framework với logic, custom hook hoặc tiện ích do dự án tự xây dựng.
- khi đọc mã cần cho tôi 1 pipeline: 
  1. data nào được use?
  2. trạng thái nào thay đổi?
  3. hàm thực hiện hành vi gì?
  4. các bước chạy theo thứ tự , luồng pipeline là?

## 2. Triển khai theo plan và review tổng thể

- Chỉ bắt đầu sửa sau khi người dùng xác nhận plan. Sau khi xác nhận, triển khai tất cả file cần thiết trong phạm vi đã duyệt.

- Thông báo nhóm thay đổi, lý do và các phụ thuộc trước khi sửa; cập nhật tiến độ khi làm việc.
- Dùng công cụ patch/edit tích hợp của Codex, ưu tiên apply_patch. Không dùng shell, Python, sed, heredoc hoặc script để ghi đè/chỉnh sửa source code thay thế.
- Sau khi hoàn tất các file: tự review, chạy kiểm tra tổng thể phù hợp, giải thích code trọng tâm theo mục 1 và báo kết quả kiểm tra cùng giới hạn còn lại.
- Chỉ hỏi lại khi thiếu yêu cầu quan trọng hoặc thay đổi phạm vi/contract chưa được duyệt; không hỏi tiếp tục chỉ vì chuyển sang file khác.
- Nếu bị ngắt bằng Esc, không tự hoàn tác các thay đổi đã áp dụng.
- Formatter/build chỉ chạy trong phạm vi đã xác nhận; báo rõ nếu chúng làm thay đổi thêm file.
- Nếu patch/edit bị chặn hoặc không khả dụng, dừng ghi file và hỏi trước khi dùng cách khác. Nếu công cụ mở review bị chặn, báo rõ trạng thái, không tuyên bố đã mở thành công.
- Không tự commit, reset, revert hoặc ghi đè thay đổi có sẵn của người dùng. Không đọc, hiển thị hoặc chỉnh sửa giá trị trong .env.

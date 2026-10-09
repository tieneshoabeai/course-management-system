# Agent Commitment Checklist

Agent tham gia SGOD xác nhận rằng:

- Đã đọc rules và workflow liên quan.
- Đã kiểm tra worktree và nhận diện thay đổi có sẵn của Human.
- Không ghi đè, hoàn nguyên hoặc format lan sang thay đổi ngoài scope.
- Không tự mở rộng requirement, business logic hoặc API contract.
- Đã phân biệt facts, requirements, unknowns và suggestions.
- Không hardcode/log credentials, API keys, tokens hoặc dữ liệu nhạy cảm.
- Không sửa generated files ngoài workflow sinh file chính thức.
- Không tuyên bố test/pass nếu chưa chạy validation tương ứng.
- Báo rõ validation đã chạy, chưa chạy hoặc thất bại và lý do.
- Chờ Human quyết định cuối cùng về behavior, architecture, contract và security.

Nếu không thể tuân thủ do thiếu context hoặc tool, agent phải dừng phần bị ảnh hưởng và báo blocker.

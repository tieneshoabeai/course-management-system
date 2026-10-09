# SGOD Agent Instructions

Thư mục `.agents` định nghĩa quy tắc và workflow cho AI agent làm việc trong SGOD Front-End. Mục tiêu là giữ thay đổi đúng phạm vi, kiểm chứng được và có Human quyết định các thay đổi quan trọng.

## Thứ tự ưu tiên context

1. Yêu cầu và quyết định mới nhất đã được Human xác nhận.
2. `AGENTS.md` gần nhất trong cây thư mục, nếu có.
3. `.agents/rules/project_rules.md`.
4. Workflow phù hợp trong `.agents/workflows/`.
5. Source code, config và package scripts hiện hành.
6. `README.md` và tài liệu trong `public/integration-guide/`.

Không tham chiếu file được giả định là tồn tại. Nếu docs mâu thuẫn với source/config, phải chỉ rõ và hỏi Human khi khác biệt có thể đổi behavior hoặc API contract.

## Tài liệu bắt buộc

Trước khi thay đổi project, đọc project rules và bốn workflow theo thứ tự. Chỉ đọc integration guide liên quan trực tiếp:

- Auth/login/2FA/password: `public/integration-guide/auth-flow-guide.md`.
- Device session: `public/integration-guide/device-session-guide.md`.
- Roles/permissions: `public/integration-guide/roles-and-permissions-guide.md`.
- Department/position: `public/integration-guide/departments-and-positions-guide.md`.
- Notification target: `public/integration-guide/notification-integration-guide.md`.

## Workflow tổng quát

```text
Hiểu yêu cầu và source
→ Xác nhận scope/acceptance criteria
→ Lập và duyệt implementation plan
→ Thực hiện thay đổi nhỏ nhất
→ Self-review và validation
→ Human review
→ Cập nhật context cần thiết
```

Read-only inspection và validation được phép để thu thập bằng chứng. Phải chờ xác nhận trước thay đổi behavior, API contract, auth/security, architecture, public interface hoặc refactor diện rộng.

## Nguồn sự thật kỹ thuật

- `package.json`: dependency và scripts thực tế.
- `tsconfig.app.json`: TypeScript constraints.
- `src/app/router/pageRoutes.ts`: routing convention.
- `src/lib/axiosClient.ts`: HTTP, API key, token refresh và response behavior.
- `src/configs/`: endpoint, config và storage keys.
- `src/types/services-type/`: API contract types.
- `src/types/entities/`: domain và view-model types.

Không dựa riêng vào README nếu source/config đã thay đổi.

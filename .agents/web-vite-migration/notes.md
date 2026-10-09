# Web Vite Migration Note

## Context

May hien tai khong tuong thich voi runtime app mobile Expo/React Native, nen frontend duoc chuyen huong sang ban web React Vite rieng.

## Scope da xac nhan

- Tao web app tai `frontend/frontend_web`.
- Dung React + Vite + TypeScript.
- Dung TailwindCSS + MUI cho UI.
- Dung Zustand cho auth state.
- Dung TanStack Query cho data fetching foundation.
- Dung React Hook Form + Zod cho form validation.
- Face Login chi la mock UI, chua dung camera that.
- Cap nhat ca report chinh `docs/frontend_plan.md`.

## Phan giu lai tu ban app

- Role flow: `student`, `lecturer`, `admin`.
- Mock auth user va mock access token.
- Dieu huong ve dashboard theo role.
- Cac dashboard ban dau cho student, lecturer, admin.

## Phan thay doi

- `expo-router` duoc thay bang `react-router-dom`.
- React Native primitives duoc thay bang HTML, Tailwind utility va MUI component.
- Native/mobile camera flow duoc thay bang mock Face Login UI tren web.

## Trade-off

- Uu diem: chay duoc tren trinh duyet, phu hop moi truong may hien tai, de demo va hoc React web.
- Gioi han: chua verify camera, chua co API auth that, chua co backend AI verify.
- Rủi ro tiep theo: khi noi API that can thong nhat contract response, error code va role permission.

## Follow-up can xac nhan sau

- Co nang Face Login len WebRTC camera that khong.
- Co them layout table/filter cho Admin khong.
- Co can mock API bang MSW/Prism truoc khi noi backend that khong.

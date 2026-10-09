# OctoLearn Mobile App - Detailed Architecture Plan

## 1. Muc tieu tai lieu

Tai lieu nay la plan kien truc chi tiet cho mobile app OctoLearn truoc khi scaffold project.

Trang thai hien tai:

- Chua tao source code.
- Chua cai library.
- Chua co API contract that.
- `project-architecture.md` chi dung lam kien truc tham khao ve cach chia layer.

Muc tieu cua buoc nay la chot:

- Platform va tech stack.
- Folder architecture.
- Role-based navigation.
- UI mock scope.
- Mock API strategy.
- AI Face Login architecture.
- Risk va implementation phases.

## 2. Thong tin da confirm

```txt
Project name: OctoLearn
Platform: Mobile app
Framework: React Native + Expo
Style direction: modern education + AI / Machine Learning
Roles: Admin, Sinh vien, Giang vien
UI phase: UI mock first
Real API: chua co
Mock API: MSW hoac fake service layer truoc
State management: Zustand
Server state: TanStack Query
Form validation: React Hook Form + Zod
Camera: expo-camera
AI Face Login: frontend camera UX + backend AI verify
Architecture reference: project-architecture.md chi tham khao, khong clone y nguyen
```

## 3. Dinh nghia problem

OctoLearn can mot mobile app phuc vu he thong hoc vu, trong do nguoi dung co the dang nhap, xem thong tin hoc tap, quan ly lich hoc, dang ky tin chi, va su dung AI Face Login.

App co 3 nhom nguoi dung:

- Sinh vien: dung app hang ngay de hoc tap, xem lich, dang ky tin chi, xem cong no.
- Giang vien: xem lich day, danh sach lop, diem danh, quan ly diem co ban.
- Admin: quan ly user, mon hoc, lop hoc, dot dang ky, thong bao va bao cao co ban.

Viec can lam truoc la UI mock de thay bo cuc va flow. Khi UI da on, moi chuan hoa mock API va sau do thay bang API that.

## 4. Scope giai doan dau

### 4.1 In scope

- Khoi tao Expo + TypeScript.
- Setup navigation theo role.
- Setup theme/design tokens.
- Dung UI mock cho cac flow chinh.
- Dung mock data cho UI.
- Dung auth state gia lap.
- Dung Face Login UI voi camera flow.
- Tao service/query layer de sau nay noi API that.

### 4.2 Out of scope tam thoi

- Chua lam AI model that tren frontend.
- Chua ket noi backend that.
- Chua lam push notification that.
- Chua lam payment that.
- Chua lam admin table phuc tap nhu web dashboard.
- Chua toi uu production security cho face recognition.

## 5. Tech stack de xuat

```txt
Core:
- Expo
- React Native
- TypeScript

Navigation:
- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/bottom-tabs

UI:
- NativeWind
- React Native Paper

State:
- Zustand

Server state:
- @tanstack/react-query

Form:
- react-hook-form
- zod
- @hookform/resolvers

Camera:
- expo-camera

Storage:
- expo-secure-store
- @react-native-async-storage/async-storage

Mock:
- fake service layer truoc
- MSW sau khi project structure on dinh
```

### 5.1 Ly do chon React Native Paper thay vi Tamagui

React Native Paper de tiep can hon cho fresher/intern:

- Component co san ro rang.
- Document de doc.
- Setup nhanh hon.
- Phu hop UI hoc vu, form, card, list, dialog.

Trade-off:

- Custom design co the khong linh hoat bang Tamagui.
- Neu can app rat premium/custom, sau nay co the can custom component nhieu hon.

## 6. Brand va UI direction

### 6.1 Brand

```txt
Name: OctoLearn
Meaning direction:
- Octo = 8 nhanh / multi-path learning / knowledge network
- Learn = hoc tap, hoc vu, ca nhan hoa viec hoc
```

Khong nen mac dinh dung hinh bach tuoc literal neu chua confirm. Nen uu tien metaphor:

- 8 knowledge nodes.
- Learning network.
- AI learning hub.
- Multi-role education system.

### 6.2 Color direction

User da chot mau:

```txt
Blue - Purple - Pink
```

De tranh generic AI gradient, nen dung co kiem soat:

```txt
Base:
- Midnight navy
- Deep indigo
- Soft near-white surface

Primary:
- Electric blue

Secondary:
- AI purple

Highlight:
- Controlled pink
```

### 6.3 UI mood

```txt
Modern education
AI / Machine Learning
Clean
Readable
Mobile-native
Khong tre con
Khong qua pastel
Khong qua toi/khong khi u buon
```

## 7. Folder architecture de xuat

```txt
src/
  app/
    navigation/
      RootNavigator.tsx
      AuthNavigator.tsx
      StudentNavigator.tsx
      LecturerNavigator.tsx
      AdminNavigator.tsx
      navigation.types.ts
    providers/
      AppProviders.tsx
      QueryProvider.tsx
      ThemeProvider.tsx
    config/
      queryClient.ts
      theme.ts

  features/
    auth/
      screens/
        WelcomeScreen.tsx
        LoginScreen.tsx
        PasswordLoginScreen.tsx
        ForgotPasswordScreen.tsx
      components/
      hooks/
      services/
      types/

    face-login/
      screens/
        FaceLoginIntroScreen.tsx
        FaceScanScreen.tsx
        FaceVerifyResultScreen.tsx
      components/
        FaceFrame.tsx
        CameraPermissionState.tsx
        FaceGuideCard.tsx
      hooks/
        useFaceLoginFlow.ts
        useCameraPermission.ts
      services/
        faceLogin.service.ts
      types/

    student/
      screens/
        StudentHomeScreen.tsx
        CourseSearchScreen.tsx
        ScheduleScreen.tsx
        TuitionScreen.tsx
        CreditRegistrationScreen.tsx
        RegistrationQueueScreen.tsx
        StudentProfileScreen.tsx
      components/
      hooks/
      services/
      types/

    lecturer/
      screens/
        LecturerHomeScreen.tsx
        TeachingScheduleScreen.tsx
        ClassListScreen.tsx
        AttendanceScreen.tsx
        GradeReviewScreen.tsx
        LecturerProfileScreen.tsx
      components/
      hooks/
      services/
      types/

    admin/
      screens/
        AdminHomeScreen.tsx
        UserManagementScreen.tsx
        CourseManagementScreen.tsx
        ClassManagementScreen.tsx
        RegistrationPeriodScreen.tsx
        SystemNotificationScreen.tsx
        ReportOverviewScreen.tsx
      components/
      hooks/
      services/
      types/

  shared/
    components/
      ScreenContainer.tsx
      AppButton.tsx
      AppTextInput.tsx
      AppCard.tsx
      AppHeader.tsx
      EmptyState.tsx
      LoadingState.tsx
      ErrorState.tsx
    hooks/
    services/
      httpClient.ts
    stores/
      auth.store.ts
    types/
      role.ts
      api.ts
    utils/
      error.ts
      formatDate.ts
    constants/
      routes.ts
      storageKeys.ts

  mocks/
    data/
      users.mock.ts
      courses.mock.ts
      schedules.mock.ts
      tuition.mock.ts
    handlers/
      auth.handlers.ts
      student.handlers.ts
      lecturer.handlers.ts
      admin.handlers.ts
    browser.ts
    server.ts

  assets/
    images/
    icons/
    fonts/
```

## 8. Layering rule

Flow chuan khi code feature:

```txt
Screen
  -> Feature component
  -> Hook
  -> Service
  -> Mock API / Real API
```

Quy tac:

- Screen chi nen dieu phoi layout va navigation.
- Component chi nen render UI.
- Hook xu ly state, form, query, mutation, flow.
- Service goi API/mock API.
- Type nam rieng, khong viet inline lung tung.
- Component khong goi API truc tiep neu da co hook/service.

## 9. Navigation architecture

### 9.1 Root flow

```txt
App start
  -> Check auth state
      -> Chua login: AuthNavigator
      -> Da login:
          -> role = student: StudentNavigator
          -> role = lecturer: LecturerNavigator
          -> role = admin: AdminNavigator
```

### 9.2 Auth navigation

```txt
Welcome
  -> Login
      -> Password Login
      -> Face Login Intro
          -> Face Scan
          -> Face Verify Result
      -> Forgot Password
```

### 9.3 Student tabs

```txt
Home
Courses
Schedule
Registration
Profile
```

### 9.4 Lecturer tabs

```txt
Home
Classes
Schedule
Attendance
Profile
```

### 9.5 Admin tabs

Admin mobile nen tranh table lon. Nen dung card/list/search/filter.

```txt
Home
Users
Courses
Periods
Reports
```

## 10. Screen map chi tiet

### 10.1 Auth

#### WelcomeScreen

Muc tieu:

- Gioi thieu OctoLearn.
- CTA vao login.
- The hien AI/ML learning system.

UI chinh:

- Logo/brand area.
- Short tagline.
- Primary button: Get started.
- Secondary: Learn more / Sign in.

#### LoginScreen

Muc tieu:

- Cho user chon cach dang nhap.

UI chinh:

- Password login button.
- Face login button.
- Forgot password link.

#### PasswordLoginScreen

Muc tieu:

- Dang nhap bang ma sinh vien/email + password.

UI chinh:

- Identifier input.
- Password input.
- Submit button.
- Error state.
- Link fallback/forgot password.

#### FaceLoginIntroScreen

Muc tieu:

- Giai thich ngan gon Face Login.
- Xin user vao camera scan.

UI chinh:

- AI face verification card.
- Privacy note ngan gon.
- Continue button.
- Fallback password login.

#### FaceScanScreen

Muc tieu:

- Mo camera.
- Huong dan user dua mat vao khung.
- Chup/scan.

UI chinh:

- Camera preview.
- Face frame.
- Guide text.
- Scan button.
- Retry/fallback.

#### FaceVerifyResultScreen

Muc tieu:

- Hien thi ket qua verify.

UI state:

- Verifying.
- Success.
- Retry.
- Fallback.

### 10.2 Student

#### StudentHomeScreen

Muc tieu:

- Tong quan hoc tap trong ngay.

UI chinh:

- Greeting.
- Today schedule card.
- Credit registration status.
- Tuition summary.
- Quick actions.
- AI learning suggestion card.

#### CourseSearchScreen

Muc tieu:

- Tim mon hoc.

UI chinh:

- Search input.
- Filter chips.
- Course cards.
- Course detail bottom sheet.

#### ScheduleScreen

Muc tieu:

- Xem lich hoc theo ngay/tuan.

UI chinh:

- Week selector.
- Day tabs.
- Class timeline.
- Empty state neu khong co lich.

#### TuitionScreen

Muc tieu:

- Xem cong no/hoc phi.

UI chinh:

- Outstanding amount card.
- Payment status.
- Tuition items.
- Payment note.

#### CreditRegistrationScreen

Muc tieu:

- Dang ky tin chi.

UI chinh:

- Search course.
- Course availability.
- Register button.
- Loading/queue state.
- Conflict warning.

#### RegistrationQueueScreen

Muc tieu:

- Hien thi trang thai khi he thong cao diem.

UI chinh:

- Queue position.
- Estimated wait.
- Retry/cancel.
- Status explanation ngan gon.

### 10.3 Lecturer

#### LecturerHomeScreen

Muc tieu:

- Tong quan lich day va lop can xu ly.

UI chinh:

- Today teaching schedule.
- Pending attendance.
- Classes overview.

#### ClassListScreen

Muc tieu:

- Xem danh sach lop.

UI chinh:

- Search/filter.
- Class cards.
- Student count.
- Next session.

#### AttendanceScreen

Muc tieu:

- Diem danh lop.

UI chinh:

- Session info.
- Student list.
- Present/Absent/Late status.
- Submit attendance.

#### GradeReviewScreen

Muc tieu:

- Xem/nhap/review diem co ban.

UI chinh:

- Grade item list.
- Student grade rows.
- Save draft.
- Submit.

### 10.4 Admin

#### AdminHomeScreen

Muc tieu:

- Tong quan he thong.

UI chinh:

- User summary.
- Course/class summary.
- Registration period status.
- System alert cards.

#### UserManagementScreen

Muc tieu:

- Quan ly user theo role.

UI chinh:

- Search.
- Role filter.
- User cards.
- Detail/edit sheet.

#### CourseManagementScreen

Muc tieu:

- Quan ly mon hoc.

UI chinh:

- Course list.
- Add/edit course action.
- Credit info.
- Department filter.

#### RegistrationPeriodScreen

Muc tieu:

- Quan ly dot dang ky tin chi.

UI chinh:

- Active period card.
- Period list.
- Open/close state.
- Capacity/queue setting mock.

#### ReportOverviewScreen

Muc tieu:

- Bao cao co ban tren mobile.

UI chinh:

- Summary cards.
- Simple trend blocks.
- Export/report action mock.

## 11. State architecture

### 11.1 Zustand

Dung cho client state:

```txt
auth state
selected role
theme preference
temporary UI preferences
camera scan draft state neu can
```

Vi du type:

```ts
type UserRole = 'student' | 'lecturer' | 'admin';

type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, accessToken: string) => void;
  logout: () => void;
};
```

### 11.2 TanStack Query

Dung cho server state:

```txt
course list
schedule
tuition
registration status
class list
attendance list
admin reports
```

Quy tac:

- Query key dat co nghia.
- Mutation dung cho login/register/submit.
- Error handling di qua helper chung.

## 12. API/mock strategy

Vi chua co API contract, phase dau nen dung fake service layer truoc:

```txt
Screen -> Hook -> Service -> mock data
```

Sau khi UI flow on:

```txt
Screen -> Hook -> Service -> MSW handler -> mock response
```

Sau khi backend co API:

```txt
Screen -> Hook -> Service -> real HTTP client -> backend
```

Ly do:

- Fake service layer nhanh de UI mock.
- MSW can setup React Native ky hon, nen dua vao sau khi folder structure on dinh.
- Service interface giu on dinh de sau nay thay backend de hon.

## 13. AI Face Login architecture

### 13.1 Frontend responsibility

Frontend phu trach:

- Xin quyen camera.
- Mo camera preview.
- Huong dan user canh mat.
- Kiem tra trang thai co camera/permission.
- Chup anh hoac scan ngan.
- Goi service verify.
- Hien thi ket qua: success/retry/fallback/error.

Frontend khong nen phu trach:

- Face matching production.
- Liveness detection nang cao.
- Anti-spoofing nang cao.
- Luu biometric raw data lau dai.

### 13.2 Backend/AI responsibility

Backend/AI phu trach:

- So khop khuon mat voi user.
- Liveness detection nang cao.
- Anti-spoofing.
- Tra ket qua verify.
- Audit/security policy.

### 13.3 Face login flow

```txt
User chon Face Login
  -> App xin camera permission
  -> Neu bi tu choi: hien permission state + fallback password
  -> Neu duoc chap nhan: mo camera
  -> User dua mat vao frame
  -> App chup anh/scan ngan
  -> Goi faceLoginService.verify()
  -> Mock AI response
      -> success: set auth + redirect theo role
      -> retry: hien ly do + cho scan lai
      -> fallback: chuyen password login
      -> error: hien loi + fallback
```

### 13.4 Face login result type

```ts
type FaceLoginResult =
  | {
      status: 'success';
      accessToken: string;
      user: {
        id: string;
        fullName: string;
        email: string;
        role: 'student' | 'lecturer' | 'admin';
      };
    }
  | {
      status: 'retry';
      reason: string;
    }
  | {
      status: 'fallback';
      reason: string;
    };
```

## 14. Error handling rule

Moi flow can co state:

```txt
idle
loading
success
empty
error
retry/fallback neu can
```

Vi du Face Login:

```txt
camera_permission_denied
camera_unavailable
face_not_detected
poor_lighting
verify_timeout
verify_failed
fallback_required
```

Vi du Credit Registration:

```txt
course_full
schedule_conflict
credit_limit_exceeded
registration_closed
queue_required
network_error
```

## 15. Design system plan

### 15.1 Tokens

```txt
colors
spacing
radius
typography
shadow
zIndex
```

### 15.2 Shared UI components

```txt
ScreenContainer
AppHeader
AppButton
AppTextInput
AppCard
RoleBadge
StatusBadge
EmptyState
LoadingState
ErrorState
BottomActionSheet
MetricCard
CourseCard
ScheduleCard
```

### 15.3 Mobile UI rule

- Text phai de doc.
- Touch target du lon.
- Khong nhoi nhieu table vao mobile.
- Admin screen dung list/card/filter thay vi desktop table.
- Form can co error message ro rang.
- Loading/empty/error state phai co UI rieng.

## 16. Implementation phases

### Phase 1 - Scaffold

Muc tieu:

- Tao Expo TypeScript app.
- Cai core libraries.
- Setup folder architecture.
- Setup providers.

Output:

- Project chay duoc.
- Navigation skeleton co auth va role shell.

### Phase 2 - Design system

Muc tieu:

- Setup theme.
- Tao shared UI components.
- Tao first UI mock style.

Output:

- App co visual identity co ban.
- Component dung lai duoc.

### Phase 3 - Auth + role navigation

Muc tieu:

- Dung Welcome/Login/Password Login.
- Dung auth store.
- Gia lap login theo role.
- Redirect dung navigator theo role.

Output:

- Co the dang nhap mock vao Student/Lecturer/Admin.

### Phase 4 - Student UI mock

Muc tieu:

- Dung cac screen chinh cho sinh vien.
- Dung mock data.
- Dung TanStack Query pattern.

Output:

- Student flow co the demo.

### Phase 5 - Lecturer UI mock

Muc tieu:

- Dung cac screen chinh cho giang vien.

Output:

- Lecturer flow co the demo.

### Phase 6 - Admin UI mock

Muc tieu:

- Dung admin mobile dashboard.
- Quan ly user/course/period/report o muc mock.

Output:

- Admin flow co the demo tren mobile.

### Phase 7 - AI Face Login mock

Muc tieu:

- Tich hop expo-camera.
- Dung camera permission flow.
- Dung mock AI verify.
- Fallback password login.

Output:

- Face Login flow demo duoc.

### Phase 8 - MSW/API readiness

Muc tieu:

- Dua mock service ve interface gan API that.
- Chuan bi MSW handlers hoac HTTP client.

Output:

- San sang thay mock bang API contract that.

## 17. Validation plan

Moi phase can kiem tra:

```txt
TypeScript check
Lint/format neu da setup
Expo dev server run
Test navigation basic
Test role redirect
Test loading/error/empty states
Test camera permission state neu co
```

Neu co build:

```txt
npx expo start
npx tsc --noEmit
npx eslint .
```

Lenh cu the se chot sau khi scaffold va package scripts ton tai.

## 18. Risks va trade-offs

### Risk 1: MUI khong dung cho React Native

MUI phu hop Web/PWA, khong phu hop mobile native. Giai phap la dung NativeWind + React Native Paper.

### Risk 2: MSW tren React Native co the can setup rieng

MSW rat tot cho web. Voi React Native, co the phuc tap hon. Giai phap la fake service layer truoc, MSW sau.

### Risk 3: Admin tren mobile kho hon web

Admin thuong can table lon. Tren mobile nen chuyen thanh card/list/filter/bottom sheet.

### Risk 4: AI Face Login co rui ro bao mat

Frontend khong nen xu ly biometric production mot minh. Backend/AI service phai xu ly verify/liveness/anti-spoofing.

### Risk 5: Chua co API contract

Neu UI mock di qua xa API that, sau nay co the phai sua service/type. Giai phap: service interface ro rang, mock response gan voi domain that.

## 19. Thong tin can confirm tiep truoc khi scaffold

Can user confirm:

1. Dung Expo managed workflow hay React Native CLI?
2. UI library chot React Native Paper hay Tamagui?
3. App uu tien iOS, Android, hay ca hai?
4. Co can dark mode khong?
5. Co can ngon ngu Vietnamese-only hay VI/EN?
6. Logo OctoLearn se tao sau hay dung text logo truoc?
7. Student flow nao la uu tien so 1: Schedule, Tuition, hay Credit Registration?

## 20. De xuat mac dinh neu khong co thay doi

Neu khong co thay doi, de xuat:

```txt
Expo managed workflow
React Native Paper
iOS + Android
Light mode truoc, dark mode sau
Vietnamese first
Text logo OctoLearn truoc
Student Credit Registration la flow uu tien
```


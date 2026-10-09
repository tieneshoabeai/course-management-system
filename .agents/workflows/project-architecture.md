# SGOD Front-End Project Architecture

## 1. Muc tieu file nay

File nay tom tat kien truc hien tai cua project SGOD Front-End de fresher/intern co the doc nhanh va nam duoc:

- Project dung cong nghe gi.
- Thu muc nao phu trach viec gi.
- Luong app chay tu dau vao den UI.
- Luong API, auth, chat, notification hoat dong nhu the nao.
- Khi sua mot feature thi nen doc file theo thu tu nao.

File nay chi la tai lieu hoc va review trong `.agents/`, khong phai source code runtime cua ung dung.

## 2. Tong quan cong nghe

Project nay la frontend app duoc xay bang:

- React 19
- TypeScript
- Vite
- React Router
- MUI
- Tailwind CSS
- Axios
- SWR
- Socket.IO Client
- Firebase Messaging
- i18next
- OpenAPI generated types

Co the hieu ngan gon:

```txt
React          -> dung de xay UI
TypeScript    -> giup code co type, giam loi sai du lieu
Vite          -> dev server va build tool
React Router  -> dieu huong trang
MUI/Tailwind  -> style va component UI
Axios         -> goi REST API
Socket.IO     -> realtime chat
Firebase      -> push notification
i18next       -> da ngon ngu EN/VI
OpenAPI types -> sinh type tu backend API spec
```

## 3. Luong khoi dong app

Entry point chinh:

```txt
src/app/main.tsx
```

Luong chay:

```txt
main.tsx
  -> BrowserRouter
  -> AuthProvider
  -> AppThemeProvider
  -> App.tsx
```

Y nghia:

- `BrowserRouter`: cho phep app dung URL de dieu huong.
- `AuthProvider`: quan ly trang thai dang nhap, token, user.
- `AppThemeProvider`: quan ly theme sang/toi.
- `App`: render routes va layout chinh.

## 4. Luong render tong quat

Khi app chay, cau truc render chinh la:

```txt
App.tsx
  -> Routes
      -> PublicOnlyRoute
      -> ProtectedRoute
          -> AppLayout
              -> Sidebar
              -> Header
              -> Outlet page
              -> Footer
```

Trong do:

- Public route: trang login, register, forgot password.
- Private route: trang can dang nhap nhu home, dashboard, chat, settings.
- `ProtectedRoute`: neu chua dang nhap thi day ve `/auth/login`.
- `PublicOnlyRoute`: neu da dang nhap ma vao login/register thi day ve `/home`.
- `AppLayout`: khung chinh sau khi dang nhap.

## 5. Cau truc thu muc chinh

```txt
src/
  app/
  components/
  views/
  hooks/
  service/
  lib/
  configs/
  types/
  utils/
  locales/
```

Giai thich ngan gon:

```txt
app/        = cua vao app, router, layout, context
components/ = cac UI component tai su dung
views/      = UI theo man hinh hoac feature lon
hooks/      = logic xu ly state, API flow, socket flow
service/    = ham goi API backend
lib/        = axios, firebase, i18n, openapi
configs/    = cau hinh base URL, storage key
types/      = type du lieu manual va generated
utils/      = helper function
locales/    = file dich ngon ngu
```

## 6. Routing architecture

Routing nam o:

```txt
src/app/router/pageRoutes.ts
```

Project dung cach gan giong file-based routing:

```txt
src/app/pages/private/chat/page.tsx
  -> /chat

src/app/pages/private/home/page.tsx
  -> /home

src/app/pages/public/auth/login/page.tsx
  -> /auth/login
```

File `pageRoutes.ts` dung:

```ts
import.meta.glob('../pages/{public,private}/**/page.tsx')
```

De tu dong tim cac file `page.tsx`, sau do convert path file thanh route URL.

Quy uoc:

- File nam trong `pages/public`: public route.
- File nam trong `pages/private`: private route.
- Segment `[id]` se thanh dynamic route `:id`.

## 7. Layout architecture

Layout chinh nam o:

```txt
src/app/layout.tsx
```

Layout gom:

```txt
AppLayout
  -> FcmPushLifecycle
  -> Sidebar
  -> Header
  -> Outlet
  -> Footer
```

Rieng trang `/chat` duoc xu ly dac biet:

- Chieu cao full viewport.
- Khong hien footer.
- Sidebar compact.
- Giam padding.
- Khoa overflow de chat UI khong bi scroll lung tung.

## 8. Auth architecture

Auth context nam o:

```txt
src/app/context/AuthContext.tsx
```

Nhiem vu:

- Luu `accessToken`.
- Luu `refreshToken`.
- Luu thong tin user.
- Kiem tra token khi F5.
- Cung cap `setAuthData`.
- Cung cap `logout`.
- Cho `axiosClient` goi refresh/logout gian tiep.

Luong login:

```txt
Login API thanh cong
  -> setAuthData(accessToken, refreshToken, user)
  -> luu vao sessionStorage
  -> isAuthenticated = true
  -> vao private route
```

Luong protect route:

```txt
User vao private page
  -> ProtectedRoute kiem tra isAuthenticated
      -> true: render page
      -> false: redirect /auth/login
```

## 9. API architecture

API client trung tam nam o:

```txt
src/lib/axiosClient.ts
```

Day la tang quan trong nhat khi goi backend.

Nhiem vu cua `axiosClient`:

- Set base URL mac dinh.
- Tu gan `Authorization: Bearer <token>`.
- Tu gan `x-api-key` theo service path.
- Tu gan `x-device-id` neu request yeu cau.
- Unwrap `response.data`.
- Refresh token khi gap loi `401`.
- Logout neu refresh token that bai.

Mapping service theo path:

```txt
/sgod-auth         -> Auth service
/sgod-chat         -> Chat service
/sgod-upload       -> Upload service
/sgod-notification -> Notification service
/sgod-security     -> Security service
/sgod-proposal     -> Proposal service
/sgod-payment      -> Payment service
/sgod-agentic      -> Agentic service
```

Luong goi API chuan:

```txt
Component
  -> Hook
  -> Service
  -> axiosClient
  -> Backend API
```

Khong nen de component goi API truc tiep neu project da co service/hook phu hop.

## 10. Service layer

Service nam trong:

```txt
src/service/
```

Cac nhom service lon:

```txt
src/service/auth/
src/service/chat/
src/service/upload/
src/service/notification.tsx
```

Vai tro cua service:

- Khai bao endpoint.
- Nhan params/body.
- Goi `axiosClient`.
- Tra data ve cho hook.

Vi du:

```txt
chatConversationService.getConversations()
  -> GET /sgod-chat/v1/conversations
```

Service khong nen om UI state. UI state nen nam trong hook hoac component.

## 11. Hooks layer

Hooks nam trong:

```txt
src/hooks/
```

Cac nhom hook lon:

```txt
src/hooks/auth/
src/hooks/chat/
src/hooks/notification/
src/hooks/upload/
```

Vai tro cua hook:

- Goi service.
- Quan ly loading/error/data.
- Xu ly flow nghiep vu frontend.
- Dong goi logic de component render gon hon.

Vi du voi chat:

```txt
useChatAreaController
  -> useChatMessagesFlow
  -> useChatAttachmentsFlow
  -> useChatReactionsFlow
  -> useChatPoolingsFlow
  -> useChatTypingFlow
  -> useChatSocket
```

Component chi nen render UI va goi callback, con logic phuc tap nen nam trong hook.

## 12. Chat architecture

Chat la feature phuc tap nhat trong project.

Entry page:

```txt
src/app/pages/private/chat/page.tsx
```

View chinh:

```txt
src/views/chat/sidebar-chat/
src/views/chat/chat-area/
src/views/chat/conversation-info/
```

Components chinh:

```txt
src/components/chat/
src/components/chat/chat-area/
src/components/chat/conversation-info/
src/components/chat/pooling/
```

Hooks chinh:

```txt
src/hooks/chat/
src/hooks/chat/websocket/
```

Luong UI chat:

```txt
ChatPage
  -> SideBarChatView
  -> ChatAreaView
      -> ChatHeader
      -> MessageList
      -> ChatDraftComposer
      -> ConversationInfoView
      -> Dialogs
```

Luong logic chat:

```txt
ChatAreaView
  -> useChatAreaController
      -> message flow
      -> attachment flow
      -> reaction flow
      -> polling flow
      -> typing flow
      -> socket flow
```

Luong gui tin nhan:

```txt
User nhap text/file
  -> ChatDraftComposer
  -> useChatAreaController.handleSendMessage()
  -> upload attachment neu co
  -> messageFlow.handleSend()
  -> socket sendMessage
  -> backend xu ly
  -> frontend nhan event realtime
  -> update MessageList va sidebar preview
```

## 13. Chat WebSocket architecture

Socket hook chinh:

```txt
src/hooks/chat/websocket/useChatSocket.ts
```

Ket noi socket:

```txt
io(`${CHAT_SOCKET_URL}/chat`, {
  transports: ['websocket'],
  auth: {
    token: accessToken,
    deviceSessionId,
  },
})
```

Luong socket:

```txt
Co accessToken + deviceSessionId
  -> connect /chat namespace
  -> emit join
  -> chon conversation
      -> conversation:close phong cu
      -> conversation:open phong moi
  -> gui/nhan events
```

Cac event/flow lien quan:

```txt
message:send
receiveMessage
message:update
message:delete
message:read
allMessagesRead
typing
reaction
polling
conversation:open
conversation:close
```

Can phan biet:

- REST API dung `axiosClient`.
- Realtime chat dung Socket.IO.
- Loi REST request khong dong nghia voi loi WebSocket.
- Loi WebSocket can xem tab Network WS/Socket, khong chi xem Fetch/XHR.

## 14. Notification architecture

Notification gom:

```txt
src/components/notification/FcmPushLifecycle.tsx
src/hooks/notification/useFcmPushNotifications.ts
src/service/notification.tsx
src/lib/firebase/
```

`FcmPushLifecycle` duoc mount trong:

```txt
src/app/layout.tsx
```

Nghia la sau khi user vao private layout, notification lifecycle moi chay.

Luong FCM:

```txt
AppLayout
  -> FcmPushLifecycle
      -> useFcmPushNotifications
          -> check browser support
          -> check secure context
          -> request notification permission
          -> register firebase messaging service worker
          -> get FCM token
          -> register device token len backend
          -> listen foreground notification
```

Can phan biet:

- Token JWT: token dang nhap cua user.
- FCM token: token thiet bi/trinh duyet dung de nhan push notification.

## 15. Upload architecture

Upload service nam o:

```txt
src/service/upload/
src/hooks/upload/
```

Voi chat attachment, flow thuong la:

```txt
User chon file
  -> attachment flow giu draft file
  -> khi send message thi upload file
  -> lay metadata upload
  -> gui metadata kem message qua socket
```

Luu y khi doc code upload chat:

- Upload REST API va chat socket la 2 buoc khac nhau.
- Upload thanh cong chua chac message da gui thanh cong.
- Message socket payload can dung contract backend yeu cau.

## 16. Types architecture

Types nam trong:

```txt
src/types/
```

Co 2 nhom chinh:

```txt
src/types/entities/
src/types/services-type/
```

Giai thich:

- `entities/`: type frontend tu dinh nghia cho UI/logic.
- `services-type/`: type sinh tu OpenAPI/backend spec.

Generated files khong nen sua tay.

Command generate:

```bash
yarn gen:types
yarn gen:types:chat
yarn gen:types:auth
```

Khi backend thay doi contract, can regenerate types thay vi sua generated type bang tay.

## 17. Config architecture

Config nam trong:

```txt
src/configs/
```

File quan trong:

```txt
src/configs/baseURL.ts
src/configs/storageKeys.ts
src/configs/firebase.ts
```

`baseURL.ts` doc bien moi truong bang `import.meta.env`.

Luu y quan trong:

- Khong doc/giai thich gia tri that trong `.env`.
- Khi can noi ve config, chi noi ten bien.
- Khong paste secret/API key/token ra chat.

## 18. Utils architecture

Utils nam trong:

```txt
src/utils/
```

Vai tro:

- Ham helper format data.
- Ham xu ly chat conversation/message.
- Ham helper user/string/role.
- Constants dung chung.

Vi du:

```txt
chatConversationState
chatMessageMerge
chatParticipantDisplay
chatMentions
chatTimelineTime
getErrorMessage
```

Utils nen la pure/helper logic, khong nen om UI state phuc tap.

## 19. Cach doc code khi sua feature

Thu tu doc khuyen nghi:

```txt
1. Tim route page
2. Doc view cua page
3. Doc component con
4. Doc hook flow
5. Doc service API
6. Doc type lien quan
7. Doc utils neu co transform data
```

Vi du sua Chat:

```txt
src/app/pages/private/chat/page.tsx
src/views/chat/chat-area/chat-area.tsx
src/hooks/chat/useChatAreaController.ts
src/hooks/chat/useChatMessagesFlow.ts
src/hooks/chat/websocket/useChatSocket.ts
src/service/chat/
src/types/entities/chat/
```

Vi du sua Auth:

```txt
src/app/pages/public/auth/login/page.tsx
src/views/auth/login/login.tsx
src/hooks/auth/
src/service/auth/auth.service.ts
src/app/context/AuthContext.tsx
src/lib/axiosClient.ts
```

Vi du sua Notification:

```txt
src/components/notification/FcmPushLifecycle.tsx
src/hooks/notification/useFcmPushNotifications.ts
src/service/notification.tsx
src/lib/firebase/
src/types/entities/notification.ts
```

## 20. Nguyen tac khi sua code trong project nay

Nen lam:

- Doc context truoc khi sua.
- Xac dinh feature dang nam o page/view/hook/service/type nao.
- Giu dung kien truc co san.
- Dung service layer de goi API.
- Dung hook layer de xu ly logic.
- Dung type co san neu co.
- Test build/format trong pham vi da confirm.

Khong nen lam:

- Component goi API truc tiep neu da co service/hook pattern.
- Sua generated OpenAPI type bang tay.
- Doc hoac in noi dung `.env`.
- Dua tai lieu noi bo vao `public/`.
- Tu them workaround neu chua noi ro risk.
- Tu mo rong scope ngoai yeu cau.

## 21. Kien truc ngan gon de ghi nho

Ban co the nho project theo so do nay:

```txt
Route/Page
  -> View
  -> Component
  -> Hook/Flow
  -> Service
  -> axiosClient / socket
  -> Backend
```

Neu la REST API:

```txt
Component -> Hook -> Service -> axiosClient -> Backend
```

Neu la realtime chat:

```txt
Component -> Hook -> useChatSocket -> Socket.IO -> Backend Gateway
```

Neu la notification:

```txt
AppLayout -> FcmPushLifecycle -> useFcmPushNotifications -> Firebase + Backend
```

## 22. Ket luan

Project SGOD Front-End dang di theo kien truc nhieu tang:

```txt
App shell
  -> Routing
  -> View
  -> Component
  -> Hook
  -> Service
  -> API/socket
```

Uu diem:

- Tach domain kha ro: Auth, Chat, Upload, Notification.
- Chat duoc tach thanh nhieu flow nho, de bao tri hon khi da hieu luong.
- API co `axiosClient` trung tam de quan ly token, API key, refresh token.
- Route duoc sinh tu file, de them page moi.

Rui ro/can can than:

- Chat co nhieu hook lien ket nhau, sua can doc tu tren xuong.
- `axiosClient` unwrap `response.data`, nen can can than khi type response.
- Generated types khong duoc sua tay.
- REST va WebSocket la 2 duong khac nhau, debug phai tach rieng.
- Config moi truong chi nen nhac ten bien, khong doc/in gia tri that.

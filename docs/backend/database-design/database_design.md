# **`DATABASE DESIGN`**

---
## **1. Table/ Collection**

`Auth:`
- students: sinh viên
- employees: nhân viên của nhà trường (lecturer,studentAffairsOfficer, accountant, administrator)
- refresh_tokens: mã gia hạn 

`Facilities:`
- campus: cơ sở của trường
- buildings: tòa nhà trong trường
- classrooms: phòng học

`Academic:`
- departments: phòng ban 
- majors: ngành học
- semesters: học kỳ
- curriculums: chương trình đào tạo 
- courses: học phần 
- curriculum_course: học phần thuộc chương trình đào tạo
- course_prerequisites: học phần tiên quyết

`Course Management:`
- course_sections: lớp học phần 
- enrollments: đăng ký học phần
- grades: điểm 
- course_section_schedules: lịch học của lớp học phần

`Support:`
- support_services: dịch vụ hỗ trợ
- notifications: thông báo 
- notification_recipients: người nhận thông báo
- invoices: hóa đơn

`Auditing:`
- audit_logs: nhật ký thay đổi database

 
## **2. </> SQL**

`student`: thêm một column để biết người này tốt nghiệp hay chưa

| Column                    | Data Type      | Constraint       | Ý nghĩa                            |
| ------------------------- | -------------- | ---------------- | ---------------------------------- |
| `id`                      | `BIGINT`       | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh    |
| `studentCode`             | `CHAR(12)`     | UNIQUE, NOT NULL | Mã số sinh viên                    |
| `passwordHash`            | `VARCHAR(255)` | NOT NULL         | Mật khẩu đã được hash để đăng nhập |
| `fullName`                | `VARCHAR(255)` | NOT NULL         | Họ và tên sinh viên                |
| `birthday`                | `DATE`         | NOT NULL         | Ngày sinh                          |
| `placeOfBirth`            | `VARCHAR(255)` | NOT NULL         | Nơi sinh                           |
| `majorId`                 | `BIGINT`       | FK, NOT NULL     | Ngành học của sinh viên            |
| `cohort`                  | `INTEGER`      | NOT NULL         | Khóa học, ví dụ `2026`             |
| `gender`                  | `VARCHAR(20)`  | NOT NULL         | Giới tính, ví dụ `MALE`, `FEMALE`  |
| `ethnicity`               | `VARCHAR(50)`  |                  | Dân tộc                            |
| `religion`                | `VARCHAR(50)`  |                  | Tôn giáo                           |
| `nationality`             | `VARCHAR(50)`  |                  | Quốc tịch                          |
| `personalEmail`           | `VARCHAR(255)` |                  | Email cá nhân                      |
| `phoneNumber`             | `VARCHAR(30)`  |                  | Số điện thoại                      |
| `citizenIdNumber`         | `VARCHAR(30)`  | UNIQUE           | Số căn cước công dân               |
| `hometownProvince`        | `VARCHAR(100)` |                  | Tỉnh quê quán                      |
| `hometownCommune`         | `VARCHAR(100)` |                  | Xã quê quán                        |
| `hometownSpecificAddress` | `VARCHAR(255)` |                  | Địa chỉ cụ thể ở quê quán          |
| `height`                  | `DECIMAL(5,2)` |                  | Chiều cao                          |
| `weight`                  | `DECIMAL(5,2)` |                  | Cân nặng                           |
| `faceEmbedding`           | `VECTOR(512)`  |                  | Vector đặc trưng khuôn mặt         |
| `status`                  | `VARCHAR(20)`  | NOT NULL         | Trạng thái của sinh viên           |
| `createdAt`               | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo record               |
| `updatedAt`               | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm cập nhật record          |
 

`employees`

| Column            | Data Type      | Constraint       | Ý nghĩa                         |
| ----------------- | -------------- | ---------------- | ------------------------------- |
| `id`              | `BIGINT`       | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh |
| `employeeCode`    | `CHAR(10)`     | UNIQUE, NOT NULL | Mã nhân viên                    |
| `passwordHash`    | `VARCHAR(255)` | NOT NULL         | Mật khẩu đã hash                |
| `fullName`        | `VARCHAR(255)` | NOT NULL         | Họ và tên nhân viên             |
| `birthday`        | `DATE`         | NOT NULL         | Ngày sinh                       |
| `placeOfBirth`    | `VARCHAR(255)` | NOT NULL         | Nơi sinh                        |
| `gender`          | `VARCHAR(20)`  | NOT NULL         | Giới tính                       |
| `ethnicity`       | `VARCHAR(50)`  |                  | Dân tộc                         |
| `religion`        | `VARCHAR(50)`  |                  | Tôn giáo                        |
| `nationality`     | `VARCHAR(50)`  |                  | Quốc tịch                       |
| `personalEmail`   | `VARCHAR(255)` |                  | Email cá nhân                   |
| `workEmail`       | `VARCHAR(255)` | UNIQUE           | Email công việc                 |
| `phoneNumber`     | `VARCHAR(30)`  |                  | Số điện thoại                   |
| `citizenIdNumber` | `VARCHAR(30)`  | UNIQUE           | Số căn cước công dân            |
| `departmentId`    | `BIGINT`       | FK               | Đơn vị/phòng ban của nhân viên  |
| `role`            | `VARCHAR(50)`  | NOT NULL         | Vai trò của nhân viên           |
| `faceEmbedding`   | `VECTOR(512)`  |                  | Vector khuôn mặt                |
| `status`          | `VARCHAR(20)`  | NOT NULL         | Trạng thái nhân viên            |
| `createdAt`       | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo record            |
| `updatedAt`       | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm cập nhật record       |


- role: 
LECTURER,
STUDENT_AFFAIRS_OFFICER,
ACCOUNTANT,
ADMINISTRATOR
- departmentId để nullable vì adminstrator không thuộc khoa nào 
- status: ACTIVE,
INACTIVE,
SUSPENDED,
RETIRED

`refresh_tokens`

| Column       | Data Type      | Constraint       | Ý nghĩa                        |
| ------------ | -------------- | ---------------- | ------------------------------ |
| `id`         | `BIGINT`       | PK, NOT NULL     | ID duy nhất của refresh token  |
| `studentId`  | `BIGINT`       | FK               | Sinh viên sở hữu token         |
| `employeeId` | `BIGINT`       | FK               | Nhân viên sở hữu token         |
| `tokenHash`  | `VARCHAR(255)` | UNIQUE, NOT NULL | Giá trị hash của refresh token |
| `expiresAt`  | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm token hết hạn        |
| `revokedAt`  | `TIMESTAMPTZ`  |                  | Thời điểm token bị thu hồi     |
| `createdAt`  | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo token            |

`campus`

| Column        | Data Type      | Constraint       | Ý nghĩa                         |
| ------------- | -------------- | ---------------- | ------------------------------- |
| `id`          | `BIGINT`       | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh |
| `campusCode`  | `VARCHAR(20)`  | UNIQUE, NOT NULL | Mã cơ sở                        |
| `name`        | `VARCHAR(255)` | NOT NULL         | Tên cơ sở                       |
| `address`     | `VARCHAR(500)` | NOT NULL         | Địa chỉ của cơ sở               |
| `description` | `TEXT`         |                  | Mô tả thêm về cơ sở             |
| `status`      | `VARCHAR(20)`  | NOT NULL         | Trạng thái của cơ sở            |
| `createdAt`   | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo                   |
| `updatedAt`   | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm cập nhật              |

- status: ACTIVE,
INACTIVE, 
MAINTENANCE


`building`

| Column           | Data Type      | Constraint       | Ý nghĩa                         |
| ---------------- | -------------- | ---------------- | ------------------------------- |
| `id`             | `BIGINT`       | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh |
| `buildingCode`   | `VARCHAR(20)`  | UNIQUE, NOT NULL | Mã tòa nhà                      |
| `name`           | `VARCHAR(255)` | NOT NULL         | Tên tòa nhà                     |
| `campusId`       | `BIGINT`       | FK, NOT NULL     | Cơ sở mà tòa nhà thuộc về       |
| `numberOfFloors` | `INTEGER`      | NOT NULL         | Số tầng của tòa nhà             |
| `description`    | `TEXT`         |                  | Mô tả thêm về tòa nhà           |
| `status`         | `VARCHAR(20)`  | NOT NULL         | Trạng thái tòa nhà              |
| `createdAt`      | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo                   |
| `updatedAt`      | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm cập nhật              |

`classrooms`: cân nhắc thêm equiment để quản lý tài sản trong mỗi phòng

| Column        | Data Type      | Constraint   | Ý nghĩa                         |
| ------------- | -------------- | ------------ | ------------------------------- |
| `id`          | `BIGINT`       | PK, NOT NULL | ID duy nhất do hệ thống tự sinh |
| `roomCode`    | `VARCHAR(20)`  | NOT NULL     | Mã phòng                        |
| `name`        | `VARCHAR(255)` | NOT NULL     | Tên phòng                       |
| `buildingId`  | `BIGINT`       | FK, NOT NULL | Tòa nhà mà phòng thuộc về       |
| `floorNumber` | `INTEGER`      | NOT NULL     | Tầng của phòng                  |
| `capacity`    | `INTEGER`      | NOT NULL     | Sức chứa tối đa của phòng       |
| `roomType`    | `VARCHAR(30)`  | NOT NULL     | Loại phòng                      |
| `description` | `TEXT`         |              | Mô tả thêm về phòng             |
| `status`      | `VARCHAR(20)`  | NOT NULL     | Trạng thái phòng                |
| `createdAt`   | `TIMESTAMPTZ`  | NOT NULL     | Thời điểm tạo record            |
| `updatedAt`   | `TIMESTAMPTZ`  | NOT NULL     | Thời điểm cập nhật record       |

- roomType: LECTURE,
LABORATORY,
AUDITORIUM,
MEETING,
OTHER

- status: ACTIVE,
INACTIVE,
MAINTENANCE


`departments`

| Column           | Data Type      | Constraint       | Ý nghĩa                         |
| ---------------- | -------------- | ---------------- | ------------------------------- |
| `id`             | `BIGINT`       | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh |
| `departmentCode` | `VARCHAR(20)`  | UNIQUE, NOT NULL | Mã khoa/phòng ban               |
| `name`           | `VARCHAR(255)` | NOT NULL         | Tên khoa/phòng ban              |
| `departmentType` | `VARCHAR(30)`  | NOT NULL         | Loại đơn vị                     |
| `description`    | `TEXT`         |                  | Mô tả thêm                      |
| `status`         | `VARCHAR(20)`  | NOT NULL         | Trạng thái đơn vị               |
| `createdAt`      | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo                   |
| `updatedAt`      | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm cập nhật              |

- departmentType: ACADEMIC,
ADMINISTRATIVE

- status: ACTIVE,
INACTIVE


`majors`

| Column         | Data Type      | Constraint       | Ý nghĩa                         |
| -------------- | -------------- | ---------------- | ------------------------------- |
| `id`           | `BIGINT`       | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh |
| `majorCode`    | `VARCHAR(20)`  | UNIQUE, NOT NULL | Mã ngành                        |
| `name`         | `VARCHAR(255)` | NOT NULL         | Tên ngành học                   |
| `departmentId` | `BIGINT`       | FK, NOT NULL     | Khoa/phòng ban phụ trách ngành  |
| `description`  | `TEXT`         |                  | Mô tả về ngành                  |
| `status`       | `VARCHAR(20)`  | NOT NULL         | Trạng thái ngành                |
| `createdAt`    | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo                   |
| `updatedAt`    | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm cập nhật              |

- status: ACTIVE,
INACTIVE


`curriculums`

| Column           | Data Type      | Constraint       | Ý nghĩa                                  |
| ---------------- | -------------- | ---------------- | ---------------------------------------- |
| `id`             | `BIGINT`       | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh          |
| `curriculumCode` | `VARCHAR(30)`  | UNIQUE, NOT NULL | Mã chương trình đào tạo                  |
| `name`           | `VARCHAR(255)` | NOT NULL         | Tên chương trình đào tạo                 |
| `majorId`        | `BIGINT`       | FK, NOT NULL     | Ngành học áp dụng chương trình           |
| `cohort`         | `INTEGER`      | NOT NULL         | Khóa tuyển sinh áp dụng chương trình     |
| `totalCredits`   | `INTEGER`      | NOT NULL         | Tổng số tín chỉ cần hoàn thành           |
| `duration`       | `INTEGER`      | NOT NULL         | Thời gian đào tạo dự kiến, tính theo năm |
| `degree`         | `VARCHAR(100)` | NOT NULL         | Văn bằng được cấp sau khi hoàn thành     |
| `description`    | `TEXT`         |                  | Mô tả chương trình                       |
| `status`         | `VARCHAR(20)`  | NOT NULL         | Trạng thái chương trình                  |
| `createdAt`      | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo                            |
| `updatedAt`      | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm cập nhật                       |

- status: ACTIVE,
INACTIVE


`curriculum_courses`

| Column           | Data Type      | Constraint   | Ý nghĩa                                                   |
| ---------------- | -------------- | ------------ | --------------------------------------------------------- |
| `id`             | `BIGINT`       | PK, NOT NULL | ID duy nhất của bản ghi                                   |
| `curriculumId`   | `BIGINT`       | FK, NOT NULL | Chương trình đào tạo                                      |
| `courseId`       | `BIGINT`       | FK, NOT NULL | Học phần thuộc chương trình                               |
| `semesterNumber` | `INTEGER`      | NOT NULL     | Học kỳ dự kiến học trong chương trình                     |
| `isRequired`     | `BOOLEAN`      | NOT NULL     | Xác định học phần bắt buộc hay tự chọn                    |
| `minimumGrade`   | `DECIMAL(4,2)` |              | Điểm tối thiểu cần đạt nếu chương trình có quy định riêng |
| `createdAt`      | `TIMESTAMPTZ`  | NOT NULL     | Thời điểm tạo record                                      |
| `updatedAt`      | `TIMESTAMPTZ`  | NOT NULL     | Thời điểm cập nhật record                                 |



`semesters`

| Column           | Data Type      | Constraint       | Ý nghĩa                         |
| ---------------- | -------------- | ---------------- | ------------------------------- |
| `id`             | `BIGINT`       | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh |
| `semesterCode`   | `VARCHAR(30)`  | UNIQUE, NOT NULL | Mã học kỳ                       |
| `name`           | `VARCHAR(100)` | NOT NULL         | Tên học kỳ                      |
| `academicYear`   | `VARCHAR(9)`   | NOT NULL         | Năm học, ví dụ `2026-2027`      |
| `semesterNumber` | `INTEGER`      | NOT NULL         | Thứ tự học kỳ trong năm học     |
| `startDate`      | `DATE`         | NOT NULL         | Ngày bắt đầu học kỳ             |
| `endDate`        | `DATE`         | NOT NULL         | Ngày kết thúc học kỳ            |
| `status`         | `VARCHAR(20)`  | NOT NULL         | Trạng thái học kỳ               |
| `createdAt`      | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo record            |
| `updatedAt`      | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm cập nhật record       |

- status: UPCOMING,
ACTIVE,
COMPLETED


`courses`

| Column         | Data Type      | Constraint       | Ý nghĩa                         |
| -------------- | -------------- | ---------------- | ------------------------------- |
| `id`           | `BIGINT`       | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh |
| `courseCode`   | `VARCHAR(20)`  | UNIQUE, NOT NULL | Mã học phần                     |
| `name`         | `VARCHAR(255)` | NOT NULL         | Tên học phần                    |
| `credits`      | `SMALLINT`     | NOT NULL         | Số tín chỉ của học phần         |
| `departmentId` | `BIGINT`       | FK, NOT NULL     | Khoa/bộ phận phụ trách học phần |
| `description`  | `TEXT`         |                  | Mô tả nội dung học phần         |
| `status`       | `VARCHAR(20)`  | NOT NULL         | Trạng thái của học phần         |
| `createdAt`    | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo record            |
| `updatedAt`    | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm cập nhật record       |

- status: ACTIVE,
INACTIVE

`course_prerequisites`

| Column                 | Data Type      | Constraint   | Ý nghĩa                                      |
| ---------------------- | -------------- | ------------ | -------------------------------------------- |
| `id`                   | `BIGINT`       | PK, NOT NULL | ID duy nhất của quan hệ tiên quyết           |
| `courseId`             | `BIGINT`       | FK, NOT NULL | Học phần cần học                             |
| `prerequisiteCourseId` | `BIGINT`       | FK, NOT NULL | Học phần tiên quyết                          |
| `minimumGrade`         | `DECIMAL(4,2)` |              | Điểm tối thiểu cần đạt ở học phần tiên quyết |
| `createdAt`            | `TIMESTAMPTZ`  | NOT NULL     | Thời điểm tạo quan hệ                        |
| `updatedAt`            | `TIMESTAMPTZ`  | NOT NULL     | Thời điểm cập nhật quan hệ                   |


`course_sections`
| Column        | Data Type     | Constraint   | Ý nghĩa                           |
| ------------- | ------------- | ------------ | --------------------------------- |
| `id`          | `BIGINT`      | PK, NOT NULL | ID duy nhất do hệ thống tự sinh   |
| `sectionCode` | `VARCHAR(30)` | NOT NULL     | Mã lớp học phần                   |
| `courseId`    | `BIGINT`      | FK, NOT NULL | Học phần mà lớp học phần được mở  |
| `semesterId`  | `BIGINT`      | FK, NOT NULL | Học kỳ mà lớp học phần được mở    |
| `lecturerId`  | `BIGINT`      | FK, NOT NULL | Giảng viên phụ trách lớp          |
| `capacity`    | `INTEGER`     | NOT NULL     | Số lượng sinh viên tối đa của lớp |
| `status`      | `VARCHAR(20)` | NOT NULL     | Trạng thái lớp học phần           |
| `createdAt`   | `TIMESTAMPTZ` | NOT NULL     | Thời điểm tạo                     |
| `updatedAt`   | `TIMESTAMPTZ` | NOT NULL     | Thời điểm cập nhật                |

- status: DRAFT,
OPEN,
CLOSED,
CANCELLED,
COMPLETED

`course_section_schedules`
| Column            | Data Type     | Constraint   | Ý nghĩa                            |
| ----------------- | ------------- | ------------ | ---------------------------------- |
| `id`              | `BIGINT`      | PK, NOT NULL | ID duy nhất của lịch học           |
| `courseSectionId` | `BIGINT`      | FK, NOT NULL | Lớp học phần được áp dụng lịch này |
| `classroomId`     | `BIGINT`      | FK, NOT NULL | Phòng học                          |
| `dayOfWeek`       | `SMALLINT`    | NOT NULL     | Thứ trong tuần                     |
| `startTime`       | `TIME`        | NOT NULL     | Thời gian bắt đầu                  |
| `endTime`         | `TIME`        | NOT NULL     | Thời gian kết thúc                 |
| `createdAt`       | `TIMESTAMPTZ` | NOT NULL     | Thời điểm tạo record               |
| `updatedAt`       | `TIMESTAMPTZ` | NOT NULL     | Thời điểm cập nhật record          |


`enrollments`
| Column            | Data Type     | Constraint   | Ý nghĩa                         |
| ----------------- | ------------- | ------------ | ------------------------------- |
| `id`              | `BIGINT`      | PK, NOT NULL | ID duy nhất của lượt đăng ký    |
| `studentId`       | `BIGINT`      | FK, NOT NULL | Sinh viên đăng ký               |
| `courseSectionId` | `BIGINT`      | FK, NOT NULL | Lớp học phần được đăng ký       |
| `registeredAt`    | `TIMESTAMPTZ` | NOT NULL     | Thời điểm sinh viên đăng ký     |
| `status`          | `VARCHAR(20)` | NOT NULL     | Trạng thái đăng ký              |
| `droppedAt`       | `TIMESTAMPTZ` |              | Thời điểm sinh viên hủy đăng ký |
| `createdAt`       | `TIMESTAMPTZ` | NOT NULL     | Thời điểm tạo record            |
| `updatedAt`       | `TIMESTAMPTZ` | NOT NULL     | Thời điểm cập nhật record       |

- status: ENROLLED,
DROPPED,
CANCELLED,
COMPLETED


`grades`
| Column            | Data Type      | Constraint           | Ý nghĩa                         |
| ----------------- | -------------- | -------------------- | ------------------------------- |
| `id`              | `BIGINT`       | PK, NOT NULL         | ID duy nhất của bản ghi điểm    |
| `enrollmentId`    | `BIGINT`       | FK, UNIQUE, NOT NULL | Lượt đăng ký học phần tương ứng |
| `attendanceScore` | `DECIMAL(4,2)` |                      | Điểm chuyên cần                 |
| `midtermScore`    | `DECIMAL(4,2)` |                      | Điểm giữa kỳ                    |
| `finalScore`      | `DECIMAL(4,2)` |                      | Điểm cuối kỳ                    |
| `totalScore`      | `DECIMAL(4,2)` |                      | Điểm tổng kết                   |
| `letterGrade`     | `VARCHAR(5)`   |                      | Điểm chữ                        |
| `gradePoint`      | `DECIMAL(3,2)` |                      | Điểm quy đổi hệ 4               |
| `status`          | `VARCHAR(20)`  | NOT NULL             | Trạng thái của điểm             |
| `createdAt`       | `TIMESTAMPTZ`  | NOT NULL             | Thời điểm tạo                   |
| `updatedAt`       | `TIMESTAMPTZ`  | NOT NULL             | Thời điểm cập nhật              |
- status: DRAFT,
FINAL

`support_services`: nên có thêm support-request
| Column         | Data Type      | Constraint       | Ý nghĩa                         |
| -------------- | -------------- | ---------------- | ------------------------------- |
| `id`           | `BIGINT`       | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh |
| `serviceCode`  | `VARCHAR(30)`  | UNIQUE, NOT NULL | Mã dịch vụ hỗ trợ               |
| `name`         | `VARCHAR(255)` | NOT NULL         | Tên dịch vụ                     |
| `description`  | `TEXT`         |                  | Mô tả nội dung dịch vụ          |
| `departmentId` | `BIGINT`       | FK               | Phòng ban phụ trách dịch vụ     |
| `contactEmail` | `VARCHAR(255)` |                  | Email liên hệ                   |
| `contactPhone` | `VARCHAR(30)`  |                  | Số điện thoại liên hệ           |
| `status`       | `VARCHAR(20)`  | NOT NULL         | Trạng thái dịch vụ              |
| `createdAt`    | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm tạo record            |
| `updatedAt`    | `TIMESTAMPTZ`  | NOT NULL         | Thời điểm cập nhật record       |
- status: ACTIVE,
INACTIVE

`notifications`
| Column             | Data Type      | Constraint   | Ý nghĩa                              |
| ------------------ | -------------- | ------------ | ------------------------------------ |
| `id`               | `BIGINT`       | PK, NOT NULL | ID duy nhất của thông báo            |
| `title`            | `VARCHAR(255)` | NOT NULL     | Tiêu đề thông báo                    |
| `content`          | `TEXT`         | NOT NULL     | Nội dung thông báo                   |
| `notificationType` | `VARCHAR(30)`  | NOT NULL     | Loại thông báo                       |
| `priority`         | `VARCHAR(20)`  | NOT NULL     | Mức độ ưu tiên                       |
| `senderEmployeeId` | `BIGINT`       | FK           | Nhân viên tạo/gửi thông báo          |
| `scheduledAt`      | `TIMESTAMPTZ`  |              | Thời điểm dự kiến gửi thông báo      |
| `sentAt`           | `TIMESTAMPTZ`  |              | Thời điểm thông báo thực sự được gửi |
| `status`           | `VARCHAR(20)`  | NOT NULL     | Trạng thái thông báo                 |
| `createdAt`        | `TIMESTAMPTZ`  | NOT NULL     | Thời điểm tạo record                 |
| `updatedAt`        | `TIMESTAMPTZ`  | NOT NULL     | Thời điểm cập nhật record            |
- notificationType: SYSTEM, REGISTRATION_DEADLINE, SCHEDULE_CHANGE, GRADE_RELEASE, EVENT_ANNOUNCEMENT, SUPPORT_RESPONSE, SYSTEM_MAINTENANCE, OTHER
- priority: LOW, MEDIUM, HIGH, URGENT
- status: DRAFT,
SCHEDULED,
SENT,
CANCELLED

`notification_recipients`
| Column           | Data Type     | Constraint   | Ý nghĩa                            |
| ---------------- | ------------- | ------------ | ---------------------------------- |
| `id`             | `BIGINT`      | PK, NOT NULL | ID duy nhất của bản ghi người nhận |
| `notificationId` | `BIGINT`      | FK, NOT NULL | Thông báo được gửi                 |
| `studentId`      | `BIGINT`      | FK           | Sinh viên nhận thông báo           |
| `employeeId`     | `BIGINT`      | FK           | Nhân viên nhận thông báo           |
| `readAt`         | `TIMESTAMPTZ` |              | Thời điểm người nhận đọc thông báo |
| `createdAt`      | `TIMESTAMPTZ` | NOT NULL     | Thời điểm tạo bản ghi              |


`invoices`
| Column        | Data Type       | Constraint       | Ý nghĩa                         |
| ------------- | --------------- | ---------------- | ------------------------------- |
| `id`          | `BIGINT`        | PK, NOT NULL     | ID duy nhất do hệ thống tự sinh |
| `invoiceCode` | `VARCHAR(30)`   | UNIQUE, NOT NULL | Mã hóa đơn                      |
| `studentId`   | `BIGINT`        | FK, NOT NULL     | Sinh viên được lập hóa đơn      |
| `semesterId`  | `BIGINT`        | FK, NOT NULL     | Học kỳ áp dụng hóa đơn          |
| `amount`      | `DECIMAL(12,2)` | NOT NULL         | Tổng số tiền của hóa đơn        |
| `issuedAt`    | `TIMESTAMPTZ`   | NOT NULL         | Thời điểm phát hành hóa đơn     |
| `dueAt`       | `TIMESTAMPTZ`   | NOT NULL         | Hạn thanh toán                  |
| `paidAt`      | `TIMESTAMPTZ`   |                  | Thời điểm thanh toán            |
| `status`      | `VARCHAR(20)`   | NOT NULL         | Trạng thái hóa đơn              |
| `description` | `TEXT`          |                  | Mô tả/nội dung hóa đơn          |
| `createdAt`   | `TIMESTAMPTZ`   | NOT NULL         | Thời điểm tạo record            |
| `updatedAt`   | `TIMESTAMPTZ`   | NOT NULL         | Thời điểm cập nhật record       |

- status: PENDING,
PAID,
OVERDUE,
CANCELLED

`audit_logs`
| Column       | Data Type      | Constraint   | Ý nghĩa                              |
| ------------ | -------------- | ------------ | ------------------------------------ |
| `id`         | `BIGINT`       | PK, NOT NULL | ID duy nhất của log                  |
| `studentId`  | `BIGINT`       | FK           | Sinh viên thực hiện thao tác, nếu có |
| `employeeId` | `BIGINT`       | FK           | Nhân viên thực hiện thao tác, nếu có |
| `action`     | `VARCHAR(20)`  | NOT NULL     | Loại thao tác được thực hiện         |
| `tableName`  | `VARCHAR(100)` | NOT NULL     | Tên table bị tác động                |
| `recordId`   | `BIGINT`       |              | ID của record bị tác động            |
| `oldData`    | `JSONB`        |              | Dữ liệu trước khi thay đổi           |
| `newData`    | `JSONB`        |              | Dữ liệu sau khi thay đổi             |
| `ipAddress`  | `INET`         |              | Địa chỉ IP của người thực hiện       |
| `userAgent`  | `TEXT`         |              | Thông tin thiết bị/trình duyệt       |
| `createdAt`  | `TIMESTAMPTZ`  | NOT NULL     | Thời điểm thao tác                   |
- action: CREATE,
UPDATE,
DELETE,


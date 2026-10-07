CREATE TABLE students (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    studentCode CHAR(12) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,

    fullName VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    placeOfBirth VARCHAR(255) NOT NULL,

    majorId BIGINT NOT NULL,
    cohort INTEGER NOT NULL,

    gender VARCHAR(20) NOT NULL,
    ethnicity VARCHAR(50),
    religion VARCHAR(50),
    nationality VARCHAR(50),

    personalEmail VARCHAR(255),
    phoneNumber VARCHAR(30),
    citizenIdNumber VARCHAR(30) UNIQUE,

    hometownProvince VARCHAR(100),
    hometownCommune VARCHAR(100),
    hometownSpecificAddress VARCHAR(255),

    height DECIMAL(5,2),
    weight DECIMAL(5,2),

    faceEmbedding VECTOR(512),

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_students_major
        FOREIGN KEY (majorId)
        REFERENCES majors(id)
);


CREATE TABLE employees (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    employeeCode CHAR(10) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,

    fullName VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    placeOfBirth VARCHAR(255) NOT NULL,

    gender VARCHAR(20) NOT NULL,
    ethnicity VARCHAR(50),
    religion VARCHAR(50),
    nationality VARCHAR(50),

    personalEmail VARCHAR(255),
    workEmail VARCHAR(255) UNIQUE,
    phoneNumber VARCHAR(30),
    citizenIdNumber VARCHAR(30) UNIQUE,

    departmentId BIGINT,
    role VARCHAR(50) NOT NULL,

    faceEmbedding VECTOR(512),

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_employees_department
        FOREIGN KEY (departmentId)
        REFERENCES departments(id)
);
ALTER TABLE employees
ADD CONSTRAINT chk_employees_role
CHECK (
    role IN (
        'LECTURER',
        'STUDENT_AFFAIRS_OFFICER',
        'ACCOUNTANT',
        'ADMINISTRATOR'
    )
);
ALTER TABLE employees
ADD CONSTRAINT chk_employees_status
CHECK (
    status IN (
        'ACTIVE',
        'INACTIVE',
        'SUSPENDED',
        'RETIRED'
    )
);


CREATE TABLE refresh_tokens (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    studentId BIGINT,
    employeeId BIGINT,

    tokenHash VARCHAR(255) NOT NULL UNIQUE,

    expiresAt TIMESTAMPTZ NOT NULL,
    revokedAt TIMESTAMPTZ,

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_refresh_tokens_student
        FOREIGN KEY (studentId)
        REFERENCES students(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_refresh_tokens_employee
        FOREIGN KEY (employeeId)
        REFERENCES employees(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_refresh_tokens_owner
        CHECK (
            (studentId IS NOT NULL AND employeeId IS NULL)
            OR
            (studentId IS NULL AND employeeId IS NOT NULL)
        )
);
CREATE INDEX idx_refresh_tokens_student
    ON refresh_tokens(studentId);

CREATE INDEX idx_refresh_tokens_employee
    ON refresh_tokens(employeeId);

CREATE INDEX idx_refresh_tokens_expires_at
    ON refresh_tokens(expiresAt);


CREATE TABLE campuses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    campusCode VARCHAR(20) NOT NULL UNIQUE,

    name VARCHAR(255) NOT NULL,

    address VARCHAR(500) NOT NULL,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_campuses_status
        CHECK (status IN ('ACTIVE', 'INACTIVE'))
);


CREATE TABLE buildings (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    buildingCode VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,

    campusId BIGINT NOT NULL,

    numberOfFloors INTEGER NOT NULL,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_buildings_campus
        FOREIGN KEY (campusId)
        REFERENCES campuses(id),

    CONSTRAINT uq_buildings_campus_code
        UNIQUE (campusId, buildingCode),

    CONSTRAINT chk_buildings_number_of_floors
        CHECK (numberOfFloors > 0),

    CONSTRAINT chk_buildings_status
        CHECK (status IN ('ACTIVE', 'INACTIVE'))
);


CREATE TABLE classrooms (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    roomCode VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,

    buildingId BIGINT NOT NULL,

    floorNumber INTEGER NOT NULL,
    capacity INTEGER NOT NULL,

    roomType VARCHAR(30) NOT NULL,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_classrooms_building
        FOREIGN KEY (buildingId)
        REFERENCES buildings(id),

    CONSTRAINT uq_classrooms_building_code
        UNIQUE (buildingId, roomCode),

    CONSTRAINT chk_classrooms_floor_number
        CHECK (floorNumber > 0),

    CONSTRAINT chk_classrooms_capacity
        CHECK (capacity > 0),

    CONSTRAINT chk_classrooms_room_type
        CHECK (
            roomType IN (
                'LECTURE',
                'LABORATORY',
                'AUDITORIUM',
                'MEETING',
                'OTHER'
            )
        ),

    CONSTRAINT chk_classrooms_status
        CHECK (
            status IN (
                'ACTIVE',
                'INACTIVE',
                'MAINTENANCE'
            )
        )
);


CREATE TABLE departments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    departmentCode VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,

    departmentType VARCHAR(30) NOT NULL,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_departments_type
        CHECK (
            departmentType IN (
                'ACADEMIC',
                'ADMINISTRATIVE'
            )
        ),

    CONSTRAINT chk_departments_status
        CHECK (
            status IN (
                'ACTIVE',
                'INACTIVE'
            )
        )
);


CREATE TABLE majors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    majorCode VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,

    departmentId BIGINT NOT NULL,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_majors_department
        FOREIGN KEY (departmentId)
        REFERENCES departments(id),

    CONSTRAINT chk_majors_status
        CHECK (
            status IN (
                'ACTIVE',
                'INACTIVE'
            )
        )
);


CREATE TABLE curriculums (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    curriculumCode VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,

    majorId BIGINT NOT NULL,
    cohort INTEGER NOT NULL,

    totalCredits INTEGER NOT NULL,
    duration INTEGER NOT NULL,

    degree VARCHAR(100) NOT NULL,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_curriculums_major
        FOREIGN KEY (majorId)
        REFERENCES majors(id),

    CONSTRAINT chk_curriculums_cohort
        CHECK (cohort > 0),

    CONSTRAINT chk_curriculums_total_credits
        CHECK (totalCredits > 0),

    CONSTRAINT chk_curriculums_duration
        CHECK (duration > 0),

    CONSTRAINT chk_curriculums_status
        CHECK (
            status IN (
                'ACTIVE',
                'INACTIVE'
            )
        )
);


CREATE TABLE curriculum_courses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    curriculumId BIGINT NOT NULL,
    courseId BIGINT NOT NULL,

    semesterNumber INTEGER NOT NULL,

    isRequired BOOLEAN NOT NULL,

    minimumGrade DECIMAL(4,2),

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_curriculum_courses_curriculum
        FOREIGN KEY (curriculumId)
        REFERENCES curriculums(id),

    CONSTRAINT fk_curriculum_courses_course
        FOREIGN KEY (courseId)
        REFERENCES courses(id),

    CONSTRAINT uq_curriculum_courses
        UNIQUE (curriculumId, courseId),

    CONSTRAINT chk_curriculum_courses_semester
        CHECK (semesterNumber > 0),

    CONSTRAINT chk_curriculum_courses_minimum_grade
        CHECK (
            minimumGrade IS NULL
            OR (minimumGrade >= 0 AND minimumGrade <= 10)
        )
);


CREATE TABLE semesters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    semesterCode VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,

    academicYear VARCHAR(9) NOT NULL,
    semesterNumber INTEGER NOT NULL,

    startDate DATE NOT NULL,
    endDate DATE NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'UPCOMING',

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_semesters_number
        CHECK (semesterNumber > 0),

    CONSTRAINT chk_semesters_date
        CHECK (startDate < endDate),

    CONSTRAINT chk_semesters_status
        CHECK (
            status IN (
                'UPCOMING',
                'ACTIVE',
                'COMPLETED'
            )
        )
);


CREATE TABLE courses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    courseCode VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,

    credits SMALLINT NOT NULL,

    departmentId BIGINT NOT NULL,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_courses_department
        FOREIGN KEY (departmentId)
        REFERENCES departments(id),

    CONSTRAINT chk_courses_credits
        CHECK (credits > 0),

    CONSTRAINT chk_courses_status
        CHECK (
            status IN (
                'ACTIVE',
                'INACTIVE'
            )
        )
);


CREATE TABLE "course_prerequisites" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    "courseId" BIGINT NOT NULL,
    "prerequisiteCourseId" BIGINT NOT NULL,

    "minimumGrade" DECIMAL(4,2),

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_course_prerequisites_course"
        FOREIGN KEY ("courseId")
        REFERENCES "courses"("id"),

    CONSTRAINT "fk_course_prerequisites_prerequisite"
        FOREIGN KEY ("prerequisiteCourseId")
        REFERENCES "courses"("id"),

    CONSTRAINT "uq_course_prerequisites"
        UNIQUE ("courseId", "prerequisiteCourseId"),

    CONSTRAINT "chk_course_prerequisites_different_courses"
        CHECK ("courseId" <> "prerequisiteCourseId"),

    CONSTRAINT "chk_course_prerequisites_minimum_grade"
        CHECK (
            "minimumGrade" IS NULL
            OR ("minimumGrade" >= 0 AND "minimumGrade" <= 10)
        )
);


CREATE TABLE "course_sections" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    "sectionCode" VARCHAR(30) NOT NULL,

    "courseId" BIGINT NOT NULL,
    "semesterId" BIGINT NOT NULL,
    "lecturerId" BIGINT NOT NULL,

    "capacity" INTEGER NOT NULL,

    "status" VARCHAR(20) NOT NULL DEFAULT 'DRAFT',

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_course_sections_course"
        FOREIGN KEY ("courseId")
        REFERENCES "courses"("id"),

    CONSTRAINT "fk_course_sections_semester"
        FOREIGN KEY ("semesterId")
        REFERENCES "semesters"("id"),

    CONSTRAINT "fk_course_sections_lecturer"
        FOREIGN KEY ("lecturerId")
        REFERENCES "employees"("id"),

    CONSTRAINT "uq_course_sections_semester_code"
        UNIQUE ("semesterId", "sectionCode"),

    CONSTRAINT "chk_course_sections_capacity"
        CHECK ("capacity" > 0),

    CONSTRAINT "chk_course_sections_status"
        CHECK (
            "status" IN (
                'DRAFT',
                'OPEN',
                'CLOSED',
                'CANCELLED',
                'COMPLETED'
            )
        )
);


CREATE TABLE "course_section_schedules" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    "courseSectionId" BIGINT NOT NULL,
    "classroomId" BIGINT NOT NULL,

    "dayOfWeek" SMALLINT NOT NULL,

    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_course_section_schedules_course_section"
        FOREIGN KEY ("courseSectionId")
        REFERENCES "course_sections"("id"),

    CONSTRAINT "fk_course_section_schedules_classroom"
        FOREIGN KEY ("classroomId")
        REFERENCES "classrooms"("id"),

    CONSTRAINT "chk_course_section_schedules_day"
        CHECK ("dayOfWeek" BETWEEN 1 AND 7),

    CONSTRAINT "chk_course_section_schedules_time"
        CHECK ("startTime" < "endTime"),

    CONSTRAINT "uq_course_section_schedules"
        UNIQUE (
            "courseSectionId",
            "dayOfWeek",
            "startTime",
            "endTime"
        )
);

CREATE TABLE "enrollments" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    "studentId" BIGINT NOT NULL,
    "courseSectionId" BIGINT NOT NULL,

    "registeredAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    "status" VARCHAR(20) NOT NULL DEFAULT 'ENROLLED',

    "droppedAt" TIMESTAMPTZ,

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_enrollments_student"
        FOREIGN KEY ("studentId")
        REFERENCES "students"("id"),

    CONSTRAINT "fk_enrollments_course_section"
        FOREIGN KEY ("courseSectionId")
        REFERENCES "course_sections"("id"),

    CONSTRAINT "uq_enrollments_student_course_section"
        UNIQUE ("studentId", "courseSectionId"),

    CONSTRAINT "chk_enrollments_status"
        CHECK (
            "status" IN (
                'ENROLLED',
                'DROPPED',
                'CANCELLED'
            )
        ),

    CONSTRAINT "chk_enrollments_dropped_at"
        CHECK (
            ("status" = 'DROPPED' AND "droppedAt" IS NOT NULL)
            OR
            ("status" <> 'DROPPED')
        )
);

CREATE TABLE "grades" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    "enrollmentId" BIGINT NOT NULL UNIQUE,

    "attendanceScore" DECIMAL(4,2),
    "midtermScore" DECIMAL(4,2),
    "finalScore" DECIMAL(4,2),

    "totalScore" DECIMAL(4,2),

    "letterGrade" VARCHAR(5),
    "gradePoint" DECIMAL(3,2),

    "status" VARCHAR(20) NOT NULL DEFAULT 'DRAFT',

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_grades_enrollment"
        FOREIGN KEY ("enrollmentId")
        REFERENCES "enrollments"("id"),

    CONSTRAINT "chk_grades_attendance_score"
        CHECK (
            "attendanceScore" IS NULL
            OR ("attendanceScore" BETWEEN 0 AND 10)
        ),

    CONSTRAINT "chk_grades_midterm_score"
        CHECK (
            "midtermScore" IS NULL
            OR ("midtermScore" BETWEEN 0 AND 10)
        ),

    CONSTRAINT "chk_grades_final_score"
        CHECK (
            "finalScore" IS NULL
            OR ("finalScore" BETWEEN 0 AND 10)
        ),

    CONSTRAINT "chk_grades_total_score"
        CHECK (
            "totalScore" IS NULL
            OR ("totalScore" BETWEEN 0 AND 10)
        ),

    CONSTRAINT "chk_grades_grade_point"
        CHECK (
            "gradePoint" IS NULL
            OR ("gradePoint" BETWEEN 0 AND 4)
        ),

    CONSTRAINT "chk_grades_status"
        CHECK (
            "status" IN (
                'DRAFT',
                'FINAL'
            )
        )
);

CREATE TABLE "support_services" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    "serviceCode" VARCHAR(30) NOT NULL UNIQUE,
    "name" VARCHAR(255) NOT NULL,

    "description" TEXT,

    "departmentId" BIGINT,

    "contactEmail" VARCHAR(255),
    "contactPhone" VARCHAR(30),

    "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_support_services_department"
        FOREIGN KEY ("departmentId")
        REFERENCES "departments"("id"),

    CONSTRAINT "chk_support_services_status"
        CHECK (
            "status" IN (
                'ACTIVE',
                'INACTIVE'
            )
        )
);


CREATE TABLE "notifications" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,

    "notificationType" VARCHAR(30) NOT NULL,
    "priority" VARCHAR(20) NOT NULL DEFAULT 'NORMAL',

    "senderEmployeeId" BIGINT,

    "scheduledAt" TIMESTAMPTZ,
    "sentAt" TIMESTAMPTZ,

    "status" VARCHAR(20) NOT NULL DEFAULT 'DRAFT',

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_notifications_sender_employee"
        FOREIGN KEY ("senderEmployeeId")
        REFERENCES "employees"("id"),

    CONSTRAINT "chk_notifications_type"
        CHECK (
            "notificationType" IN (
                'ACADEMIC',
                'ENROLLMENT',
                'GRADE',
                'SCHEDULE',
                'PAYMENT',
                'SYSTEM',
                'GENERAL'
            )
        ),

    CONSTRAINT "chk_notifications_priority"
        CHECK (
            "priority" IN (
                'LOW',
                'NORMAL',
                'HIGH',
                'URGENT'
            )
        ),

    CONSTRAINT "chk_notifications_status"
        CHECK (
            "status" IN (
                'DRAFT',
                'SCHEDULED',
                'SENT',
                'CANCELLED'
            )
        ),

    CONSTRAINT "chk_notifications_schedule"
        CHECK (
            "status" <> 'SCHEDULED'
            OR "scheduledAt" IS NOT NULL
        ),

    CONSTRAINT "chk_notifications_sent"
        CHECK (
            "status" <> 'SENT'
            OR "sentAt" IS NOT NULL
        )
);

CREATE TABLE "notification_recipients" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    "notificationId" BIGINT NOT NULL,

    "studentId" BIGINT,
    "employeeId" BIGINT,

    "readAt" TIMESTAMPTZ,

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_notification_recipients_notification"
        FOREIGN KEY ("notificationId")
        REFERENCES "notifications"("id"),

    CONSTRAINT "fk_notification_recipients_student"
        FOREIGN KEY ("studentId")
        REFERENCES "students"("id"),

    CONSTRAINT "fk_notification_recipients_employee"
        FOREIGN KEY ("employeeId")
        REFERENCES "employees"("id"),

    CONSTRAINT "chk_notification_recipients_owner"
        CHECK (
            ("studentId" IS NOT NULL AND "employeeId" IS NULL)
            OR
            ("studentId" IS NULL AND "employeeId" IS NOT NULL)
        )
);
CREATE UNIQUE INDEX "uq_notification_recipients_student"
ON "notification_recipients" ("notificationId", "studentId")
WHERE "studentId" IS NOT NULL;

CREATE UNIQUE INDEX "uq_notification_recipients_employee"
ON "notification_recipients" ("notificationId", "employeeId")
WHERE "employeeId" IS NOT NULL;


CREATE TABLE "invoices" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    "invoiceCode" VARCHAR(30) NOT NULL UNIQUE,

    "studentId" BIGINT NOT NULL,
    "semesterId" BIGINT NOT NULL,

    "amount" DECIMAL(12,2) NOT NULL,

    "issuedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueAt" TIMESTAMPTZ NOT NULL,
    "paidAt" TIMESTAMPTZ,

    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    "description" TEXT,

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_invoices_student"
        FOREIGN KEY ("studentId")
        REFERENCES "students"("id"),

    CONSTRAINT "fk_invoices_semester"
        FOREIGN KEY ("semesterId")
        REFERENCES "semesters"("id"),

    CONSTRAINT "chk_invoices_amount"
        CHECK ("amount" >= 0),

    CONSTRAINT "chk_invoices_due_date"
        CHECK ("dueAt" >= "issuedAt"),

    CONSTRAINT "chk_invoices_status"
        CHECK (
            "status" IN (
                'PENDING',
                'PAID',
                'OVERDUE',
                'CANCELLED'
            )
        ),

    CONSTRAINT "chk_invoices_paid_at"
        CHECK (
            ("status" = 'PAID' AND "paidAt" IS NOT NULL)
            OR
            ("status" <> 'PAID')
        )
);


CREATE TABLE "audit_logs" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    "studentId" BIGINT,
    "employeeId" BIGINT,

    "action" VARCHAR(20) NOT NULL,

    "tableName" VARCHAR(100) NOT NULL,
    "recordId" BIGINT,

    "oldData" JSONB,
    "newData" JSONB,

    "ipAddress" INET,
    "userAgent" TEXT,

    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fk_audit_logs_student"
        FOREIGN KEY ("studentId")
        REFERENCES "students"("id")
        ON DELETE SET NULL,

    CONSTRAINT "fk_audit_logs_employee"
        FOREIGN KEY ("employeeId")
        REFERENCES "employees"("id")
        ON DELETE SET NULL,

    CONSTRAINT "chk_audit_logs_actor"
        CHECK (
            ("studentId" IS NULL AND "employeeId" IS NULL)
            OR
            ("studentId" IS NOT NULL AND "employeeId" IS NULL)
            OR
            ("studentId" IS NULL AND "employeeId" IS NOT NULL)
        ),

    CONSTRAINT "chk_audit_logs_action"
        CHECK (
            "action" IN (
                'CREATE',
                'UPDATE',
                'DELETE'
            )
        )
);
CREATE INDEX "idx_audit_logs_student"
    ON "audit_logs" ("studentId");

CREATE INDEX "idx_audit_logs_employee"
    ON "audit_logs" ("employeeId");

CREATE INDEX "idx_audit_logs_target"
    ON "audit_logs" ("tableName", "recordId");

CREATE INDEX "idx_audit_logs_created_at"
    ON "audit_logs" ("createdAt");
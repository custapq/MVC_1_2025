-- CreateTable
CREATE TABLE "Students" (
    "student_id" TEXT NOT NULL PRIMARY KEY,
    "student_tile" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "student_surname" TEXT NOT NULL,
    "student_birthdate" DATETIME NOT NULL,
    "student_age" INTEGER NOT NULL,
    "student_school" TEXT NOT NULL,
    "student_email" TEXT NOT NULL,
    "student_subjectStructure_id" TEXT NOT NULL,
    CONSTRAINT "Students_student_subjectStructure_id_fkey" FOREIGN KEY ("student_subjectStructure_id") REFERENCES "SubjectStructure" ("subjectstructure_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subjects" (
    "subject_id" TEXT NOT NULL PRIMARY KEY,
    "subject_name" TEXT NOT NULL,
    "subject_credit" INTEGER NOT NULL,
    "subject_teacher" TEXT NOT NULL,
    "subject_requiriste_id" TEXT,
    CONSTRAINT "Subjects_subject_requiriste_id_fkey" FOREIGN KEY ("subject_requiriste_id") REFERENCES "Subjects" ("subject_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubjectStructure" (
    "subjectstructure_id" TEXT NOT NULL PRIMARY KEY,
    "subjectstructure_name" TEXT NOT NULL,
    "subjectstructure_department_name" TEXT NOT NULL,
    "subject_require_id" TEXT NOT NULL,
    "subjectstructure_term" INTEGER NOT NULL,
    CONSTRAINT "SubjectStructure_subject_require_id_fkey" FOREIGN KEY ("subject_require_id") REFERENCES "Subjects" ("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RegisteredSubjects" (
    "registeredsuject_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    CONSTRAINT "RegisteredSubjects_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students" ("student_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RegisteredSubjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects" ("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_student_email_key" ON "Students"("student_email");

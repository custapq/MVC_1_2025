/*
  Warnings:

  - You are about to alter the column `student_subjectStructure_id` on the `Students` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `SubjectStructure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `subjectstructure_code` to the `SubjectStructure` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Students" (
    "student_id" TEXT NOT NULL PRIMARY KEY,
    "student_tile" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "student_surname" TEXT NOT NULL,
    "student_birthdate" DATETIME NOT NULL,
    "student_age" INTEGER NOT NULL,
    "student_school" TEXT NOT NULL,
    "student_email" TEXT NOT NULL,
    "student_subjectStructure_id" INTEGER NOT NULL,
    "student_user_id" INTEGER NOT NULL,
    CONSTRAINT "Students_student_user_id_fkey" FOREIGN KEY ("student_user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Students_student_subjectStructure_id_fkey" FOREIGN KEY ("student_subjectStructure_id") REFERENCES "SubjectStructure" ("subjectstructure_code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Students" ("student_age", "student_birthdate", "student_email", "student_id", "student_name", "student_school", "student_subjectStructure_id", "student_surname", "student_tile", "student_user_id") SELECT "student_age", "student_birthdate", "student_email", "student_id", "student_name", "student_school", "student_subjectStructure_id", "student_surname", "student_tile", "student_user_id" FROM "Students";
DROP TABLE "Students";
ALTER TABLE "new_Students" RENAME TO "Students";
CREATE UNIQUE INDEX "Students_student_email_key" ON "Students"("student_email");
CREATE UNIQUE INDEX "Students_student_user_id_key" ON "Students"("student_user_id");
CREATE TABLE "new_SubjectStructure" (
    "subjectstructure_code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subjectstructure_id" TEXT NOT NULL,
    "subjectstructure_name" TEXT NOT NULL,
    "subjectstructure_department_name" TEXT NOT NULL,
    "subject_require_id" TEXT NOT NULL,
    "subjectstructure_term" INTEGER NOT NULL,
    CONSTRAINT "SubjectStructure_subject_require_id_fkey" FOREIGN KEY ("subject_require_id") REFERENCES "Subjects" ("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SubjectStructure" ("subject_require_id", "subjectstructure_department_name", "subjectstructure_id", "subjectstructure_name", "subjectstructure_term") SELECT "subject_require_id", "subjectstructure_department_name", "subjectstructure_id", "subjectstructure_name", "subjectstructure_term" FROM "SubjectStructure";
DROP TABLE "SubjectStructure";
ALTER TABLE "new_SubjectStructure" RENAME TO "SubjectStructure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

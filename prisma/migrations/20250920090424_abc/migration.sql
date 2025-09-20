/*
  Warnings:

  - Added the required column `student_user_id` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_role" TEXT NOT NULL
);

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
    "student_subjectStructure_id" TEXT NOT NULL,
    "student_user_id" INTEGER NOT NULL,
    CONSTRAINT "Students_student_user_id_fkey" FOREIGN KEY ("student_user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Students_student_subjectStructure_id_fkey" FOREIGN KEY ("student_subjectStructure_id") REFERENCES "SubjectStructure" ("subjectstructure_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Students" ("student_age", "student_birthdate", "student_email", "student_id", "student_name", "student_school", "student_subjectStructure_id", "student_surname", "student_tile") SELECT "student_age", "student_birthdate", "student_email", "student_id", "student_name", "student_school", "student_subjectStructure_id", "student_surname", "student_tile" FROM "Students";
DROP TABLE "Students";
ALTER TABLE "new_Students" RENAME TO "Students";
CREATE UNIQUE INDEX "Students_student_email_key" ON "Students"("student_email");
CREATE UNIQUE INDEX "Students_student_user_id_key" ON "Students"("student_user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

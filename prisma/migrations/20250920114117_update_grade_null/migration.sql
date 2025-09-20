-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RegisteredSubjects" (
    "registeredsuject_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "grade" TEXT,
    CONSTRAINT "RegisteredSubjects_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students" ("student_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RegisteredSubjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects" ("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RegisteredSubjects" ("grade", "registeredsuject_id", "student_id", "subject_id") SELECT "grade", "registeredsuject_id", "student_id", "subject_id" FROM "RegisteredSubjects";
DROP TABLE "RegisteredSubjects";
ALTER TABLE "new_RegisteredSubjects" RENAME TO "RegisteredSubjects";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

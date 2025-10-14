import { body, query } from "express-validator";

export const submitAttendanceValidation = [
  body("date").notEmpty().withMessage("date is required").isISO8601(),
  body("entries").isArray({ min: 1 }).withMessage("entries must be a non-empty array"),

  body("classId").optional().isInt(),
  body("className").optional().isString(),
  body("subjectId").optional().isInt(),
  body("subjectName").optional().isString(),

  body().custom((value) => {
    if (!value.classId && !value.className) {
      throw new Error("Either classId or className is required");
    }
    if (!value.subjectId && !value.subjectName) {
      throw new Error("Either subjectId or subjectName is required");
    }
    return true;
  }),

  body("entries.*.studentId").optional().isInt(),
  body("entries.*.rollNo").optional().isString().bail().customSanitizer((v) => (v != null ? String(v) : v)),
  body("entries.*.status").isIn(["present", "absent", "late", "excused"]),
  body("entries.*.remarks").optional().isString(),
  body("entries").custom((entries) => {
    if (!Array.isArray(entries)) return true;
    for (const e of entries) {
      if (!e || (!e.studentId && !e.rollNo)) {
        throw new Error("Each entry must have either studentId or rollNo");
      }
    }
    return true;
  }),
];

export const listAttendanceQueryValidation = [
  query("studentId").optional().isInt(),
  query("fromDate").optional().isISO8601(),
  query("toDate").optional().isISO8601(),
  query("classId").optional().isInt(),
  query("subjectId").optional().isInt(),
];


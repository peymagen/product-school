import { body, query } from "express-validator";

export const createHomeworkValidation = [
  body("title")
     .notEmpty()
     .withMessage("title is required")
     .isString(),
  body(["classId", "className"]).custom((_, { req }) => {
    const { classId, className } = req.body;
    if (classId == null && !className) {
      throw new Error("Either classId or className is required");
    }
    if (classId != null && !Number.isInteger(Number(classId))) {
      throw new Error("classId must be an integer");
    }
    if (className != null && typeof className !== "string") {
      throw new Error("className must be a string");
    }
    return true;
  }),
  body(["subjectId", "subjectName"]).custom((_, { req }) => {
    const { subjectId, subjectName } = req.body;
    if (subjectId == null && !subjectName) {
      throw new Error("Either subjectId or subjectName is required");
    }
    if (subjectId != null && !Number.isInteger(Number(subjectId))) {
      throw new Error("subjectId must be an integer");
    }
    if (subjectName != null && typeof subjectName !== "string") {
      throw new Error("subjectName must be a string");
    }
    return true;
  }),
  body("assignedById")
       .notEmpty()
       .withMessage("assignedById is required")
       .isInt(),
  body("description")   
       .optional()
       .isString(),
  body("dueDate")
       .optional()
       .isISO8601(),
];

export const listHomeworkQueryValidation = [
  query("classId")
        .optional()
        .isInt(),
  query("subjectId")
        .optional()
        .isInt(),
  query("assignedById")
        .optional()
        .isInt(),
  query("dueBefore")
        .optional()
        .isISO8601(),
  query("dueAfter")
        .optional()
        .isISO8601(),
    ];


export const submitHomeworkValidation = [
  body("homeworkId")
    .notEmpty()
    .withMessage("homeworkId is required")
    .isInt(),
  body("studentId")
    .notEmpty()
    .withMessage("studentId is required")
    .isInt(),
  body("content")
    .optional()
    .isString(),
  body("submittedOn")
    .optional()
    .isISO8601()
    .withMessage("submittedOn must be a valid date"),
  body("status")
    .optional()
    .isIn(["submitted", "graded", "returned"])
    .withMessage("Invalid status"),
  body("grade")
    .optional()
    .isString(),
  body("remarks")
    .optional()
    .isString(),
  // allow either a file or non-empty content
  body("attachment").custom((_, { req }) => {
    const file = req.file;
    const hasContent = typeof req.body.content === "string" && req.body.content.trim().length > 0;
    if (!file && !hasContent) {
      throw new Error("Either an attachment file (photo or PDF) or content is required");
    }
    if (file) {
      const allowed = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowed.includes(file.mimetype)) {
        throw new Error("Only PDF or image files are allowed");
      }
    }
    return true;
  }),
];

export const confirmSubmissionValidation = [
  body("submissionId")
    .optional()
    .isInt(),
  body("status")
    .optional()
    .isIn(["graded", "returned"]) 
    .withMessage("invalid status"),
  body("grade")
    .optional()
    .isString(),
  body("remarks")
    .optional()
    .isString(),
];

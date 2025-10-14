import { body, query } from "express-validator";

export const createMarkValidation  = [
  body("studentId").optional().isInt().withMessage("studentId must be an integer"),
  body("rollNo").optional().isString().withMessage("rollNo must be a string"),
  body(["studentId", "rollNo"]).custom((_, { req }) => {
    if (req.body.studentId == null && !req.body.rollNo) {
      throw new Error("Either studentId or rollNo is required");
    }
    return true;
  }),
  body("examId")
    .optional()
    .isInt()
    .withMessage("examId must be an integer"),
  body("examName")
    .optional()
    .isString()
    .withMessage("examName must be a string"),
  body("termName")
    .optional()
    .isString()
    .withMessage("termName must be a string"),
  body("className")
    .optional()
    .isString()
    .withMessage("className must be a string"),
  
  body("subjectId")
    .optional()
    .isInt()
    .withMessage("subjectId must be an integer"),
  body("subjectName")
    .optional()
    .isString()
    .withMessage("subjectName must be a string"),
  body("score")
    .optional()
    .isFloat()
    .withMessage("score must be a number"),
  body("grade")
    .optional()
    .isString()
    .withMessage("grade must be a string"),
  body("remarks")
    .optional()
    .isString()
    .withMessage("remarks must be a string"),
  body("total")
    .optional()
    .isFloat()
    .withMessage("total must be a number"),
  body("position")
    .optional()
    .isInt()
    .withMessage("position must be an integer"),
  body("termId")
    .optional()
    .isInt()
    .withMessage("termId must be an integer"),
  body("classId")
    .optional()
    .isInt()
    .withMessage("classId must be an integer"),
  body("date")
    .optional()
    .isISO8601()   //yyyy - mm - dd format 
    .withMessage("date must be a valid ISO date"),
  body(["score", "grade"]) 
    .custom((_, { req }) => {
      if (req.body.score == null && req.body.grade == null) {
        throw new Error("Either score or grade is required");
      }
      return true;
    }),
];

export const getMyMarksQueryValidation  = [
  query("studentId").optional().isInt().withMessage("studentId must be an integer"),
  query("rollNo").optional().isString().withMessage("rollNo must be a string"),
  query("examId").optional().isInt().withMessage("examId must be an integer"),
  query("termId").optional().isInt().withMessage("termId must be an integer"),
  query("classId").optional().isInt().withMessage("classId must be an integer"),
  query(["studentId", "rollNo"]).custom((_, { req }) => {
    const q = req.query as any;
    if (!req.params?.id && q?.studentId == null && !q?.rollNo) {
      throw new Error("Either studentId (param or query) or rollNo is required");
    }
    return true;
  }),
];

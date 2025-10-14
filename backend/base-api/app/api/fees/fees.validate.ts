// base-api/app/api/fees/fees.validate.ts
import { body, query, param } from "express-validator";

export const CreateFeeInput  = [
  body("rollNo").notEmpty().withMessage("rollNo required"),
  body("amount").notEmpty().isFloat({ gt: 0 }).withMessage("amount must be > 0"),
  body("dueDate").notEmpty().isDate().withMessage("dueDate must be a valid date"),
  body("title").notEmpty().isString().withMessage("title must be a string"),
  body("branchName").notEmpty().isString().withMessage("branchName must be a string"),
  body("className").notEmpty().isString().withMessage("className must be a string"),
  body("status").optional().isString().withMessage("status must be a string"),
]

export const listMyFeesValidation = [
  query("studentId").optional().isInt().withMessage("studentId must be an integer"),
  query("rollNo").optional().isString().withMessage("rollNo must be a string"),
];

export const myFeesStatusValidation = [
  query("studentId").optional().isInt().withMessage("studentId must be an integer"),
  query("rollNo").optional().isString().withMessage("rollNo must be a string"),
];





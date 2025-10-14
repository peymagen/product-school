import { body, query } from "express-validator";

export const listTcValidation = [
  // legacy options
  query("studentId").optional().isInt().withMessage("studentId must be an integer"),
  query("classId").optional().isInt().withMessage("classId must be an integer"),
  // new options
  query("rollNo").optional().isString().withMessage("rollNo must be a string"),
  query("className").optional().isString().withMessage("className must be a string"),
  query("status")
    .optional()
    .isIn(["pending", "approved", "rejected"]) 
    .withMessage("status must be one of: pending, approved, rejected"),
];

export const createTcValidation = [
  // new required input
  body("rollNo").notEmpty().withMessage("rollNo is required").isString().withMessage("rollNo must be a string"),
  // optional metadata
  body("reason").optional().isString().withMessage("reason must be a string"),
  body("requestedDate").optional().isISO8601().withMessage("requestedDate must be an ISO date"),
  // optional class name (resolved internally)
  body("className").optional().isString().withMessage("className must be a string"),
  // legacy
  body("studentId").optional().isInt().withMessage("studentId must be an integer"),
  body("classId").optional().isInt().withMessage("classId must be an integer"),
];

export const updateTcStatusValidation = [
  body("id").notEmpty().withMessage("id is required").isInt().withMessage("id must be an integer"),
  body("status")
    .notEmpty()
    .withMessage("status is required")
    .isIn(["approved", "rejected"]).withMessage("status must be approved or rejected"),
  body("processedDate").optional().isISO8601().withMessage("processedDate must be an ISO date"),
];

export const updateTcFieldsValidation = [
  body("id").notEmpty().withMessage("id is required").isInt().withMessage("id must be an integer"),
  // allow either classId or className
  body("classId").optional().isInt().withMessage("classId must be an integer"),
  body("className").optional().isString().withMessage("className must be a string"),
  body("processedDate").optional().isISO8601().withMessage("processedDate must be an ISO date"),
];

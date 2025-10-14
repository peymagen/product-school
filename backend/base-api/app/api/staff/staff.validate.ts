import { body, query } from "express-validator";

export const createStaffValidation = [
  body("user_id").notEmpty().withMessage("user_id is required").isInt({ gt: 0 }),
  body("employee_id").optional().isString(),
  body("department").optional().isString(),
  body("position").optional().isString(),
];

export const updateStaffValidation = [
  body("user_id").optional().isInt({ gt: 0 }),
  body("employee_id").optional().isString(),
  body("department").optional().isString(),
  body("position").optional().isString(),
];

export const listStaffQueryValidation = [
  query("user_id").optional().isInt({ gt: 0 }),
  query("department").optional().isString(),
  query("position").optional().isString(),
];

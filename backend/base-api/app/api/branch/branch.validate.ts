import { body, query, param } from "express-validator";

export const createBranchValidation = [
  body("name").notEmpty().withMessage("name is required").isString(),
  body("code").optional().isString(),
  body("address").optional().isString(),
  body("phone").optional().isString(),
  body("email").optional().isEmail().withMessage("email must be valid"),
  body("status").optional().isIn(["active", "inactive"]).withMessage("invalid status"),
];

export const updateBranchValidation = [
  body("name").optional().isString(),
  body("code").optional().isString(),
  body("address").optional().isString(),
  body("phone").optional().isString(),
  body("email").optional().isEmail().withMessage("email must be valid"),
  body("status").optional().isIn(["active", "inactive"]).withMessage("invalid status"),
];

export const updateBranchParamValidation = [
  param("name").notEmpty().withMessage("name param is required").isString(),
];

export const listBranchQueryValidation = [
  query("name").optional().isString(),
  query("status").optional().isIn(["active", "inactive"]).withMessage("invalid status"),
];

export const getBranchByIdValidation = [
  query("name").optional().isString(),
];
import { body, query, param } from "express-validator";
import createHttpError from "http-errors";
import { type Request, type Response, type NextFunction } from "express";

export const createClassRoutineValidation = [
  body("fileName")
    .notEmpty()
    .withMessage("fileName is required")
    .isString()
    .withMessage("fileName must be a string"),
  body("originalName")
    .optional()
    .isString()
    .withMessage("originalName must be a string"),
  body("url")
    .notEmpty()
    .withMessage("url is required")
    .isString()
    .withMessage("url must be a string"),
  body("class")
    .optional()
    .isString()
    .withMessage("class must be a string"),
  body("section")
    .optional()
    .isString()
    .withMessage("section must be a string"),
  body("branchId")
    .optional()
    .isInt()
    .withMessage("branchId must be an integer"),
  body("uploadedBy")
    .optional()
    .isInt()
    .withMessage("uploadedBy must be an integer"),
];

export const getClassRoutinesQueryValidation = [
  query("class").optional().isString().withMessage("class must be a string"),
  query("section").optional().isString().withMessage("section must be a string"),
  query("branchId").optional().isInt().withMessage("branchId must be an integer"),
  query("uploadedBy").optional().isInt().withMessage("uploadedBy must be an integer"),
  query("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
];

// export const classRoutineIdParamValidation = [
//   param("className").optional().isString().withMessage("className must be a string"),
//   param("branchName").optional().isString().withMessage("branchName must be a string"),
// ];

export const deleteByNameValidation = [
  body("className").optional().isString().withMessage("className must be a string"),
  body("branchName").optional().isString().withMessage("branchName must be a string"),
  query("className").optional().isString().withMessage("className must be a string"),
  query("branchName").optional().isString().withMessage("branchName must be a string"),
];

// Validate metadata for upload (all optional)
export const uploadClassRoutineValidation = [
  body("class").optional().isString().withMessage("class must be a string"),
  body("branchId").optional().isInt().withMessage("branchId must be an integer"),
];

// Ensure a file is present in the request (multer attaches req.file)
export const requireFileUpload = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!(req as any).file) {
    // Use http-errors so global error handler shapes the response
    return next(createHttpError(400, "File is required"));
  }
  next();
};

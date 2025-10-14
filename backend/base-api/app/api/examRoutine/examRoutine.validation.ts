import { body, query, param } from "express-validator";
import createHttpError from "http-errors";
import { type Request, type Response, type NextFunction } from "express";

export const createExamRoutineValidation = [
  body("fileName").isString().notEmpty().withMessage("fileName is required"),
  body("originalName").optional().isString(),
  body("examName").isString().notEmpty().withMessage("examName is required"),
  body("url").isString().notEmpty().withMessage("url is required"),
  body("class").optional().isString(),
  body("branchId").optional().isInt(),
  body("uploadedBy").optional().isInt(),
  body("fileSize").optional().isInt(),
  body("mimeType").optional().isString(),
  body("status").optional().isBoolean(),
  body("publicId").optional().isString(),
  body("notes").optional().isString(),
];

export const getExamRoutinesQueryValidation = [
  query("class").optional().isString(),
  query("className").optional().isString(),
  query("branchId").optional().isInt(),
  query("branchName").optional().isString(),
  query("examName").optional().isString(),
];

export const ExamRoutineIdParamValidation = [
  param("id").isInt().withMessage("id must be an integer"),
];

export const deleteByNameValidation = [
  body("className").optional().isString().withMessage("className must be a string"),
  body("branchName").optional().isString().withMessage("branchName must be a string"),
  query("className").optional().isString().withMessage("className must be a string"),
  query("branchName").optional().isString().withMessage("branchName must be a string"),
];

// Validate metadata for upload (all optional)
export const uploadExamRoutineValidation = [
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


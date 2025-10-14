import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import { roleAuth, requireRole } from "../../common/middleware/role-auth.middleware";
import * as homeworkController from "./homework.controller";
import * as homeworkValidate from "./homework.validate";
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();

router
  .get(
    "/",
    roleAuth(["admin", "teacher", "student", "parent"]),
    homeworkValidate.listHomeworkQueryValidation,
    catchError,
    homeworkController.listHomework
  )
  .post(
    "/",
    roleAuth(["admin", "teacher"]),
    requireRole(["teacher", "admin"]),
    upload.none(),
    homeworkValidate.createHomeworkValidation,
    catchError,
    homeworkController.createHomework
  )
  .post(
 "/submit",
  roleAuth(["student"]),
  requireRole(["student"]),
  upload.single("attachment"), 
  homeworkValidate.submitHomeworkValidation,
  catchError,
  homeworkController.submitHomework
  )
  .patch(
    "/submission/:submissionId",
    roleAuth(["admin", "teacher"]),
    requireRole(["teacher", "admin"]),
    upload.none(),
    homeworkValidate.confirmSubmissionValidation,
    catchError,
    homeworkController.confirmSubmission
  );

export default router;

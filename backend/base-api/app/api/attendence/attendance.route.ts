import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import { roleAuth, requireRole } from "../../common/middleware/role-auth.middleware";
import * as attendanceController from "./attendance.controller";
import * as attendanceValidate from "./attendance.validate";
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();

router
//   router.get(
//   "/",
//   roleAuth(["admin", "teacher", "student", "parent"]),
//   attendanceValidate.listAttendanceQueryValidation,
//   catchError,
//   attendanceController.getMyAttendance
// );

router.get(
  "/:studentId",
  roleAuth(["admin", "teacher", "student", "parent"]),
  attendanceValidate.listAttendanceQueryValidation,
  upload.none(),
  catchError,
  attendanceController.getMyAttendance
)
  .post(
    "/",
    roleAuth(["admin", "teacher"]),
    requireRole(["teacher", "admin"]),
    upload.none(),
    attendanceValidate.submitAttendanceValidation,
    catchError,
    attendanceController.submitAttendance
  );

export default router;


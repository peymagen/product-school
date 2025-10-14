import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import { roleAuth, requireRole } from "../../common/middleware/role-auth.middleware";
import * as staffController from "./staff.controller";
import * as staffValidate from "./staff.validate";
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();

router
  .get(
    "/",
    roleAuth(["admin", "teacher", "staff"]),
    staffValidate.listStaffQueryValidation,
    catchError,
    staffController.listStaff
  )
  .get(
    "/:id",
    roleAuth(["admin", "teacher", "staff"]),
    catchError,
    staffController.getStaffById
  )
  .post(
    "/",
    roleAuth(["admin"]),
    requireRole(["admin"]),
    upload.none(),
    staffValidate.createStaffValidation,
    catchError,
    staffController.createStaff
  )
  .put(
    "/:id",
    roleAuth(["admin"]),
    requireRole(["admin"]),
    upload.none(),
    staffValidate.updateStaffValidation,
    catchError,
    staffController.updateStaff
  )
  .delete(
    "/:id",
    roleAuth(["admin"]),
    requireRole(["admin"]),
    catchError,
    staffController.deleteStaff
  );

export default router;

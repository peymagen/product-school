import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import { roleAuth, requireRole } from "../../common/middleware/role-auth.middleware";
import * as tcController from "./tc.controller";
import * as tcValidate from "./tc.validate";
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();

router
  .get(
    "/",
    roleAuth(["admin", "teacher", "student", "parent"]),
    tcValidate.listTcValidation,
    catchError,
    tcController.listTc
  );

router
  .post(
    "/",
    roleAuth([]),
    requireRole(["student"]),
    tcValidate.createTcValidation,
    catchError,
    tcController.createTc,
  );

router
  .patch(
    "/",
    roleAuth([]),
    requireRole(["teacher", "admin"]),
    upload.single("file"),
    tcValidate.updateTcFieldsValidation,
    catchError,
    tcController.updateTcHandler,
  );

router
  .patch(
    "/status",
    roleAuth([]),
    requireRole(["admin"]),
    tcValidate.updateTcStatusValidation,
    catchError,
    tcController.updateTcStatus,
    upload.none(),
  );

export default router;



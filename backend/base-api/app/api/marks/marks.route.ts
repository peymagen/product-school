import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import { roleAuth, requireRole } from "../../common/middleware/role-auth.middleware";
import * as marksController from "./marks.controller";
import * as marksValidate from "./marks.validate";
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();

router
  .get(
    "/:id",
    roleAuth(["admin", "teacher", "student", "parent"]), 
    marksValidate.getMyMarksQueryValidation,
    catchError,
    marksController.getMyMarks
  );

router
  .post(
    "/",
    roleAuth(["admin", "teacher","staff"]), 
    requireRole(["teacher", "admin","staff"]),
    marksValidate.createMarkValidation,
    catchError,
    marksController.createMark,
    upload.none(),
  );

export default router;




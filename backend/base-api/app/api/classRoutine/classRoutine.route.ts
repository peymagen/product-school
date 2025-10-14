import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import { roleAuth, requireRole } from "../../common/middleware/role-auth.middleware";
import { upload } from "../../common/services/cloudinary.service";
import * as classRoutineController from "./classRoutine.controller";
import * as classRoutineValidate from "./classRoutine.validation";


const router = Router();

router
  .get(
    "/",
    upload.none(),
    roleAuth(["admin", "teacher", "student", "parent"]),
    classRoutineValidate.getClassRoutinesQueryValidation,
    upload.none(),
    catchError,
    classRoutineController.getAllHandler
  );

// router
//   .get(
//     "/:id",
//     roleAuth(["admin", "teacher", "student", "parent"]),
//     classRoutineValidate.classRoutineIdParamValidation,
//     catchError,
//     classRoutineController.getClassRoutineById
//   );

router
  .post(
    "/upload",
    upload.single("file"),
    roleAuth([]),
    requireRole(["staff", "admin"]),
    classRoutineValidate.requireFileUpload,
    classRoutineValidate.uploadClassRoutineValidation,
    catchError,
    classRoutineController.uploadHandler
  );

router
  .post(
    "/delete",
    upload.none(),
    roleAuth([]),
    requireRole(["admin","staff"]),
    classRoutineValidate.deleteByNameValidation,
    catchError,
    classRoutineController.deleteHandler
  );

  //soft delete
router
  .post(
    "/toggle",
    upload.none(),
    roleAuth([]),
    requireRole(["admin","staff"]),
    classRoutineValidate.deleteByNameValidation,
    catchError,
    classRoutineController.toggleStatusHandler
  );

export default router;
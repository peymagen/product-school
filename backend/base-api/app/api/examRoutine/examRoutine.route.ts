import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import { roleAuth, requireRole } from "../../common/middleware/role-auth.middleware";
import { upload } from "../../common/services/cloudinary.service";
import * as classRoutineController from "./examRoutine.controller";
import * as classRoutineValidate from "./examRoutine.validation";


const router = Router();

router
  .get(
    "/",
    upload.none(),
    roleAuth(["admin", "teacher", "student", "parent"]),
    classRoutineValidate.getExamRoutinesQueryValidation,
    catchError,
    classRoutineController.getExamRoutinesHandler
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
    classRoutineValidate.uploadExamRoutineValidation,
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

router
  .post(
    "/deleteSoft",
    upload.none(),
    roleAuth([]),
    requireRole(["admin","staff"]),
    classRoutineValidate.deleteByNameValidation,
    catchError,
    classRoutineController.deleteSoftHandler
  );

export default router;
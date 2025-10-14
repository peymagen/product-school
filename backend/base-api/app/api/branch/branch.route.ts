import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import { roleAuth, requireRole } from "../../common/middleware/role-auth.middleware";
import * as branchController from "./branch.controller";
import * as branchValidate from "./branch.validate";
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();

router
  .get(
    "/",
    roleAuth(["admin", "teacher", "student", "parent", "staff"]),
    branchValidate.listBranchQueryValidation,
    upload.none(),
    catchError,
    branchController.listBranches
  )
  .get(
    "/:name",
    roleAuth(["admin", "teacher", "student", "parent", "staff"]),
    branchValidate.getBranchByIdValidation,
    upload.none(),
    catchError,
    branchController.getBranchById
  )
  .post(
    "/",
    roleAuth(["admin"]),
    requireRole(["admin"]),
    upload.none(),
    branchValidate.createBranchValidation,
    catchError,
    branchController.createBranch
  )
 .put(
  "/update",
  roleAuth(["admin"]),
  requireRole(["admin"]),
  upload.none(),
  branchValidate.updateBranchValidation,
  catchError,
  branchController.updateBranch
)

  .delete(
    "/:name",
    roleAuth(["admin"]),
    requireRole(["admin"]),
    upload.none(),
    catchError,
    branchController.deleteBranch
  );

export default router;

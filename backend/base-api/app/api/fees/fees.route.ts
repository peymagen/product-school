import { Router, Request, Response, NextFunction } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import { roleAuth, requireRole } from "../../common/middleware/role-auth.middleware";
import * as feesController from "./fees.controller";
import * as feesValidate from "./fees.validate";
import { upload } from "../../common/middleware/multer.middleware";

const router = Router();



// ─── Student/Parent Views ─────────────────────────────────────────────
router.post(
  '/',
  roleAuth(["admin",]),
  requireRole(["staff", "admin"]),
  feesValidate.CreateFeeInput,
  upload.none(),
  catchError,
  feesController.createFee

)
router
  .get(
    "/my",
    upload.none(),
    roleAuth([]),
    requireRole(["student", "parent","admin","accountant"]),
    feesValidate.listMyFeesValidation,
    catchError,
    feesController.listMyFees
  )
  .get(
    "/status",
    upload.none(),
    roleAuth([]),
    requireRole(["student", "parent","admin","accountant"]),
    feesValidate.myFeesStatusValidation,
    catchError,
    feesController.getMyFeesStatus
  );

export default router;

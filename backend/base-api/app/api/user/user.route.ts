import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import { upload } from "../../common/middleware/multer.middleware";
import { requireRole, roleAuth } from "../../common/middleware/role-auth.middleware";

const router = Router();

router
  .get("/", userController.getAllUser)
  .get("/active/:email", userController.getActiveUser)
  .get("/:id", userController.getUserById)
  .delete(
    "/:id",
    roleAuth([]),
    requireRole(["admin"]),
    userController.deleteUser
  )
  .post(
    "/login",
    upload.none(),
    userValidator.loginUser,
    catchError,
    userController.loginUser
  )
  .post(
    "/:id",
    roleAuth([]),
    requireRole(["admin"]),
    upload.none(),
    catchError,
    userController.undoDeleteUser
  )
  .post(
    "/",
    roleAuth([]),
    requireRole(["staff", "admin"]),
    upload.none(),
    userValidator.createUser,
    catchError,
    userController.createUser
  )
 
  .put(
    "/:id",
    roleAuth([]),
    requireRole(["admin"]),
    upload.none(),
    userValidator.updateUser,
    catchError,
    userController.updateUser
  )


export default router;

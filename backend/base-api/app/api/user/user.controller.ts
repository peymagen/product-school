import * as userService from "./user.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import passport from "passport";
import { createUserTokens } from "../../common/services/passport-jwt.service";
import bcrypt from "bcrypt";
import { body } from "express-validator";

const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }
  const result = await userService.createUser(req.body);
  res.send(createResponse(result, "User created sucssefully"));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  passport.authenticate(
    "login",
    async (err: Error | null, user: any | undefined, info: any) => {
      if (err || !user) {
        return res.status(401).json({
          message: info?.message || "Authentication failed",
        });
      }
      const { accessToken } = createUserTokens(user);
      res.send(createResponse({ accessToken, user }, "Login successful"));
    }
  )(req, res);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  // console.log(id);
  // if (req.body.password) {
  //   req.body.password = await hashPassword(req.body.password);
  // }
  // console.log("body",req.body)
  const result = await userService.updateUser(id, req.body);
  // console.log(result)
  res.send(createResponse(result, "User updated sucssefully"));
});

// export const editUser = asyncHandler(async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   if (req.body.password) {
//     req.body.password = await hashPassword(req.body.password);
//   }
//   const result = await userService.editUser(id, req.body);
//   res.send(createResponse(result, "User updated sucssefully"));
// });

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.deleteUser(Number(req.params.id));
  res.send(createResponse(result, "User deleted sucssefully"));
});

export const undoDeleteUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.undoDeleteUser(Number(req.params.id));
  res.send(createResponse(result, "User undo deleted sucssefully"));
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getUserById(Number(req.params.id));
  res.send(createResponse(result));
});

export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  res.send(createResponse(result));
});
export const getActiveUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getActiveUserByEmail(req.params.email || req.body.email);
  res.send(createResponse(result));
});

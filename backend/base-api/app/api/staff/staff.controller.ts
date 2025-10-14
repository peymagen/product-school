import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../../common/helper/response.hepler";
import * as staffService from "./staff.service";

export const listStaff = asyncHandler(async (req: Request, res: Response) => {
  const result = await staffService.listStaff({
    user_id: req.query.user_id ? Number(req.query.user_id) : undefined,
    department: (req.query.department as string) || undefined,
    position: (req.query.position as string) || undefined,
  });
  res.send(createResponse(result, "Staff fetched successfully"));
});

export const getStaffById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await staffService.getStaffById(id);
  res.send(createResponse(result));
});

export const createStaff = asyncHandler(async (req: Request, res: Response) => {
  const result = await staffService.createStaff(req.body);
  res.send(createResponse(result, "Staff created"));
});

export const updateStaff = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await staffService.updateStaff(id, req.body);
  res.send(createResponse(result, "Staff updated"));
});

export const deleteStaff = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await staffService.deleteStaff(id);
  res.send(createResponse(result, "Staff deleted"));
});

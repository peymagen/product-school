import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../../common/helper/response.hepler";
import * as branchService from "./branch.service";

export const listBranches = asyncHandler(async (req: Request, res: Response) => {
  const result = await branchService.listBranches({
    name: (req.query.name as string) || undefined,
    status: (req.query.status as "active" | "inactive") || undefined,
  });
  res.send(createResponse(result, "Branches fetched successfully"));
});

export const getBranchById = asyncHandler(async (req: Request, res: Response) => {
  const name = String(req.params.name || req.query.name);
  const result = await branchService.getBranchById(name);
  res.send(createResponse(result));
});

export const createBranch = asyncHandler(async (req: Request, res: Response) => {
  const result = await branchService.createBranch(req.body);
  res.send(createResponse(result, "Branch created"));
});

export const updateBranch = asyncHandler(async (req: Request, res: Response) => {
  const name = String(req.params.name || req.query.name);
  const result = await branchService.updateBranch(name, req.body);
  res.send(createResponse(result, "Branch updated"));
});

export const deleteBranch = asyncHandler(async (req: Request, res: Response) => {
  const name = String(req.params.name || req.query.name);
  const result = await branchService.deleteBranch(name);
  res.send(createResponse(result, "Branch status toggle"));
});

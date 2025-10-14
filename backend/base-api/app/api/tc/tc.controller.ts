import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../../common/helper/response.hepler";
import * as tcService from "./tc.service";
import { ITeacherTcUpdateRequest } from "./tc.dto";

export const listTc = asyncHandler(async (req: Request, res: Response) => {
  const { status, rollNo, className } = req.query as any;
  const result = await tcService.listTc({

    rollNo: rollNo ?? undefined,
    className: className ?? undefined,
    status: status as any,
  });
  res.send(createResponse(result));
});

export const createTc = asyncHandler(async (req: Request, res: Response) => {
  const payload = {
    rollNo: req.body.rollNo,
    reason: req.body.reason,
    requestedDate: req.body.requestedDate,
  } as any;
  const result = await tcService.createTcFromStudent(payload);
  res.send(createResponse(result, "TC request created"));
});

export const updateTcStatus = asyncHandler(async (req: Request, res: Response) => {
  await tcService.updateTcStatus(req.body);
  res.send(createResponse(null, "TC status updated"));
});

export const updateTcHandler = async (req: Request, res: Response) => {
  try {
    const data: ITeacherTcUpdateRequest = {
      id: Number(req.body.id),
      className: req.body.className ?? undefined,
      processedDate: req.body.processedDate,
      file: req.file, 
    };

    const result = await tcService.updateTcFields(data);

    res.status(200).json({
      success: true,
      message: "TC updated successfully ",
      fileUrl: result.fileName || null,
    });
  } catch (err: any) {
    console.error(" Error in updateTcHandler:", err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};


import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../../common/helper/response.hepler";
import * as attendanceService from "./attendance.service";

export const getMyAttendance = asyncHandler(async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId || req.query.studentId || (req.user as any)?.id)
  if (!studentId) {
    res.status(400).send({ message: "studentId is required" });
    return;
  }

  const fromDate = req.query.fromDate ? String(req.query.fromDate) : undefined;
  const toDate = req.query.toDate ? String(req.query.toDate) : undefined;
  const classId = req.query.classId ? Number(req.query.classId) : undefined;
  const subjectId = req.query.subjectId ? Number(req.query.subjectId) : undefined;

  const result = await attendanceService.findAttendanceForStudent({
    studentId,
    fromDate,
    toDate,
    classId,
    subjectId,
  });

  res.send(createResponse(result));
});

export const submitAttendance = asyncHandler(async (req: Request, res: Response) => {
  const takenById = Number((req.user as any)?.id);
  if (!takenById) {
    res.status(401).send({ message: "Unauthorized: user not found in token" });
    return;
  }

  const result = await attendanceService.submitAttendance({
    ...(req.body as any),
    takenById,
  });

  res.send(createResponse(result, result.message));
});



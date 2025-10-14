import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../../common/helper/response.hepler";
import * as homeworkService from "./homework.service";
import { IHomeworkSubmission } from "./homework.dto";
import createHttpError from "http-errors";

export const listHomework = asyncHandler(async (req: Request, res: Response) => {
  const result = await homeworkService.listHomework({
    classId: req.params.classId ? Number(req.params.classId) : (req.query.classId ? Number(req.query.classId) : undefined),
    subjectId: req.params.subjectId ? Number(req.params.subjectId) : (req.query.subjectId ? Number(req.query.subjectId) : undefined),
    assignedById: req.params.assignedById ? Number(req.params.assignedById) : (req.query.assignedById ? Number(req.query.assignedById) : undefined),
    dueBefore: req.params.dueBefore as string | undefined || req.query.dueBefore as string | undefined,
    dueAfter: req.params.dueAfter as string | undefined || req.query.dueAfter as string | undefined,
  });
  res.send(createResponse(result, "Homework list fetched successfully"));
});

export const createHomework = asyncHandler(async (req: Request, res: Response) => {
  const result = await homeworkService.createHomework(req.body);
  res.send(createResponse(result, "Homework created"));
});

export const submitHomework = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  const result = await homeworkService.submitHomework(
    req.body as IHomeworkSubmission,
    file
  );
  res.send(createResponse(result, "Homework submitted"));
});


export const confirmSubmission = asyncHandler(async (req: Request, res: Response) => {
  const { homeworkId, studentId, status, grade, remarks } = req.body;

  if (!homeworkId || !studentId) {
    throw createHttpError(400, "homeworkId and studentId are required");
  }

  const result = await homeworkService.confirmSubmission(
    Number(homeworkId),
    Number(studentId),
    { status, grade, remarks }
  );

  res.send(createResponse(result, "Submission updated successfully"));
});


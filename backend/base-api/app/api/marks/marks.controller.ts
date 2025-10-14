import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../../common/helper/response.hepler";
import * as marksService from "./marks.service";


export const getMyMarks = asyncHandler(async (req: Request, res: Response) => {

  const studentId = Number(req.params.id) || (req.query.studentId ? Number(req.query.studentId) : undefined);
  const rollNo = (req.query.rollNo as string) || undefined;
  console.log("Params:", req.params, "Query:", req.query, "StudentId:", studentId, "RollNo:", rollNo);

  if (!studentId && !rollNo) {
    res.status(400).send({ message: "Either studentId or rollNo is required" });
    return;
  }
 
   const examId = req.query.examId ? Number(req.query.examId) : undefined;
   const termId = req.query.termId ? Number(req.query.termId) : undefined;
   const classId = req.query.classId ? Number(req.query.classId) : undefined;
 
   const result = await marksService.findMarksForStudent({
    studentId,
    rollNo,
    examId,
    termId,
    classId,
   });
 
   res.send(createResponse(result));
 });


export const createMark = asyncHandler(async (req: Request, res: Response) => {
  const result = await marksService.createMark(req.body);
  res.send(createResponse(result, "Mark created"));
});







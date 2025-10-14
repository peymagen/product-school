import { type Request, type Response } from "express";
import * as feesService from "./fees.service";
import { createResponse } from "../../common/helper/response.hepler";

export const createFee = async(req:Request,res:Response):Promise<void> => {
  try {
    const { rollNo, amount, dueDate, title, branchName, className, status } = req.body;
    const data = await feesService.createFee({ rollNo, amount, dueDate, title, branchName, className, status });
    res.json(createResponse(data,"Fee created successfully"));
} catch (error: any) {
    console.error("createFee:",error);
    const status = error?.status ?? 500;
    const message = error?.message ?? "Server error";
    res.status(status).json({success:false,message,data:null});
}
}


export const listMyFees = async (req: Request, res: Response): Promise<void> => {
  try {
    // accept studentId or rollNo
    let studId: number | undefined =
      (req.query.studentId ? Number(req.query.studentId) : undefined) ??
      (req.params.studentId ? Number(req.params.studentId) : undefined);

    const rollNo = (req.query.rollNo as string | undefined) ?? (req.params as any).rollNo;
    if (!studId && rollNo) {
      const resolved = await feesService.getStudentIdByRollNo(rollNo);
      if (resolved) studId = resolved;
    }

    console.log("student_id", studId);

    if (!studId) {
      res.status(400).json({
        success: false,
        message: "studentId or rollNo required",
      });
      return;
    }

    const data = await feesService.findFeesByUser(studId);

    res.json(
      createResponse(
        data,
        "Fees fetched",
        Array.isArray(data) ? data.length : undefined
      )
    );
  } catch (err) {
    console.error("listMyFees:", err);
    res.status(500).json({ success: false, message: "Server error", data: null });
  }
};


export const getMyFeesStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // accept studentId or rollNo
    let studId: number | undefined =
      (req.query.studentId ? Number(req.query.studentId) : undefined) ??
      (req.params.studentId ? Number(req.params.studentId) : undefined);

    const rollNo = (req.query.rollNo as string | undefined) ?? (req.params as any).rollNo;
    if (!studId && rollNo) {
      const resolved = await feesService.getStudentIdByRollNo(rollNo);
      if (resolved) studId = resolved;
    }

    console.log("student_id", studId);

    if (!studId) {
      res.status(400).json({ success: false, message: "studentId or rollNo required", data: null });
      return;
    }

    const data = await feesService.getFeesStatus(studId);
    res.json(createResponse(data, "Status fetched"));
  } catch (err) {
    console.error("getMyFeesStatus:", err);
    res.status(500).json({ success: false, message: "Server error", data: null });
  }
};

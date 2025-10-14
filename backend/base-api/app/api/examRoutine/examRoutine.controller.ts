import { Request, Response } from 'express';
import { uploadRoutine, getAllRoutines, deleteRoutineById,deleteSoftRoutineByName, deleteRoutineByName } from './examRoutine.service';
import { createResponse } from '../../common/helper/response.hepler';

// POST /upload
export const uploadHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file provided' });
    return;
  }
  // console.log(req.file);
  try {
    const uploadedBy = (req as any).user?.id || Number(req.body.uploaded_by) || null;
    const result = await uploadRoutine(req.file, {
      className: req.body.className || null,
      branchName: req.body.branchName || null,
      uploaded_by: uploadedBy,
      examName: req.body.examName || null,
    });
    console.log("result",result);
    res.json(createResponse(result, 'File uploaded successfully'));
  } catch (e: any) {
    console.error('UploadHandler error:', e);
    res.status(500).json({ success: false, message: e.message || 'Server error' });
  }
};

// GET /
// export const getAllHandler = async (_req: Request, res: Response): Promise<void> => {
//   try {
//     const rows = await getAllRoutines();
//     res.json(createResponse(rows, 'Fetched class routines'));
//   } catch (e: any) {
//     console.error('getAllHandler error:', e);
//     res.status(500).json({ success: false, message: e.message || 'Server error' });
//   }
// };

// DELETE /:id
export const deleteHandler = async (req: Request, res: Response): Promise<void> => {
  const className: string | undefined = req.body.className || req.body.class || req.query.className as any;
  const branchName: string | undefined = req.body.branchName || req.query.branchName as any;
  if (!className || !branchName) {
    res.status(400).json({ success: false, message: 'className and branchName are required' });
    return;
  }
  try {
    const result = await deleteRoutineByName(className, branchName);
    if (!result || result.deleted === 0) {
      res.status(404).json({ success: false, message: 'Record not found or deletion failed' });
      return;
    }
    res.json(createResponse({ deleted: result.deleted }, 'Deleted successfully'));
  } catch (e: any) {
    console.error('deleteHandler error:', e);
    res.status(500).json({ success: false, message: e.message || 'Server error' });
  }
};

export const getExamRoutinesHandler = async (req: Request, res: Response): Promise<void> => {
  const filters = {
    class: (req.query.className as string) || (req.query.class as string) || undefined,
    branchName: (req.query.branchName as string) || undefined,
    branchId: req.query.branchId ? Number(req.query.branchId) : undefined,
    examName: (req.query.examName as string) || undefined,
  } as any;
  const routines = await getAllRoutines(filters);
  res.json(createResponse(routines, 'Exam routines fetched'));
};

export const deleteSoftHandler = async (req: Request, res: Response): Promise<void> => {
  const className: string | undefined = req.body.className || req.body.class || req.query.className as any;
  const branchName: string | undefined = req.body.branchName || req.query.branchName as any;
  if (!className || !branchName) {
    res.status(400).json({ success: false, message: 'className and branchName are required' });
    return;
  }
  try {
    const result = await deleteSoftRoutineByName(className, branchName);
    if (!result || result.deleted === 0) {
      res.status(404).json({ success: false, message: 'Record not found or deletion failed' });
      return;
    }
    res.json(createResponse({ deleted: result.deleted }, 'Deleted successfully'));
  } catch (e: any) {
    console.error('deleteHandler error:', e);
    res.status(500).json({ success: false, message: e.message || 'Server error' });
  }
};

import { Request, Response } from 'express';
import { uploadRoutine, getAllRoutines, deleteRoutineById,togglestatus } from './classRoutine.service';
import { createResponse } from '../../common/helper/response.hepler';

// POST /upload
export const uploadHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file provided' });
    return;
  }
  console.log(req.file);
  try {
    const uploadedBy = (req as any).user?.id || Number(req.body.uploaded_by) || null;
    const result = await uploadRoutine(req.file, {
      className: req.body.className || req.body.class || req.body.class_name || null,
      branchName: req.body.branchName || req.body.branch || req.body.branch_name || null,
      uploaded_by: uploadedBy,
    });
    res.json(createResponse(result, 'File uploaded successfully'));
    console.log(result);
  } catch (e: any) {
    console.error('UploadHandler error:', e);
    res.status(500).json({ success: false, message: e.message || 'Server error' });
  }
};

// GET /
export const getAllHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const rows = await getAllRoutines();
    res.json(createResponse(rows, 'Fetched class routines'));
  } catch (e: any) {
    console.error('getAllHandler error:', e);
    res.status(500).json({ success: false, message: e.message || 'Server error' });
  }
};

// DELETE /:id
export const deleteHandler = async (req: Request, res: Response): Promise<void> => {
  const className = req.body.className;
  const branchName = req.body.branchName;
  console.log(className, branchName);
  if (!className || !branchName) {
    res.status(400).json({ success: false, message: 'Invalid className or branchName' });
    return;
  }
  try {
    const ok = await deleteRoutineById(className, branchName);
    if (!ok) {
      res.status(404).json({ success: false, message: 'Record not found or deletion failed' });
      return;
    }
    res.json(createResponse({}, 'Deleted successfully'));
  } catch (e: any) {
    console.error('deleteHandler error:', e);
    res.status(500).json({ success: false, message: e.message || 'Server error' });
  }
};

export const toggleStatusHandler = async (req: Request, res: Response): Promise<void> => {
  const className = req.body.className;
  const branchName = req.body.branchName;
  console.log(className, branchName);
  if (!className || !branchName) {
    res.status(400).json({ success: false, message: 'Invalid className or branchName' });
    return;
  }
  try {
    const ok = await togglestatus(className, branchName);
    if (!ok) {
      res.status(404).json({ success: false, message: 'Record not found or toggle failed' });
      return;
    }
    res.json(createResponse({}, 'Toggled successfully'));
  } catch (e: any) {
    console.error('toggleStatusHandler error:', e);
    res.status(500).json({ success: false, message: e.message || 'Server error' });
  }
};


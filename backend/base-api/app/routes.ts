import express from "express";
import userRoutes from "./api/user/user.route";
import marksRoutes from "./api/marks/marks.route";
import homeworkRoutes from "./api/homework/homework.route";
import attendanceRoutes from "./api/attendence/attendance.route";
import tcRoutes from "./api/tc/tc.route";
import staffRoutes from "./api/staff/staff.route";
import branchRoutes from "./api/branch/branch.route";
import feesRoutes from "./api/fees/fees.route";
import classRoutineRoutes from "./api/classRoutine/classRoutine.route";
import examRoutineRoutes from "./api/examRoutine/examRoutine.route";

// routes
const router = express.Router();
router.use("/users", userRoutes);
router.use("/marks", marksRoutes);
router.use("/homework", homeworkRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/tc", tcRoutes);
router.use("/staff", staffRoutes);
router.use("/branch", branchRoutes);
router.use("/classRoutine", classRoutineRoutes);
router.use("/examRoutine", examRoutineRoutes);
router.use("/fees", feesRoutes);

export default router;

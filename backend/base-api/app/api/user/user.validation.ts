import { body } from "express-validator";

export const createUser = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be a string"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .isString()
    .withMessage("role must be a string"),
  body("branch_id").optional().isInt().withMessage("branch_id must be an integer"),
  // Optional nested validations for role-specific payloads
  body("studentData.roll_no").optional().isString(),
  body("studentData.class_id").optional().isInt(),
  body("studentData.parent_id").optional().isInt(),
  body("teacherData.employee_id").optional().isString(),
  body("teacherData.department").optional().isString(),
  body("teacherData.qualification").optional().isString(),
  body("parentData.phone").optional().isString(),
  body("parentData.address").optional().isString(),
  body("parentData.occupation").optional().isString(),
  body("staffData.employee_id").optional().isString(),
  body("staffData.department").optional().isString(),
  body("staffData.position").optional().isString(),
  body("adminData.employee_id").optional().isString(),
  body("adminData.department").optional().isString(),
  body("adminData.access_level").optional().isString(),
  body("accountantData.employee_id").optional().isString(),
  body("accountantData.department").optional().isString(),
  body("accountantData.license_number").optional().isString(),
];
export const loginUser = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be a string"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
];
export const updateUser = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be a string"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
  body("role")
    .optional()
    .isString()
    .withMessage("role must be a string"),
  body("branch_id").optional().isInt().withMessage("branch_id must be an integer"),
];

// export const editUser = [
//   body("email").optional().isString().withMessage("email must be a string"),
//   body("password").optional().isString().withMessage("password must be a string"),
//   body("role").optional().isString().withMessage("role must be a string"),
//   body("branch_id").optional().isInt().withMessage("branch_id must be an integer"),
// ];


export const deleteUser =[
  body("id").notEmpty().withMessage("id is required").isInt().withMessage("id must be an integer")
]
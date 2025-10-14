-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2025 at 12:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountants`
--

CREATE TABLE `accountants` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `license_number` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accountants`
--

INSERT INTO `accountants` (`id`, `user_id`, `employee_id`, `department`, `license_number`, `created_at`, `updated_at`) VALUES
(1, 33, 'accountant', 'accountant', NULL, '2025-09-18 10:53:05', '2025-09-18 10:53:05'),
(2, 42, 'account1291', 'xyz', NULL, '2025-10-10 03:51:29', '2025-10-10 03:51:29');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `access_level` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `user_id`, `employee_id`, `department`, `access_level`, `created_at`, `updated_at`) VALUES
(1, 32, 'admin001', 'admin', NULL, '2025-09-18 10:52:25', '2025-09-18 10:52:25'),
(2, 34, 'admin', 'admin', NULL, '2025-09-18 11:17:20', '2025-09-18 11:17:20'),
(3, 39, NULL, NULL, NULL, '2025-09-19 12:21:02', '2025-09-19 12:21:02'),
(4, 41, 'staff1291', 'xyz', NULL, '2025-10-07 13:22:34', '2025-10-07 13:22:34'),
(5, 45, 'account1291', 'xyz', NULL, '2025-10-10 04:25:51', '2025-10-10 04:25:51');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `class_id` int(10) UNSIGNED DEFAULT NULL,
  `subject_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('present','absent','late','excused') NOT NULL,
  `taken_by_id` int(10) UNSIGNED NOT NULL,
  `remarks` varchar(500) DEFAULT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `student_id`, `class_id`, `subject_id`, `status`, `taken_by_id`, `remarks`, `date`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 1, 'present', 1, 'On time', '2025-09-22', '2025-09-22 09:25:35', '2025-09-22 09:25:35'),
(2, 2, 1, 1, 'late', 1, 'Traffic', '2025-09-22', '2025-09-22 09:25:35', '2025-09-22 09:25:35'),
(8, 2, 1, 1, 'present', 39, 'on time', '2025-10-12', '2025-10-12 06:33:11', '2025-10-12 06:33:11'),
(9, 3, 1, 1, 'absent', 39, NULL, '2025-10-12', '2025-10-12 06:33:11', '2025-10-12 06:33:11');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0 = inactive, 1 = active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `address`, `city`, `state`, `zip_code`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Central Branch', '123 Main Street', 'New Delhi', 'Delhi', '110001', '2025-09-22 10:22:08', '2025-09-22 10:22:08', 1),
(2, 'West Branch', '456 West Road', 'Mumbai', 'Maharashtra', '400001', '2025-09-22 10:22:08', '2025-09-22 10:22:08', 1),
(3, 'East Branch', '789 East Avenue', 'Kolkata', 'West Bengal', '700001', '2025-09-22 10:22:08', '2025-09-22 10:22:08', 1),
(4, 'north-east branch', '1564', 'patna', 'bihar', '165', '2025-10-12 07:02:58', '2025-10-12 07:24:56', 0);

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `section` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `created_at`, `updated_at`, `section`) VALUES
(1, '1', '2025-09-17 18:12:26', '2025-10-08 12:47:06', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `class_routines`
--

CREATE TABLE `class_routines` (
  `id` int(10) UNSIGNED NOT NULL,
  `file_name` varchar(255) NOT NULL COMMENT 'Cloudinary public_id or filename',
  `original_name` varchar(255) DEFAULT NULL COMMENT 'Original filename when uploaded',
  `url` varchar(500) NOT NULL COMMENT 'Cloudinary URL or file path',
  `class` varchar(100) DEFAULT NULL COMMENT 'Class name (e.g., Grade 10, Class 1)',
  `branch_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Reference to branches table',
  `uploaded_by` int(10) UNSIGNED DEFAULT NULL COMMENT 'Reference to users table (who uploaded)',
  `file_size` bigint(20) DEFAULT NULL COMMENT 'File size in bytes',
  `mime_type` varchar(100) DEFAULT NULL COMMENT 'File MIME type',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Whether the routine is active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `public_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Class routine files and schedules';

--
-- Dumping data for table `class_routines`
--

INSERT INTO `class_routines` (`id`, `file_name`, `original_name`, `url`, `class`, `branch_id`, `uploaded_by`, `file_size`, `mime_type`, `status`, `created_at`, `updated_at`, `public_id`) VALUES
(11, 'https:/res.cloudinary.com/doyhrtvmk/raw/upload/v1760274408/class-routines/file_ukwzlt', 'todelhi.pdf', 'https://res.cloudinary.com/doyhrtvmk/raw/upload/v1760274409/class_routines/file_ukwzlt', '1', 2, 40, 338195, 'application/pdf', 0, '2025-10-12 13:06:45', '2025-10-12 13:59:12', 'class_routines/file_ukwzlt');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` int(10) UNSIGNED NOT NULL,
  `exam_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `exam_name`) VALUES
(1, 'Mid Term'),
(2, 'Final Exam');

-- --------------------------------------------------------

--
-- Table structure for table `exam_routine`
--

CREATE TABLE `exam_routine` (
  `id` int(10) UNSIGNED NOT NULL,
  `file_name` varchar(255) NOT NULL COMMENT 'Cloudinary public_id or filename',
  `original_name` varchar(255) DEFAULT NULL COMMENT 'Original filename when uploaded',
  `url` varchar(500) NOT NULL COMMENT 'Cloudinary URL or file path',
  `branch_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Reference to branches table',
  `uploaded_by` int(10) UNSIGNED DEFAULT NULL COMMENT 'Reference to users table (who uploaded)',
  `file_size` bigint(20) DEFAULT NULL COMMENT 'File size in bytes',
  `mime_type` varchar(100) DEFAULT NULL COMMENT 'File MIME type',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Whether the routine is active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `public_id` varchar(255) DEFAULT NULL,
  `exam_id` int(10) UNSIGNED DEFAULT NULL,
  `class_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exam_routine`
--

INSERT INTO `exam_routine` (`id`, `file_name`, `original_name`, `url`, `branch_id`, `uploaded_by`, `file_size`, `mime_type`, `status`, `created_at`, `updated_at`, `public_id`, `exam_id`, `class_id`) VALUES
(1, 'https:/res.cloudinary.com/doyhrtvmk/raw/upload/v1759752680/class-routines/file_fxgtwa', 'PROGRAMMING ADS1.pdf', 'https://res.cloudinary.com/doyhrtvmk/image/upload/v1759752681/exam_routine/file_fxgtwa.pdf', 1, 40, 233097, 'application/pdf', 1, '2025-10-06 12:11:17', '2025-10-13 03:12:14', 'exam_routine/file_fxgtwa', 1, NULL),
(3, 'https:/res.cloudinary.com/doyhrtvmk/raw/upload/v1759753811/class-routines/file_ecpfnl', 'PROGRAMMING ADS1.pdf', 'https://res.cloudinary.com/doyhrtvmk/image/upload/v1759753812/exam_routine/file_ecpfnl.pdf', 1, 40, 233097, 'application/pdf', 1, '2025-10-06 12:30:08', '2025-10-13 03:12:19', 'exam_routine/file_ecpfnl', 2, NULL),
(5, 'https:/res.cloudinary.com/doyhrtvmk/raw/upload/v1760326728/class-routines/file_l6eg7j', 'PROGRAMMING ADS1.pdf', 'https://res.cloudinary.com/doyhrtvmk/image/upload/v1760326729/exam_routine/file_l6eg7j.pdf', 2, 40, 233097, 'application/pdf', 0, '2025-10-13 03:38:49', '2025-10-13 03:39:02', 'exam_routine/file_l6eg7j', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `fees`
--
-- Error reading structure for table school_db.fees: #1030 - Got error 194 &quot;Tablespace is missing for a table&quot; from storage engine InnoDB
-- Error reading data for table school_db.fees: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `school_db`.`fees`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `homework`
--

CREATE TABLE `homework` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `class_id` int(10) UNSIGNED DEFAULT NULL,
  `subject_id` int(10) UNSIGNED DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `assigned_by_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homework`
--

INSERT INTO `homework` (`id`, `title`, `description`, `class_id`, `subject_id`, `due_date`, `assigned_by_id`, `created_at`, `updated_at`) VALUES
(1, 'Homework', 'kuch toh kaam krna hein h', 1, 1, '2025-09-20', 1, '2025-09-18 13:31:47', '2025-09-18 13:31:47'),
(2, 'Algebra practice', NULL, 1, 1, '2025-10-20', 10, '2025-10-11 11:49:00', '2025-10-11 11:49:00'),
(3, 'Trigo practice', NULL, 1, 1, '2025-10-20', 10, '2025-10-11 12:07:25', '2025-10-11 12:07:25'),
(4, 'Trigo practice', NULL, 1, 1, '2025-10-20', 10, '2025-10-11 12:19:33', '2025-10-11 12:19:33'),
(5, 'yoo practice', NULL, 1, 1, '2025-10-20', 10, '2025-10-11 12:34:22', '2025-10-11 12:34:22');

-- --------------------------------------------------------

--
-- Table structure for table `homework_submissions`
--

CREATE TABLE `homework_submissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `homework_id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `content` text DEFAULT NULL,
  `attachment_url` varchar(255) DEFAULT NULL,
  `attachment_data` longblob DEFAULT NULL,
  `attachment_type` enum('png','jpeg','jpg','webp','pdf') DEFAULT NULL,
  `status` enum('submitted','graded','returned') NOT NULL DEFAULT 'submitted',
  `grade` varchar(10) DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `submitted_on` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homework_submissions`
--

INSERT INTO `homework_submissions` (`id`, `homework_id`, `student_id`, `content`, `attachment_url`, `attachment_data`, `attachment_type`, `status`, `grade`, `remarks`, `created_at`, `updated_at`, `submitted_on`) VALUES
(2, 2, 2, 'my homework', NULL, NULL, NULL, 'submitted', NULL, NULL, '2025-10-11 12:01:33', '2025-10-11 12:01:33', '2025-10-11 12:01:33'),
(3, 3, 2, 'my homework', NULL, NULL, NULL, 'submitted', NULL, NULL, '2025-10-11 12:07:46', '2025-10-11 12:07:46', '2025-10-11 12:07:46'),
(10, 5, 2, 'my homework', 'https://res.cloudinary.com/doyhrtvmk/raw/upload/fl_inline/v1/homework_submissions/attachment-1760186444944-792371225.pdf', NULL, NULL, 'submitted', NULL, NULL, '2025-10-11 12:40:50', '2025-10-11 12:40:50', '2025-10-11 12:40:50'),
(11, 4, 2, 'my homework', 'https://res.cloudinary.com/doyhrtvmk/image/upload/v1760186892/homework_submissions/attachment-1760186886497-982493749.pdf', NULL, NULL, 'submitted', NULL, NULL, '2025-10-11 12:48:10', '2025-10-11 12:48:10', '2025-10-11 12:48:10');

-- --------------------------------------------------------

--
-- Table structure for table `marks`
--

CREATE TABLE `marks` (
  `id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `exam_id` int(10) UNSIGNED DEFAULT NULL,
  `subject_id` int(10) UNSIGNED DEFAULT NULL,
  `score` decimal(6,2) DEFAULT NULL,
  `grade` varchar(10) DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL,
  `total` decimal(6,2) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `term_id` int(10) UNSIGNED DEFAULT NULL,
  `class_id` int(10) UNSIGNED DEFAULT NULL,
  `date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `marks`
--

INSERT INTO `marks` (`id`, `student_id`, `exam_id`, `subject_id`, `score`, `grade`, `remarks`, `total`, `position`, `term_id`, `class_id`, `date`, `created_at`, `updated_at`) VALUES
(5, 2, 1, 1, 85.00, 'A', 'Good work', 100.00, 2, 1, 1, '2025-09-18', '2025-09-18 12:06:34', '2025-09-18 12:06:34'),
(7, 2, 1, 1, 88.50, NULL, 'Good improvement', NULL, NULL, 2, 1, '2025-10-10', '2025-10-10 04:28:04', '2025-10-10 04:28:04'),
(8, 3, 1, 1, 88.50, NULL, 'Good improvement', NULL, NULL, 2, 1, '2025-10-10', '2025-10-10 05:00:03', '2025-10-10 05:00:03');

-- --------------------------------------------------------

--
-- Table structure for table `parents`
--

CREATE TABLE `parents` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parents`
--

INSERT INTO `parents` (`id`, `user_id`, `student_id`, `phone`, `address`, `occupation`, `created_at`, `updated_at`) VALUES
(1, 29, 2, '9876543210', '123 Main St', 'Engineer', '2025-09-17 18:43:08', '2025-09-17 18:43:08');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `fee_id` int(10) UNSIGNED DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `method` varchar(50) DEFAULT NULL,
  `status` enum('pending','success','failed') DEFAULT 'pending',
  `transaction_ref` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payslips`
--

CREATE TABLE `payslips` (
  `id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `month` tinyint(4) NOT NULL,
  `year` smallint(6) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` enum('generated','confirmed','cancelled') DEFAULT 'generated',
  `file_path` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `user_id`, `employee_id`, `department`, `position`, `created_at`, `updated_at`) VALUES
(1, 31, 'staff001', 'Mathematics', 'x', '2025-09-18 10:49:40', '2025-09-18 10:49:40'),
(2, 40, 'staff1291', 'xyz', 'xyz', '2025-10-04 04:48:49', '2025-10-04 04:48:49');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `roll_no` varchar(50) DEFAULT NULL,
  `class_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `student_name` varchar(100) NOT NULL,
  `mother_name` varchar(100) NOT NULL DEFAULT 'Unknown',
  `father_name` varchar(100) NOT NULL DEFAULT 'Unknown'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `user_id`, `roll_no`, `class_id`, `created_at`, `updated_at`, `student_name`, `mother_name`, `father_name`) VALUES
(2, 14, 'STU001', 1, '2025-09-17 18:12:50', '2025-09-17 18:12:50', 'Student One', 'Alice One', 'Bob One'),
(3, 35, 'STU002', 1, '2025-09-18 13:52:19', '2025-10-10 04:59:37', 'Student One', 'Alice One', 'Bob One');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'A', '2025-09-18 12:00:18', '2025-09-18 12:00:18');

-- --------------------------------------------------------

--
-- Table structure for table `tc`
--

CREATE TABLE `tc` (
  `id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `class_id` int(10) UNSIGNED DEFAULT NULL,
  `term_id` int(10) UNSIGNED DEFAULT NULL,
  `reason` varchar(500) DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `requested_date` date DEFAULT NULL,
  `processed_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `file_name` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tc`
--

INSERT INTO `tc` (`id`, `student_id`, `class_id`, `term_id`, `reason`, `status`, `requested_date`, `processed_date`, `created_at`, `updated_at`, `file_name`) VALUES
(1, 2, 1, 1, 'Transfer to another city', 'approved', '2025-09-19', '2025-09-19', '2025-09-19 11:22:59', '2025-09-19 12:21:36', 'file-1758283849123-312492788.pdf'),
(2, 2, 1, NULL, 'Transfer to another city', 'approved', '2025-09-19', '2025-09-19', '2025-10-11 12:49:34', '2025-10-11 13:43:35', 'https://res.cloudinary.com/doyhrtvmk/raw/upload/v1760189199/teacher_tc/file-1760189194317-851302380.png'),
(3, 3, 1, NULL, 'Transfer to another city', 'pending', '2025-09-19', '2025-09-19', '2025-10-11 12:55:30', '2025-10-11 13:43:15', 'https://res.cloudinary.com/doyhrtvmk/raw/upload/v1760190198/teacher_tc/file-1760190193378-37350311.png');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `user_id`, `employee_id`, `department`, `qualification`, `created_at`, `updated_at`) VALUES
(1, 30, 'TCH001', 'Mathematics', 'M.Sc', '2025-09-18 10:44:56', '2025-09-18 10:44:56'),
(2, 37, NULL, NULL, NULL, '2025-09-19 12:16:06', '2025-09-19 12:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE `terms` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`id`, `name`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 'Term 1', '2025-06-01', '2025-09-30', '2025-09-18 12:06:28', '2025-09-18 12:06:28'),
(2, 'Term 2', '2025-10-01', '2026-01-15', '2025-09-18 12:06:28', '2025-09-18 12:06:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `branch_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`, `updated_at`, `role`, `status`, `branch_id`) VALUES
(2, 'teacher@gmail.com', '$2b$12$Ko1o8FJWJoajezyiAoKmy.7lBVeli1pQX0mL/YYyETD9z5Q6yXhrq', '2025-09-17 13:59:11', '2025-09-17 14:28:26', 'teacher to student', 'active', NULL),
(3, 'alice.new@example.com', '$2b$12$NLaLEE15BLqFNpaEPgNIYOiO9vkoSl/62lMQHZlAj0WflaPwbcX5K', '2025-09-17 14:34:03', '2025-09-17 14:34:50', 'Teacher ', 'active', NULL),
(4, 'stud1@example.com', '$2b$12$dWzt4CQuff.0sKF/S4RQiebMcFcp4BARUsW1wltVgXf1E3JSjmSN2', '2025-09-17 17:22:35', '2025-09-17 17:22:35', 'student', 'active', NULL),
(7, 'piyushstudent.com', '$2b$12$W3.waMMhc9qN28sxj7SHW.aYWQeQEm2pLdkWPFwXaH/7O9MIVnvJi', '2025-09-17 17:25:03', '2025-09-17 17:25:03', 'student', 'active', NULL),
(10, 'student@gmail.com', '$2b$12$LlNRsl4rUdfZbNTuKYYPT.q6ToQlmPcuY3qUXnWD0lVm8CEQjiLfq', '2025-09-17 18:01:07', '2025-09-17 18:01:07', 'student', 'active', NULL),
(12, 'studen@gmail.com', '$2b$12$bJQ7OaaKpEVv03a6FPgjyuwr/QvAcbnL1S.yDi9uJLS3Mz0eohkiO', '2025-09-17 18:03:36', '2025-09-17 18:03:36', 'student', 'active', NULL),
(14, 'studenttes@gmail.com', '$2b$12$qBPBOdl.7vz7.r.NIqDhUeaScGbe5PCgN0uJAmcfrVpvsEenBDdua', '2025-09-17 18:12:50', '2025-10-08 13:06:16', 'student', 'active', 1),
(29, 'parent123@gmail.com', '$2b$12$8MqWD.cGm8anNeK70uf9B.ukF2OaRTxc9qFLxBHGgZFPcEfjdCCXq', '2025-09-17 18:43:08', '2025-09-17 18:43:08', 'parent', 'active', NULL),
(30, 'teacher1@example.com', '$2b$12$V.p2pLNLdA0EAElUW5z.GeTJZ7Wt1g8P4AsoEb2olvL03I1ixysPy', '2025-09-18 10:44:56', '2025-09-18 10:44:56', 'teacher', 'active', NULL),
(31, 'staff@example.com', '$2b$12$3/ArmGAqjv8EBSeyw8.oY.m6FDWmmyHBGoTwQe/NkNEc3w2lN7OmC', '2025-09-18 10:49:40', '2025-09-18 10:49:40', 'staff', 'active', NULL),
(32, 'admin@example.com', '$2b$12$71OA3rgCpqTHkrE1jOSRruH7J.rLGZ/bix0rJn/o6T3X12JvUFE4y', '2025-09-18 10:52:25', '2025-09-18 10:52:25', 'admin', 'active', NULL),
(33, 'accountant@example.com', '$2b$12$52cxDViHi8EefUlIvM8ECetfysXh.XpqUT/hetkwPd0AvRyvdVFna', '2025-09-18 10:53:05', '2025-09-18 10:53:05', 'accountant', 'active', NULL),
(34, 'admin1@example.com', '$2b$12$gSDhTjfiqkL./SEp.VaV3e9PRyvntZiQudYgin0p102AvnSdHYASy', '2025-09-18 11:17:20', '2025-09-18 11:17:20', 'admin', 'active', NULL),
(35, 'student@example.com', '$2b$12$JqkXr0A4ueX8IAwGwPrZxerlT.i/0F0T/RdiY2H/Rdb7nHV.zQ8j6', '2025-09-18 13:52:19', '2025-10-08 13:06:48', 'student', 'active', 1),
(37, 'admin123@example.com', '$2b$12$ZLfaGNGTuQw6E6GdHDGfjOSgHREJUGdSqVzQxNUY1nzWywx2s3xCm', '2025-09-19 12:16:06', '2025-09-19 12:16:06', 'teacher', 'active', NULL),
(39, 'admin12@example.com', '$2b$12$LM1pGhbtxtrnuKMVDv.qcOu60xWf6O6oOs2Bx5ci0Zw/xjchjL0L6', '2025-09-19 12:21:02', '2025-09-19 12:21:02', 'admin', 'active', NULL),
(40, 'staff1291@gmail.com', '$2b$12$rds9PPAY9fziGKbFW.ZOlu0xW2X2MS/R9oGiKtWXXggt/91B9A7o6', '2025-10-04 04:48:49', '2025-10-04 04:48:49', 'staff', 'active', 1),
(41, 'admin@gmail.com', '$2b$12$iKMny1DaaPkUaG7GLb1ye.D8eKlQoljnJsTW96BbxxgSaXBb2asJ6', '2025-10-07 13:22:34', '2025-10-07 13:22:34', 'admin', 'active', 1),
(42, 'account@gmail.com', '$2b$12$7UEZKFDjmVaz.KXYLhtH6e5wgCJvv9H28rO58VPr4iUYrOCWqk3Lm', '2025-10-10 03:51:29', '2025-10-10 03:51:29', 'Accountant', 'active', 1),
(44, 'admi@gmail.com', '$2b$12$XqAVuLnvckED9OpJ7cezJ.QP2yfYVcS6fPRXFRtZgR9Zz/R.8YxrK', '2025-10-10 04:24:29', '2025-10-10 04:24:29', 'admim', 'active', 1),
(45, 'ami@gmail.com', '$2b$12$/LhN.vVrdIQ78LpI2HfSuuZczUwRW1pRN.Pwk1B/fNxrQIvbEX47a', '2025-10-10 04:25:51', '2025-10-10 04:25:51', 'admin', 'active', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountants`
--
ALTER TABLE `accountants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_accountants_user` (`user_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_admins_user` (`user_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_attendance_uniq_row` (`student_id`,`class_id`,`subject_id`,`date`),
  ADD KEY `idx_attendance_student` (`student_id`),
  ADD KEY `idx_attendance_date` (`date`),
  ADD KEY `fk_attendance_class` (`class_id`),
  ADD KEY `fk_attendance_subject` (`subject_id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_branch_name` (`name`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_classes_name` (`name`);

--
-- Indexes for table `class_routines`
--
ALTER TABLE `class_routines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_class_routines_class` (`class`),
  ADD KEY `idx_class_routines_branch` (`branch_id`),
  ADD KEY `idx_class_routines_uploaded_by` (`uploaded_by`),
  ADD KEY `idx_class_routines_active` (`status`),
  ADD KEY `idx_class_routines_created` (`created_at`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exam_routine`
--
ALTER TABLE `exam_routine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_exam_routine_branch` (`branch_id`),
  ADD KEY `idx_exam_routine_uploaded_by` (`uploaded_by`),
  ADD KEY `idx_exam_routine_active` (`status`),
  ADD KEY `idx_exam_routine_created` (`created_at`),
  ADD KEY `fk_exam_routine_exam` (`exam_id`),
  ADD KEY `fk_exam_routine` (`class_id`);

--
-- Indexes for table `homework`
--
ALTER TABLE `homework`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_homework_class` (`class_id`),
  ADD KEY `idx_homework_subject` (`subject_id`),
  ADD KEY `idx_homework_assigned_by` (`assigned_by_id`);

--
-- Indexes for table `homework_submissions`
--
ALTER TABLE `homework_submissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_homework_submission_once` (`homework_id`,`student_id`),
  ADD KEY `idx_homework_submissions_student` (`student_id`);

--
-- Indexes for table `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_marks_student` (`student_id`),
  ADD KEY `idx_marks_subject` (`subject_id`),
  ADD KEY `idx_marks_term` (`term_id`),
  ADD KEY `idx_marks_class` (`class_id`),
  ADD KEY `fk_marks_exam` (`exam_id`);

--
-- Indexes for table `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_parents_user` (`user_id`),
  ADD KEY `idx_parents_student_id` (`student_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_payments_student` (`student_id`),
  ADD KEY `fk_payments_fee` (`fee_id`);

--
-- Indexes for table `payslips`
--
ALTER TABLE `payslips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_payslips_student` (`student_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_staff_user` (`user_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_students_user_id` (`user_id`),
  ADD KEY `idx_students_class_id` (`class_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_subjects_name` (`name`);

--
-- Indexes for table `tc`
--
ALTER TABLE `tc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_tc_student` (`student_id`),
  ADD KEY `idx_tc_status` (`status`),
  ADD KEY `fk_tc_class` (`class_id`),
  ADD KEY `fk_tc_term` (`term_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_teachers_user` (`user_id`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_terms_name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_users_email` (`email`),
  ADD KEY `fk_users_branch` (`branch_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountants`
--
ALTER TABLE `accountants`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `class_routines`
--
ALTER TABLE `class_routines`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `exam_routine`
--
ALTER TABLE `exam_routine`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `homework`
--
ALTER TABLE `homework`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `homework_submissions`
--
ALTER TABLE `homework_submissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `marks`
--
ALTER TABLE `marks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `parents`
--
ALTER TABLE `parents`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payslips`
--
ALTER TABLE `payslips`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tc`
--
ALTER TABLE `tc`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accountants`
--
ALTER TABLE `accountants`
  ADD CONSTRAINT `fk_accountants_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `fk_admins_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `fk_attendance_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_attendance_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_attendance_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `class_routines`
--
ALTER TABLE `class_routines`
  ADD CONSTRAINT `fk_class_routines_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_class_routines_uploaded_by` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `exam_routine`
--
ALTER TABLE `exam_routine`
  ADD CONSTRAINT `fk_exam_routine` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_exam_routine_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_exam_routine_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_exam_routine_uploaded_by` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `homework`
--
ALTER TABLE `homework`
  ADD CONSTRAINT `fk_homework_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_homework_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `homework_submissions`
--
ALTER TABLE `homework_submissions`
  ADD CONSTRAINT `fk_submission_homework` FOREIGN KEY (`homework_id`) REFERENCES `homework` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_submission_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `marks`
--
ALTER TABLE `marks`
  ADD CONSTRAINT `fk_marks_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_marks_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_marks_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_marks_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_marks_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `parents`
--
ALTER TABLE `parents`
  ADD CONSTRAINT `fk_parents_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_parents_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payments_fee` FOREIGN KEY (`fee_id`) REFERENCES `fees` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_payments_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payslips`
--
ALTER TABLE `payslips`
  ADD CONSTRAINT `fk_payslips_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `fk_staff_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_students_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_students_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `tc`
--
ALTER TABLE `tc`
  ADD CONSTRAINT `fk_tc_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_tc_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tc_term` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `fk_teachers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

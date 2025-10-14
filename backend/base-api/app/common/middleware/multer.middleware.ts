// import multer, { StorageEngine } from "multer";  
// //multer is the core library. Its main job is to take files from an incoming request and make them accessible to your application, typically by saving them to the server's disk and adding a file or files object to the Express request object (req).

// // use it to control:
// // Where files are stored (e.g., in an uploads/ folder).
// // How files are named.
// // What kind of files are allowed (e.g., only JPEGs).
// // Size limits to prevent users from uploading excessively large files.


// // StorageEngine is a TypeScript type interface. You'd use it if you were building a custom storage solution for multer instead of using the default disk or memory storage. For most common use cases, you won't interact with StorageEngine directly but will instead use multer.diskStorage() or multer.memoryStorage().
// import path from "path";

// // Configure storage engine and filename
// const storage: StorageEngine = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {   //here cb is callback function
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname),
//     );
//   },
// });

// // Initialize upload middleware and add file size limit
// export const upload = multer({
//   storage: storage,
//   limits: { fileSize: 20 * 1024 * 1024 },
// });



import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "uploads";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); 
}

const storage: StorageEngine = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + unique + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
        // allow images and pdfs
        const allowed = /png|jpg|jpeg|gif|webp|bmp|pdf/;
        if (allowed.test(file.mimetype) || allowed.test(file.originalname.toLowerCase())) {
          cb(null, true);
        } else {
          cb(new Error('Only images and PDFs are allowed'));
         } 
      }
});

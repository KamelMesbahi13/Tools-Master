// import path from "path";
// import express from "express";
// import multer from "multer";

// const router = express.Router();

// // Configure storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// // File filter for validating file types
// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// // Configure multer for handling uploads
// const upload = multer({ storage, fileFilter });

// // Combined upload handler for both images
// router.post(
//   "/",
//   upload.fields([
//     { name: "image_one" },
//     { name: "image_two" },
//     { name: "image_three" },
//     { name: "image_four" },
//   ]),
//   (req, res) => {
//     console.log(req.files); // Log the received files

//     if (req.files) {
//       const imageOnePath = req.files["image_one"]
//         ? `/${req.files["image_one"][0].path}`
//         : null;
//       const imageTwoPath = req.files["image_two"]
//         ? `/${req.files["image_two"][0].path}`
//         : null;

//       const imageThreePath = req.files["image_three"]
//         ? `/${req.files["image_three"][0].path}`
//         : null;

//       const imageFourPath = req.files["image_four"]
//         ? `/${req.files["image_four"][0].path}`
//         : null;

//       console.log(
//         "Image Paths:",
//         imageOnePath,
//         imageTwoPath,
//         imageThreePath,
//         imageFourPath
//       ); // Log image paths for debugging

//       res.status(200).send({
//         message: "Images uploaded successfully",
//         image_one: imageOnePath,
//         image_two: imageTwoPath,
//         image_three: imageThreePath,
//         image_four: imageFourPath,
//       });
//     } else {
//       res.status(400).send({ message: "No images were uploaded" });
//     }
//   }
// );

// export default router;

import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const router = express.Router();

// ✅ Configure Cloudinary with new credentials
cloudinary.config({
  cloud_name: "ddqd3ur49", // ✅ Your new Cloudinary cloud name
  api_key: "111287268782438", // ✅ Your new Cloudinary API key
  api_secret: "VC8xDbQjEl5bXacxsv_Z9gBCWYk", // ✅ Your new Cloudinary API secret
});

// ✅ Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Optional: change folder name on Cloudinary if needed
    allowed_formats: ["jpeg", "png", "webp"], // Allowed image formats
  },
});

const upload = multer({ storage });

// ✅ Define Upload Route
router.post(
  "/",
  upload.fields([
    { name: "image_one" },
    { name: "image_two" },
    { name: "image_three" },
    { name: "image_four" },
  ]),
  (req, res) => {
    const files = req.files;

    res.status(200).json({
      message: "Images uploaded successfully",
      files,
    });
  }
);

export default router;

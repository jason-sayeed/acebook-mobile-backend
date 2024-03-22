// const multer = require("multer");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");
// const fs = require("fs");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const pathToAssetsFolder = path.join(
//       __dirname,
//       "..",
//       "assets",
//       "uploads"
//     );
//     if (!fs.existsSync(pathToAssetsFolder)) {
//       fs.mkdirSync(pathToAssetsFolder, { recursive: true }); // creates folders if don't exist
//     }
//     cb(null, pathToAssetsFolder); //img filepath
//   },

//   filename: (req, file, cb) => {
//     cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`); //img filename
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;

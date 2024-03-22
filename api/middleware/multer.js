const multer = require("multer");
const path = require("path");
const DatauriParser = require("datauri/parser");

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");

const parser = new DatauriParser();


const dataUri = (req) => { 
    const extname = path.extname(req.file.originalname).toString();
    return parser.format(extname, req.file.buffer);
}
   

module.exports = { multerUploads, dataUri };
